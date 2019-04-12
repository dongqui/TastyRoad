import React, { useEffect, useRef } from "react";
import './listItem.css'

const ListItem = (props) => {
  const listItemContainer = useRef(null);
  const { restaurantListItem, restaurant, idx, lastIdx, dispatch } = props;

  useEffect(() => {
    activeClassOnClick();
  }, [restaurant]);

  const activeClassOnClick = () => {
    listItemContainer.current.classList.remove('active_list');
    if (restaurantListItem === restaurant) {
      listItemContainer.current.classList.add('active_list');
    }
  };

  const rankCssEffect = () => {
    if (idx === 0) {
      return 'first';
    } else if (idx === 1) {
      return 'second';
    } else if (idx === lastIdx) {
      return 'hell';
    }
    return 'defaultBack';
  };

  const rankImage = () => {
    if (idx === 0) {
      return '/img/first.jpeg';
    } if (idx === 1) {
      return '/img/second.png';
    } else if (idx === lastIdx) {
      return '/img/hell.png';
    } else {
      return '/img/defaultRank.jpg';
    }
  };

  return (
    <li>
      <div ref={listItemContainer} id={'listItem_'+ idx} className={"card horizontal con listitem_container " + rankCssEffect()} onClick={() =>{dispatch({type: 'setRestaurant', restaurant: restaurantListItem});}} >

        <div className="card-image listitem_card_container">
          <img alt='' className="listitem_img" src={rankImage()}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <h6 className="card_header">{restaurantListItem.name}</h6>
            <div className="card_foot"><span className="listitem_ratingpoint">평점 : {restaurantListItem.ratingsAverage}</span><span >리뷰 : {restaurantListItem.reviewCount}</span></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ListItem;