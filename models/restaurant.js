var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const restaurants = new Schema({
    name: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    daumPId: String, //daumPlaceId
    filter: String,
    map:{latitude: Number, longitude: Number},
    place_url: String,
    ratingsAverage: Number,
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    reviewCount: Number
  });


module.exports = mongoose.model('Restaurant', restaurants);
