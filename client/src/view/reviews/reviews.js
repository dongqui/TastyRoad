import React, {useRef, useEffect, useState } from 'react';
import Review from './review';
import './reviews.css';
import isActive from '../../helper/toggleClass';
import { addReviewRequest, getReviewsRequest } from '../../helper/axiosRequest'
import Modal from '../modal/modal';
import WriteReview from './writeReview';

const Reviews = (props) => {
  const { user, restaurant, reviews, dispatch } = props;
  const [ modalOpen, setModalOpen ] = useState(false);
  const reviewsContainerRef = useRef(null);

  useEffect(() => {
    isActive(reviewsContainerRef, 'active_reviews');
  }, [restaurant]);

  const getAllReviews = async () => {
    try {
      const reviews = await getReviewsRequest(restaurant._id);
      dispatch({type: 'setReviews', reviews})
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
      const reviews = await addReviewRequest(data);
      dispatch({type: 'setReviews', reviews})
    } catch(e) {

    }
  };

  const renderMoreReview = () => {
    if (reviews.length < restaurant.reviewCount) {
      return (
        <li id="review_list_bot" onClick={getAllReviews}>
          <span>더 보기</span>
        </li>
        )
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
          { renderMoreReview() }
        </ul>

        <Modal modalOpen={modalOpen}>
          <WriteReview addReview={addReview} close={() => setModalOpen(false)} header={restaurant.name} />
        </Modal>
      </div>
  );
};

export default Reviews


