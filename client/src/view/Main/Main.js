import React, { Component } from 'react';
import Nav from '../nav/nav.js';
import Map from '../map/map.js';
import List from '../list/list';
import Reviews from '../reviews/Reviews';
import DetailInfo from "../detailInfo/detailInfo";
import axios from 'axios';



class Main extends Component {
  
  loadingRef = React.createRef();
  state={
    selectedId: -1,
    restaurants: [],
    reviews: []
  };

  componentDidMount() {
    axios.get('/api/restaurants')
      .then( response => {
        if (response.data[0]) {
          this.setState({restaurants: response.data});
        }
        this.loadingRef.current.style.zIndex = -1;
      })
      .catch( response => { console.log('get request err', response); } );
  }

  setFilter = e => {
    this.loadingRef.current.style.zIndex = 100;
    const filter = e;
    console.log(filter);
    axios.get('/api/restaurants/' + filter)
      .then(result => {
        if (result.data[0]) {
          this.setState({restaurants: result.data, selectedId: -1});
        } else {
          this.setState({restaurants: [], selectedId: -1})
        }
        this.loadingRef.current.style.zIndex = -1;
      })
      .catch(err => console.log('request filtered restaurants err', err))
  };

  setSelectedId = id => {
    this.setState({selectedId :id, reviews: this.state.restaurants.reviews});
  };

  renderDetail() {
    if (this.state.selectedId !== -1 && this.state.restaurants.length) {
      return <DetailInfo restaurant={this.state.restaurants[this.state.selectedId]}/>
    }
  }

  renderReviews() {
    if (this.state.selectedId !== -1 && this.state.restaurants.length) {
      console.log(this.state.selectedId, 'selectedIddddddddd');
      console.log(this.state.reviews, 'reeeeeviiieeeewwsss');
      return <Reviews loadingRef={this.loadingRef}
        user={this.props.user} reviews={this.state.reviews} getMoreReviews={this.getMoreReviews} restaurant={this.state.restaurants[this.state.selectedId]}/>
    }
  };

  getMoreReviews = (reviews) => {
    this.setState({reviews: reviews});
  };


  render() {
    return (
      <div className="row">
        <Nav setFilter={this.setFilter} setSelectedId={this.setSelectedId} user={this.props.user} />
        <div style={{backgroundColor: 'grey', width: '100%', height: '5px'}}/>
        <Map restaurants={this.state.restaurants} selectedId={this.state.selectedId} setSelectedId={this.setSelectedId}/>
        <List restaurants={this.state.restaurants} selectedId={this.state.selectedId} setSelectedId={this.setSelectedId}/>
        {this.renderReviews()}
        {this.renderDetail()}
        <p ref={this.loadingRef} style={{color: 'black', zIndex: 100, position:'absolute', top: '10%', left:'29%', fontSize: '10em', fontFamily: 'Do Hyeon, sans-serif'}}>기달</p>
      </div>
    )
  }
}

export default Main;

