import { Input } from "react-materialize";
import React, { useState, useRef } from "react";
import Rating from 'react-rating';
import './PostRestaurant.css';
import SearchListItem from './SearchListItem';
import emptyStar from "../reviews/img/star-empty.png";
import fullStart from "../reviews/img/star-full.png";
import useInput from "../../hooks/useInput";

const PostRestaurant = (props) => {

    const { close } = props;
    const [ rate, setRate ] = useState(0);
    const [ placesData, setPlacesData ] = useState([]);
    const [ selectedPlace, setSelectedPlace] = useState(null);
    const [ reviewContent, setReviewContent ] = useInput('');
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

    const submitNewPost = () => {
        const { id, place_name, y, x, place_url } = selectedPlace;
        const data = {
            daumPId: id,
            placeName: place_name,
            map: {latitude: y, longitude: x},
            placeUrl: place_url,
            review: reviewContent,
            rating: rate
            // user._id, filter
        }

        //request post
    };

    return (
        <div>
            {console.log('render!!')}
            음식점
            <input ref={searchInput} onChange={searchReataurantWithname} placeholder = '음식점 이름을 적어주세요!' />
            <ul>
                { placesData.map( data => <SearchListItem key={data.id} clickPlaceList={clickPlaceList} data={data} />)}
            </ul>

            <Input name='group1' type='radio' value='korean' label='한식' className='with-gap' />
            <Input name='group1' type='radio' value='western' label='양식' className='with-gap' />
            <Input name='group1' type='radio' value='japanese' label='일식' className='with-gap' />
            <Input name='group1' type='radio' value='chinese' label='중식' className='with-gap' />
            <Input name='group1' type='radio' value='etc' label='기타' className='with-gap' />

            <Rating
                emptySymbol = {<img alt='' src={emptyStar} className="icon" />}
                fullSymbol = {<img alt='' src={fullStart} className="icon" />}
                onChange = { rate => setRate(rate) }
            />
            음식 맛을 평가해주세요!
            <textarea
                rows='7'
                cols='15'
                style={{width:'100%', height:'15%'}}
                onChange={ (e) => setReviewContent(e.target.value) }
            />
            <button>POST</button>
            <button onClick={close}>CLOSE</button>
        </div>
    )
};

export default PostRestaurant;