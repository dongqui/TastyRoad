import React, { useState } from "react";
import Rating from 'react-rating';
import emptyStar from './img/star-empty.png';
import fullStart from './img/star-full.png';
import useInput from "../../hooks/useInput";
import { Button } from "react-materialize";
import './WriteReview.css';

const WriteReview = function(props) {
    const { addReview } = props;
    const [ rating, setRating ] = useState(0);
    const [ reviewContent, onChange ] = useInput('');

    return (
        <div>
            <Rating
                emptySymbol = {<img alt='' src={emptyStar} className="icon" />}
                fullSymbol = {<img alt='' src={fullStart} className="icon" />}
                onChange = { rate => setRating(rate) }
            />
            <textarea onChange={onChange} className='modal_textarea' cols='15' rows='7'/>
            <Button onClick={addReview(reviewContent, rating)} className="review-post-btn">POST</Button>
        </div>
    );
};

export default WriteReview