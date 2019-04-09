import React, { useState } from "react";
import Rating from 'react-rating';
import emptyStar from './img/star-empty.png';
import fullStart from './img/star-full.png';
import useInput from "../../hooks/useInput";
import { Button } from "react-materialize";
import './WriteReview.css';

const WriteReview = function(props) {
    const { addReview, close, header } = props;
    const [ rating, setRating ] = useState(0);
    const [ reviewContent, onChange ] = useInput('');

    return (
        <div>
            <div className="write-header">
                <span className="modal-title">{ header }</span>
            </div>
            <Rating
                emptySymbol = {<img alt='' src={emptyStar} className="icon" />}
                fullSymbol = {<img alt='' src={fullStart} className="icon" />}
                onChange = { rate => setRating(rate) }
            />
            <textarea placeholder="맛을 평가해주세요" onChange={onChange} className='write-textarea' cols='15' rows='7'/>
            <Button onClick={addReview(reviewContent, rating)} className="write-btn">POST</Button>
            <Button onClick={close} className="write-btn">CLOSE</Button>
        </div>
    );
};

export default WriteReview;