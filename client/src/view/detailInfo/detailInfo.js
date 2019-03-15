import React, { useRef, useEffect, useState } from "react";
import isActive from '../../helper/toggleClass';
import './detailInfo.css';

function DetailInfo(props) {
  const detailInfoDiv = useRef(null);
  useEffect(isActive(detailInfoDiv, 'active_info'));

  return (
      <div ref={detailInfoDiv} id='detailed'>
        <h4>{props.restaurant.name}</h4>
        <hr/>
        <p>자세한 정보는 <a href={props.restaurant.place_url}>Daum</a>에<br/> 맡기고 내 턴을 종료한다!! </p>
      </div>
  )
}

export default DetailInfo;
