var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const reviews = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    resId: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
    review: String,
    rating: Number
  });


module.exports = mongoose.model('Review', reviews);


//{
//   http://localhost:3000/addReview
// "username": "한국인",
// "resId": "5b605c65d1540412f2efa037",
// "review": "맛있는거같아요",
// "rating": 7
// }







// Review.
// find({}).
// populate({
//   path: 'user',
// })


// req.body = review 내용;
// User.findOne({_id: req.body.user}).