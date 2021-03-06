import React from 'react';
import ListItem from "./listItem";
import './list.css'

const List = function(props) {
  const { restaurant, restaurants, dispatch } = props;
  return (

    <div className="cor s3" id='list_container'>
      <ul id='list_ul'>
        <li id='list_top'>
            <h4>주의!!</h4>
            <p>정교한 필터 따윈 없다.<br/> 오직 평점 순으로 나열한다. <br/>진정한 필터는 그대의 입.</p>
        </li>
        {
          restaurants.map((restaurantListItem, idx) => {
            return (
              <ListItem
                  restaurantListItem={restaurantListItem}
                  key={restaurantListItem._id}
                  restaurant={restaurant}
                  idx={idx}
                  dispatch={dispatch}
                  lastIdx={restaurants.length - 1}
              />)
          })
        }
      </ul>
    </div>
  )
};

export default List;