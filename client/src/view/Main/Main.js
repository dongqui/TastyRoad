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
    case 'setRestaurant':
      return {
        ...state,
        restaurant: action.restaurant
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
    const restaurants = await getRestaurantsRequest();
    dispatch({type: 'setRestaurants', restaurants});
  };

  const setFilter = async (filter) => {
    dispatch({type: 'loading'});
    const restaurants = await getFilteredRestaurantsRequest(filter);
    dispatch({type: 'setRestaurants', restaurants});
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <div className="row">
      { loading && <Loading/> }
      <Nav setFilter={setFilter} user={user}/>
      <Map restaurants={restaurants} restaurant={restaurant} dispatch={dispatch}/>
      <List restaurants={restaurants} restaurant={restaurant} dispatch={dispatch}/>
      { restaurant && <Reviews user={user} restaurant={restaurant}/>}
      { restaurant && <DetailInfo restaurant={restaurant}/>}
    </div>
  )
};

export default Main;

