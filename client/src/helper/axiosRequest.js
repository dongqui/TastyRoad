import axios from 'axios';

const serverAddress = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';


// ------- Auth --------
export const authCheck = async () => {
  const response = await axios.get(`${serverAddress}/auth`);
  return response.data;
};

// ------- Review --------
export const addReviewReqeust = async (data) => {
  const response = await axios.post(`${serverAddress}/api/addReview`, data);
  return response.data;
};

export const getReviewsRequest = async (restaurantId) => {
  const response = await axios.get(`${serverAddress}/review/${restaurantId}`);
  return response.data;
};

// ------- Restaurant --------
export const getRestaurantsRequest = async () => {
  const response = await axios.get(`${serverAddress}/restaurant/`);
  return response.data;
};

export const getFilteredRestaurantsRequest = async (filter) => {
  const response = await axios.get(`${serverAddress}/restaurant/${filter}`);
  return response.data;
};

export const postRestaurantRequest = async (data) => {
  const response = await axios.post(`${serverAddress}/restaurant`, data);
  return response.data;
};