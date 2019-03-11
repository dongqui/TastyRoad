import React from 'react';
import ListItem from "./listItem";

const List = function(props) {
  const makeList = function() {
    if (props.restaurants.length) {
      return props.restaurants.map(function(restaurant, idx) {
        return  <ListItem selectedId={props.selectedId} setSelectedId={props.setSelectedId} idx={idx} lastIdx={props.restaurants.length - 1} restaurant={restaurant} key={idx}/>
      })
    }
  };
  return (

    <div className="cor s3" style={{backgroundColor: 'white'}}>
      <ul style={{margin: 0, overflow: 'scroll', height: '100vh'}}>
        <li style={{width: '100%', height:'10em', backgroundColor: 'black', paddingTop: '10px'}}>
          <div>
            <h4 style={{color: 'white', margin: '5px', textAlign: 'center'}}>주의!!</h4>
            <p style={{color: 'white', marginTop: 0, marginBottom: '20px', textAlign: 'center'}}>정교한 필터 따윈 없다.<br/> 오직 평점 순으로 나열한다. <br/>진정한 필터는 그대의 입.</p>
          </div>
        </li>
        {
          makeList()
        }
        <li style={{width: '100%', height:'10em', backgroundColor: 'black', paddingTop: '10px'}}>
          <div>
            <h4 style={{color: 'white', margin: '5px', textAlign: 'center'}}>Immersive 07</h4>
            <p style={{color: 'white', marginTop: 0, marginBottom: '20px', textAlign: 'center'}}>고명우 김동진 백승원 이요한<br/>For Codestates</p>
          </div>
        </li>
      </ul>
    </div>
  )
};

export default List;