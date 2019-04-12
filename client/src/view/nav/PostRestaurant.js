import { RadioGroup } from "react-materialize";
import React, { useState, useRef } from "react";
import Rating from 'react-rating';
import './PostRestaurant.css';
import SearchListItem from './SearchListItem';
import emptyStar from "../reviews/img/star-empty.png";
import fullStart from "../reviews/img/star-full.png";
import useInput from "../../hooks/useInput";
import { postRestaurantRequest } from "../../helper/axiosRequest";

const PostRestaurant = (props) => {

  const { close } = props;
  const [ rate, setRate ] = useState(0);
  const [ placesData, setPlacesData ] = useState([]);
  const [ selectedPlace, setSelectedPlace] = useState(null);
  const [ reviewContent, setReviewContent ] = useInput('');
  const [ filter, setFilter ] = useState(null);
  const searchInput = useRef(null);
  const places = new window.daum.maps.services.Places();

  const searchReataurantWithname = (event) => {
    const restaurantName = event.target.value;
    if (!restaurantName.length) {
      setPlacesData([]);
      return;
    }
    places.keywordSearch(restaurantName, searchRestaurantCallback, {
      location: new window.daum.maps.LatLng(37.545486, 127.051632),
      radius: 3000,
      size: 5,
    });
  };

  const searchRestaurantCallback = (placeData, status) => {
    if (status === window.daum.maps.services.Status.OK) {
      setPlacesData(placeData);
    }
  };

  const clickPlaceList = (place) => () => {
    setSelectedPlace(place);
    setPlacesData([]);
    searchInput.current.value = place.place_name;
  };

  const submitNewPost = async () => {
    const { id, place_name, y, x, place_url } = selectedPlace;
    const data = {
      daumPId: id,
      placeName: place_name,
      map: {latitude: y, longitude: x},
      placeUrl: place_url,
      review: reviewContent,
      rating: rate,
      filter
    };

    await postRestaurantRequest(data);

    // 스테이트? 인풋 초기화
  };

  return (
    <div>
      <h4 id="post-header">새 맛집 등록</h4>
      <input id="post-input" ref={searchInput} onChange={searchReataurantWithname} placeholder = '음식점 이름을 적어주세요!' />
      <ul>
        { placesData.map( data => <SearchListItem key={data.id} clickPlaceList={clickPlaceList} data={data} />)}
      </ul>
      <div id="radio-container">
        <RadioGroup
          name="filter"
          radioClassNames="post_radio"
          onChange={(e) => setFilter(e.target.value)}
          options={[
            {label: '한식', value: 'korean'},
            {label: '양식', value: 'western'},
            {label: '일식', value: 'japanese'},
            {label: '중식', value: 'chinese'},
            {label: '일식', value: 'japanese'},
            {label: '기타', value: 'etc'}
          ]}
        />
      </div>


      <Rating
        emptySymbol = {<img alt='' src={emptyStar} className="icon" />}
        fullSymbol = {<img alt='' src={fullStart} className="icon" />}
        onChange = {rate => setRate(rate)}
        initialRating = {rate}
      />
      <textarea
        rows='7'
        cols='15'
        id="post-textarea"
        onChange={ setReviewContent }
        placeholder='어땠어요?'
      />
      <button className="post-btn" onClick={submitNewPost}>POST</button>
      <button className="post-btn" onClick={close}>CLOSE</button>
    </div>
  )
};

export default PostRestaurant;