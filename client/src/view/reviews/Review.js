import React from "react";

const Review = function(props) {

  const starsCount = () => {
    const count = Math.round(props.review.rating);
    let startArr = [];
    for (let i = 0; i < count; i++) {
      startArr.push(<i style={{color: 'gold'}} className="material-icons">grade</i>);
    }
    return startArr;
  };

  return (
    <li className="collection-item avatar">
      <img src={props.review.user.picture} alt className="circle" />
      <p className="title" style={{color: 'darkGrey'}}><strong>{props.review.user.username}</strong></p>
      <p>{starsCount()}</p>
      <p style={{maxWidth: '100%', marginTop: '10px', whiteSpace: 'pre-line'}}>{props.review.review}</p>
    </li>
  )
};

export default Review