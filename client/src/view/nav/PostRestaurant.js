import { Input } from "react-materialize";
import React, { useState } from "react";
import Rating from 'react-rating';
import './PostRestaurant.css';
import SearchListItem from './SearchListItem';
import emptyStar from "../reviews/img/star-empty.png";
import fullStart from "../reviews/img/star-full.png";
import useInput from "../../hooks/useInput";

const PostRestaurant = () => {

    const { close } = props;
    const [ rate, setRate ] = useState(0);
    const [ placesData, setPlacesData ] = useState([]);
    const [ selectedPlace, setSelectedPlace] = useState(null);
    const [ reviewContent, setReviewContent ] = useInput('');
    const places = new window.daum.maps.services.Places();

    const searchReataurantWithname = (event) => {
        const restaurantName = event.target.value;
        places.keywordSearch(restaurantName, searchRestaurantCallback, {
            location: new window.daum.maps.LatLng(37.545486, 127.051632),
            radius: 3000,
            size: 5,
        } );
    };
    const searchRestaurantCallback = (placeData, status) => {
        if (status === window.daum.maps.services.Status.OK) {
            setPlacesData(placeData);
        }
    };

    const clickPlaceList = (place) => () => {
        setSelectedPlace(place);
        setPlacesData([]);
    };

    return (
        <div>
            {console.log('render!!')}
            음식점
            <input value={selectedPlace ? selectedPlace.place_name : ''} onChange = {searchReataurantWithname} placeholder = '음식점 이름을 적어주세요!' />
            { selectedPlace}
            <ul>
                { placesData.map( data => <SearchListItem clickPlaceList={clickPlaceList} data={data} setSelectedPlace={setSelectedPlace} />)}
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
                label='review'
                style={{width:'100%', height:'15%'}}
                onChange={ setReviewContent }
            />
            <button>POST</button>
            <button onClick={close}>CLOSE</button>
        </div>
    )
};

export default PostRestaurant;