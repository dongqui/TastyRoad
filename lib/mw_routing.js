var router = require('express').Router()
const Restaurant = require('../models/restaurant')
const Review = require('../models/review')
const User = require('../models/user')
const path = require('path')

//first registering - first, should check whether the restaurant already has been exist or not
router.post('/registerRestaurant', function(req, res) {
  Restaurant
   .findOne({daumPId: req.body.data.daumPId})
   .then((exist) => {
    if(exist) {
      var review = new Review({
        user: req.body.data.user,
        resId: exist._id,
        review: req.body.data.review,
        rating: req.body.data.rating
      })
      .save()
      .then((review) => { 
        exist.reviews.push(review._id);
        // exist.ratings.push(review.rating);
        let ratingsAverage = (exist.ratingsAverage * exist.reviewCount + review.rating) / ++exist.reviewCount;

        // var ratingsSum = (exist.ratings).reduce((acc, e) => {
        //   acc = acc+e;
        // return acc
        // });
        // ratingsAverage = ratingsSum/(exist.reviewCount);
        exist.ratingsAverage = ratingsAverage.toFixed(2);
        console.log("we didn't make the restaurant bc the restaurant has already existed")
          exist.save()
          .then((updatedRes) => {
            res.send(updatedRes);})
            .catch((err)=>{
              res.send(err)
            })
      })
      .catch((err)=>{
          res.send(err)
      }) 
    } else {
      console.log('BODY', req.body.data)
      var restaurant = new Restaurant({
        name: req.body.data.placeName,
        user: req.body.data.user,
        daumPId: req.body.data.daumPId,
        filter: req.body.data.filter,
        map: req.body.data.map,
        place_url: req.body.data.placeUrl,
        ratingsAverage: req.body.data.rating,
        reviewCount: 1
      });
      var review = new Review({
        user: req.body.data.user,
        resId: restaurant._id,
        review: req.body.data.review,
        rating: req.body.data.rating
      })
      console.log('레스토랑 확인.', restaurant)
     restaurant
      .save()
      .then((resData) => {
        console.log('레스토랑 저장 후', resData);
        review.save()
        .then((revData) => {
          console.log('리뷰 저장 후', revData);
        resData.reviews.push(revData._id);
        resData.save()
          .then((data) => {
            console.log('레스토랑, 리뷰 저장 후', data);
          res.send(data)
          })
          .catch((err) => {
          res.send(err)
          })    
        })
        .catch((err) => {
        res.send(err)
        })    
      })
      .catch((err) => {
      res.send(err)
      })
    }
   })
   .catch((err) => {
    res.send(err)
    })
  });  


  //add review to a existing restaurant
router.post('/addReview', (req, res) => {
  console.log('리뷰 요청해서 서버까지는 온다');
  console.log('리퀘스트 바디 확인!', req.body.data);
  const review = new Review(
    {
      rating: req.body.data.rating,
      user: req.body.data.user,
      resId: req.body.data.resId,
      review: req.body.data.review
    }
  );
  console.log('리뷰를 콘솔에 찍어보자', review);
  review.save((error, data) => {
    if(error) {
      console.error('하지만 리뷰를 저장하면서 에러가 나지', error);
     } else {
      console.log('리뷰 저장됨?' ,data);
        var id = data.resId;
        Restaurant.findOne({_id: id}, function(err, doc) {
          console.log('doc', doc);
          doc.reviews.push(data._id)
          let ratingsAverage = (doc.ratingsAverage * doc.reviewCount + data.rating) / ++doc.reviewCount;
          doc.ratingsAverage = ratingsAverage.toFixed(2);
          doc.save(function (err) {
            if (err) {
              console.log('리뷰랑 레스토랑 저장하는데 에러가 난다', err);
            }
            res.send(data);
            console.log('Success!');
          })
      });
    }
  })
});

router.get('/restaurants', function(req, res) {
  Restaurant.
  find({}).sort('-ratingsAverage').
  populate({
    path: 'reviews',
    populate: {
      path: 'user'
    },
    options: { limit: 2 }
  }).
  then(function (restaurants) {
    // var arr = [restaurants[0]];
    // for(var i = 1; i < restaurants.length; i++) {
    //   if(restaurants[i].ratingsAverage >= arr[0].ratingsAverage) {
    //     arr.unshift(restaurants[i]);
    //   } else {
    //     arr.push(restaurants[i])
    //   }
    // }
    res.status(200).send(restaurants);
  });
});

//see all reviews for a restaurant that's _id is req.params.id and that's user is populated
router.get('/seeAllReviews/:id', function(req, res) {
      Review.
      find({resId: req.params.id}).
      populate({
        path: 'user'
      }).
      then((allReviews) => {
      res.status(200).send(allReviews)
      })
      .catch(err => console.log('error is',err));
  });

  //see filterd restaurants by korean/japanese/chinese/etc and that has two populated reviews and that's user is populated also 
//see filterd restaurants by korean/japanese/chinese/etc and that has two populated reviews and that's user is populated also
router.get('/restaurants/:filter', function(req, res) {
  Restaurant.
  find({filter: req.params.filter}).sort('-ratingsAverage').
  populate({
    path: 'reviews',
    populate: {
      path: 'user'
    },
    options: { limit: 2 }
  }).
  then(function (restaurants) {
    // var arr = [restaurants[0]];
    // for(var i = 1; i < restaurants.length; i++) {
    //   if(restaurants[i].ratingsAverage >= arr[0].ratingsAverage) {
    //     arr.unshift(restaurants[i]);
    //   } else {
    //     arr.push(restaurants[i])
    //   }
    // }
    res.status(200).send(restaurants);
  });
});

module.exports = router
