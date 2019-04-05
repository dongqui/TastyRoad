import React, {useRef, useEffect, useState } from 'react';
import Review from './Review';
import './reviews.css';
import { Button } from 'react-materialize';
import isActive from '../../helper/toggleClass';
import { addReviewReqeust, getReviewsRequest } from '../../helper/axiosRequest'
import useInput from '../../hooks/useInput';
import Modal from '../modal/Modal';
import Rating from 'react-rating';
import emptyStar from './img/star-empty.png';
import fullStart from './img/star-full.png';


const Reviews = (props) => {
  const { user, restaurant } = props;
  const [ reviews, setReviews ] = useState([]);
  const [ rating, setRating ] = useState(0);
  const reviewContent = useInput('');
  const [ modalOpen, setModalOpen ] = useState(false);
  const reviewsContainerRef = useRef(null);

  useEffect(() => {
    isActive(reviewsContainerRef, 'active_reviews');
    getReviews();
  }, [restaurant]);

  const getReviews = async () => {
    try {
      const reviews = await getReviewsRequest(restaurant._id);
      setReviews(reviews);
    } catch(e) {
      console.log(e);
    }
  };

  const checkEmptyData = (data) => {
    return Object.values(data).every(item => !!item);
  };

  const addReview = async () => {
    const data = {user: user._id, resId: restaurant._id, review: reviewContent, rating};
    if (checkEmptyData(data)) {
      window.Materialize.toast('등록 실패! 양식에 맞춰서 다시 써 줘', 5000);
      return;
    }
    try {
      const newReview = await addReviewReqeust(data);
      setReviews([newReview, ...reviews]);
    } catch(e) {

    }
  };
  return (
      <div>
        <ul ref={reviewsContainerRef} id="reviews_container" className="collection">
          <li className="collection-item" id="review-list-top">
            <span id="review-list-title">{restaurant.name}</span>
            <span id='create_review_btn' onClick={() => setModalOpen(true)}><i className="material-icons">create</i></span>
          </li>
          { reviews.map(review => <Review key={review._id} review={review}/>) }
        </ul>

        <Modal modalOpen={modalOpen} close={() => setModalOpen(false)} header={restaurant.name}>
          <div>
            <Rating
              emptySymbol = {<img src={emptyStar} className="icon" />}
              fullSymbol = {<img src={fullStart} className="icon" />}
              onChange = { rate => setRating(rate) }
            />
            <textarea {...reviewContent} className='modal_textarea' cols='15' rows='7'/>
            <Button onClick={addReview} className="review-post-btn">POST</Button>
          </div>
        </Modal>
      </div>
  );
};

export default Reviews


