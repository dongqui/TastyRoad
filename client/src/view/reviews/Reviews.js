import React, {useRef, useEffect, useState } from 'react';
import Review from './Review';
import './reviews.css';
import { Button, Modal } from 'react-materialize';
import Rating from 'react-rating';
import isActive from '../../helper/toggleClass';
import { addReviewReqeust, getReviewsRequest } from '../../helper/axiosRequest'
import useInput from '../../hooks/useInput';


const Reviews = (props) => {
  const { user, restaurant } = props;
  const reviewsContainerRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const reviewContent = useInput('');

  useEffect(() => {
    isActive(reviewsContainerRef, 'active_reviews');
    getReviews();
  }, [restaurant]);

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

  const getReviews = async () => {
    try {
      const reviews = await getReviewsRequest(restaurant._id);
      setReviews(reviews);
    } catch(e) {

    }
  };

  const modalStyle = {
    width:'25%',
    height: '50%',
    border: '0.2em solid black',
    fontFamily: 'Do Hyeon, sans-serif'
  };

  return (
      <div>
        <ul ref={reviewsContainerRef} id="reviews_container" className="collection">
          <li className="collection-item">
            <Modal style={modalStyle}>
                header={restaurant.name} fixedFooter
                trigger={<span id='create_review_btn'> <i className="material-icons">create</i>리뷰 쓰기</span>}
                actions={<div><Button modal='close' className='modal_btn'>Close</Button><Button modal='close' className='modal_btn' onClick={addReview}>POST</Button></div>}
              <Rating>
                  emptySymbol = {<img src="/img/star-empty.png" className="icon" />}
                  fullSymbol = {<img src="/img/star-full.png" className="icon" />}
                  onChange = { rate => setRating(rate) }
              </Rating>
              맛있드나?
              <textarea {...reviewContent} className='modal_textarea' cols='15' rows='7'/>
            </Modal>
          </li>
          { reviews.map(review => <Review key={review._id} review={review}/>) }
        </ul>
      </div>
  );
};

export default Reviews


