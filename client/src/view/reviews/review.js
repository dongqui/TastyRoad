import React from "react";
import './review.css'

const Review = function(props) {

  const { rating, review } = props.review;
  const { picture, username } = props.review.user;
  const starsCount = () => {
    const count = Math.round(rating);
    const startArr = [];
    for (let i = 0; i < count; i++) {
      startArr.push(<i id='review_star' className="material-icons">grade</i>);
    }
    return startArr;
  };

  return (
    <li className="collection-item avatar">
      <img src={ picture } alt className="circle" />
      <p id='review_title' className="title"><strong>{ username }</strong></p>
      <p>{ starsCount() }</p>
      <p id='review_content'>{ review }</p>
    </li>
  )
};

export default Review