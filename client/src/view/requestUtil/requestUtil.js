import axios from 'axios';

const checkAuth = function () {
  axios.get('/auth/slack')
    .then(result => {
      this.setState({user: result.data})
    })
    .catch(err => console.log('request user err', err))
};

const getRestaurants = function() {
  axios.get('/api/restaurants')
    .then( response => {
      this.setState({restaurants: response.data});
    })
    .catch( response => { console.log('get request err', response); } );
};