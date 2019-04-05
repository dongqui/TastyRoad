import React, {useRef, useEffect, useState } from 'react';
import Review from './Review';
import './reviews.css';
import isActive from '../../helper/toggleClass';
import { addReviewReqeust, getReviewsRequest } from '../../helper/axiosRequest'
import Modal from '../modal/Modal';
import WriteReview from './WriteReview';



const Reviews = (props) => {
  const { user, restaurant } = props;
  const [ reviews, setReviews ] = useState([]);
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

  const addReview = (reviewContent, rating) => async () => {
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

  const checkEmptyData = (data) => {
    return Object.values(data).every(item => !!item);
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
          <WriteReview addReview={addReview} />
        </Modal>
      </div>
  );
};

export default Reviews


