import React, { useReducer, useEffect } from 'react';
import Nav from '../nav/nav.js';
import Map from '../map/map.js';
import List from '../list/list';
import Reviews from '../reviews/reviews';
import DetailInfo from "../detailInfo/detailInfo";
import Loading from '../loading/loading';
import { getRestaurantsRequest, getFilteredRestaurantsRequest } from '../../helper/axiosRequest';
import { reducer, initialState } from '../../reducer/reducerMain';


const Main = (props) => {
  const { user } = props;
  const [{ restaurants, restaurant, loading, reviews }, dispatch] = useReducer(reducer, initialState);

  const getRestaurants = async () => {
    dispatch({type: 'loading'});
    const restaurants = await getRestaurantsRequest();
    dispatch({type: 'setRestaurants', restaurants});
  };

  const setFilter = (filter) => async () => {
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
      { restaurant && <Reviews reviews={reviews} user={user} restaurant={restaurant} dispatch={dispatch}/>}
      { restaurant && <DetailInfo restaurant={restaurant}/>}
    </div>
  )
};

export default Main;

