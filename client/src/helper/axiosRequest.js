import axios from 'axios';

const serverAddress = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export const addReviewReqeust = async data => {
  return await axios.post(`${serverAddress}/api/addReview`, data);
};

export const getReviewsRequest = restaurantId => {
  return async () => await axios.get(`${serverAddress}/review/${restaurantId}`);
};

export const getRestaurantsRequest = async () => {
  return await axios.get(`${serverAddress}/restaurant/`);
};

export const getFilteredRestaurantsRequest = async filter => {
  return await axios.get(`${serverAddress}/restaurant/${filter}`);
};