import axios from 'axios';

const serverAddress = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

export const addReviewReqeust = async data => {
  let response = axios.post(`${serverAddress}/api/addReview`, data);
  return response.data;
};

export const getReviewsRequest = async restaurantId => {
  let response = await axios.get(`${serverAddress}/review/${restaurantId}`);
  return response.data;
};

export const getRestaurantsRequest = async () => {
  let response = await axios.get(`${serverAddress}/restaurant/`);
  return response.data;
};

export const getFilteredRestaurantsRequest = async filter => {
  const response = await axios.get(`${serverAddress}/restaurant/${filter}`);
  return response.data;
};

export const postRestaurantRequest = async (data) => {
  const response = await axios.post(`${serverAddress}/restaurant`, data);
  return response.data;
};