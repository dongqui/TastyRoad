import React, {useRef, useEffect, useState } from 'react';
import Review from './Review';
import './reviews.css';
import { Button,Modal,Input } from 'react-materialize';
import Rating from 'react-rating';
import axios from 'axios';
import isActive from '../../helper/toggleClass';
import useRequest from '../../hooks/useRequest';


const Reviews_ = (props) => {
  const [user, restaurant] = props;

  const reviewsContainerRef = useRef(null);
  const [reviews, setReviews] = useState(props.restaurant.reviews);
  const [restaurantId, setRestaurantId] = useState(props.restaurant._id);
  const [rating, setRating] = useState(0);

  useEffect(isActive(reviewsContainerRef, 'active_reviews'), [restaurantId]);

  const modalStyle = {
    width:'25%',
    height: '50%',
    border: '0.2em solid black',
    fontFamily: 'Do Hyeon, sans-serif'
  };
  return (
      <div>
        <ul ref={reviewsContainerRef} id="reviews_container" className="collection">
          <li className="collection-item" style={{height: '50px'}}>
            <Modal
                header={restaurant.name} fixedFooter
                trigger={<span id='create_review_btn'> <i className="material-icons">create</i>리뷰 쓰기</span>}
                actions={<div><Button modal='close' clasName='modal_btn'>Close</Button><Button modal='close' clasName='modal_btn' onClick={this.submitReview}>POST</Button></div>}
                style={modalStyle}>
              <Rating
                  emptySymbol = {<img src="/img/star-empty.png" className="icon" />}
                  fullSymbol = {<img src="/img/star-full.png" className="icon" />}
                  onChange = { rate => setRating(rate) }/>
              맛있드나?
              <textarea className='modal_textarea' cols='15' rows='7'/>
            </Modal>
            {reviews.length > 2 ? <span id='expand_review' onClick={this.moreReviewsOnclick}> <i className="material-icons">expand_more</i></span> : '' }
          </li>

        </ul>
      </div>
  );
};
class Reviews extends React.Component{
  

  ref_container = React.createRef();
  data = {
    rating: false
  };
  inputRef = React.createRef();

  isActive = () => {
    let elm = this.ref_container.current;
    if (elm.classList.contains('active_reviews')) {
      elm.classList.remove('active_reviews');
      void elm.offsetWidth;
    }
    elm.classList.add('active_reviews');

  };
  componentDidMount() {
    this.isActive();
  }

  componentDidUpdate() {
    this.isActive();
  }

  isManyReviews = () => {
    if (this.props.restaurant.reviewCount > 2) {
      return <span onClick={this.moreReviewsOnclick} style={{float: 'right', cursor: 'pointer'}}> <i className="material-icons">expand_more</i></span>
    }
  };

  makeReviewList = () =>{
    if (this.props.reviews) {
      return this.props.reviews.map(function (review, idx) {
        return <Review review={review}/>
      })
    } else {
      return this.props.restaurant.reviews.map(function (review, idx) {
        return <Review review={review}/>
      })
    }

  };

  submitReview = () => {
    this.data.user = this.props.user._id;
    this.data.resId = this.props.restaurant._id;
    this.data.review = this.inputRef.current.value;
    const data = this.data;

    let isEmpty = Object.values(data).every(function(item) {
      return !!item;
    });

    if (isEmpty) {
      this.inputRef.current.value = '';
      axios.post('/api/addReview', {data})
        .then(result => this.moreReviewsOnclick())
        .catch(err => console.log('post review err', err));
    } else {
      window.Materialize.toast('등록 실패! 양식에 맞춰서 다시 써 줘', 5000)
    }

  };

  moreReviewsOnclick = () => {
    this.props.loadingRef.current.style.zIndex = 100;
    axios.get('http://localhost:3001/review/' + this.props.restaurant._id)
      .then(result => {this.props.getMoreReviews(result.data); this.props.loadingRef.current.style.zIndex = -1;})
      .catch(err => console.log('request reviews err', err));
  };

  render() {
    const modalStyle = {
      width:'25%',
      height: '50%',
      border: '0.2em solid black',
      fontFamily: 'Do Hyeon, sans-serif'
    };
    return (
      <div>
        <ul ref={this.ref_container} id="reviews_container" className="collection">
          <li className="collection-item" style={{height: '50px'}}>
            <Modal
              header={this.props.restaurant.name}
              fixedFooter
              trigger={<span style={{float: 'left', cursor: 'pointer'}}> <i className="material-icons">create</i>리뷰 쓰기</span>}
              actions={<div><Button modal = 'close' style={{ backgroundColor : 'black', margin : '0.5em'}} >Close</Button><Button modal = 'close' style={{ margin : '0.5em', backgroundColor : 'black'}} onClick={this.submitReview}>POST</Button></div>}
              style={modalStyle}
              >
              <br/>

              <Rating
                emptySymbol = {<img src="/img/star-empty.png" className="icon" />}
                fullSymbol = {<img src="/img/star-full.png" className="icon" />}
                onChange = { rate => {
                  this.data.rating = rate
                }}/>
              <br/><br/><br/>

               맛있드나?
                <textarea style={{width:'100%',height:'55%'}} cols='15' rows='7' id="textarea1" ref={this.inputRef} />
            </Modal>
            {this.isManyReviews()}
          </li>

          {
            this.makeReviewList()
          }
        </ul>
      </div>
    );
  }
}

export default Reviews


