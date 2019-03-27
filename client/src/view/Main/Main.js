import React, { Component, useReducer, useEffect } from 'react';
import Nav from '../nav/nav.js';
import Map from '../map/map.js';
import List from '../list/list';
import Reviews from '../reviews/Reviews';
import DetailInfo from "../detailInfo/detailInfo";
import Loading from '../loading/loading';
import { getRestaurantsRequest, getFilteredRestaurantsRequest } from '../../helper/axiosRequest';
import axios from 'axios'

const initialState = {
  restaurants: [],
  restaurant: null,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: true
      };
    case 'setRestaurants':
      return {
        ...state,
        restaurants: action.restaurants,
        restaurant: null,
        loading: false,
      };
    default:
      throw new Error();
  }
};

const Main = (props) => {
  const { user } = props;
  const [{ restaurants, restaurant, loading }, dispatch] = useReducer(reducer, initialState);

  const getRestaurants = async () => {
    dispatch({type: 'loading'});
    const response = await getRestaurantsRequest();
    dispatch({type: 'setRestaurants', restaurants: response.data});
  };

  const setFilter = async (filter) => {
    dispatch({type: 'loading'});
    const response = await getFilteredRestaurantsRequest(filter);
    dispatch({type: 'setRestaurants', restaurants: response.data});
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <div className="row">
      { loading && <Loading/> }
      <Nav setFilter={setFilter} user={user}/>
      <div style={{backgroundColor: 'grey', width: '100%', height: '5px'}}/>
      <Map restaurants={restaurants} />
      <List restaurants={restaurants} />
      { restaurant && <Reviews user={user} restaurant={restaurant}/>}
      { restaurant && <DetailInfo restaurant={restaurant}/>}
    </div>
  )
};
class Main_ extends Component {

  state={
    restaurant: null,
    restaurants: [],
    reviews: []
  };

  componentDidMount() {
    console.log(process.env.NODE_ENV);
    axios.get('http://localhost:3001/restaurant')
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
    axios.get('/restaurant/' + filter)
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
      return <Reviews loadingRef={this.loadingRef}
        user={this.props.user} restaurant={this.state.restaurant}/>
    }
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
        <loading/>
      </div>
    )
  }
}

export default Main;

