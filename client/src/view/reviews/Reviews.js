import React from 'react';
import Review from './Review';
import './reviews.css';
import { Button,Modal,Input } from 'react-materialize';
import Rating from 'react-rating';
import axios from 'axios';

class Reviews extends React.Component{
  

  ref_container = React.createRef();
  data = {
    rating: false
  };
  inputRef = React.createRef();

  isActive = () => {
    let elm = this.ref_container.current;
    console.log(elm);
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
    const user = this.props.user;
    if (this.props.reviews) {
      return this.props.reviews.map(function (review, idx) {
        console.log(review);
        return <Review review={review} user={user}/>
      })
    } else {
      return this.props.restaurant.reviews.map(function (review, idx) {
        console.log(review);
        return <Review review={review} user={user}/>
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
    console.log('!!!!!!!!!!!!!!');
    this.props.loadingRef.current.style.zIndex = 100;
    axios.get('/api/seeAllReviews/' + this.props.restaurant._id)
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
              <br />

              <Rating
                emptySymbol = {<img src="/img/star-empty.png" className="icon" />}
                fullSymbol = {<img src="/img/star-full.png" className="icon" />}
                onChange = { rate => {
                  this.data.rating = rate
                }}/>
              <br /><br /><br />

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


