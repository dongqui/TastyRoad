const router = require('express').Router();
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

router.post('/registerRestaurant', async (req, res) => {

    let restaurant = await  Restaurant.findOne({daumPId: req.body.data.daumPId});
    let { name, user, daumPId, filter, map, place_url, ratingsAverage, review, rating } = req.body.data;

    try {
        if (restaurant) {
            const review = await new Review({ user, review, rating, resId: restaurant._id }).save();
            restaurant.reviews.push(review._id);
            let ratingsAverage = (exist.ratingsAverage * exist.reviewCount + review.rating) / ++exist.reviewCount;
            restaurant.ratingsAverage = ratingsAverage.toFixed(2);
            let updatedRestaurant = await restaurant.save();
            res.send(updatedRestaurant);
        } else {
            restaurant = await new Restaurant({ name, user, daumPId, filter, map, place_url, ratingsAverage, reviewCount: 1 }).save();
            let reviewObj = await new Review({ user, review, rating, resId: restaurant._id }).save();
            restaurant.reviews.push(reviewObj._id);
            let updatedRestaurant =await restaurant.save();
            res.send(updatedRestaurant);
        }
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

router.post('/addReview', async (req, res) => {
    try {
        let review = await new Review(req.body.data).save();
        let restaurant = await Restaurant.findOne({_id: review.resId});
        restaurant.reviews.push(data._id);
        let ratingsAverage = (restaurant.ratingsAverage * restaurant.reviewCount + review.rating) / ++restaurant.reviewCount;
        restaurant.ratingsAverage = ratingsAverage.toFixed(2);
        await restaurant.save();
        res.send(review);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

router.get('/restaurants', async (req, res) => {
    try {
        let restaurants = await Restaurant.find({}).
        sort('-ratingsAverage').
        populate({
            path: 'reviews',
            populate: {
                path: 'user'
            },
            options: { limit: 2 }
        });

        res.send(restaurants);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

router.get('/seeAllReviews/:restaurantId', async (req, res) => {
    try {
        let reviews = await Review.find({resId: req.params.restaurantId}).
        populate({
            path: 'user'
        });
        res.send(reviews);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

//see filterd restaurants by korean/japanese/chinese/etc and that has two populated reviews and that's user is populated also
router.get('/restaurants/:filter', async (req, res) => {
    try {
        let filteredRestaurants = await Restaurant.
        find({filter: req.params.filter}).sort('-ratingsAverage').
        populate({
            path: 'reviews',
            populate: {
                path: 'user'
            },
            options: { limit: 2 }
        });
        res.send(filteredRestaurants);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
