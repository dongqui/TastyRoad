const router = require('express').Router();
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

router.post('/', async (req, res) => {
    const restaurant = await  Restaurant.findOne({daumPId: req.body.data.daumPId});
    let { name, user, daumPId, filter, map, place_url, ratingsAverage, review, rating } = req.body.data;

    try {
        if (restaurant) {
            const review = await new Review({ user, review, rating, resId: restaurant._id }).save();
            restaurant.reviews.push(review._id);
            let ratingsAverage = (exist.ratingsAverage * exist.reviewCount + review.rating) / ++exist.reviewCount;
            restaurant.ratingsAverage = ratingsAverage.toFixed(2);
            const updatedRestaurant = await restaurant.save();
            res.send(updatedRestaurant);
        } else {
            restaurant = await new Restaurant({ name, user, daumPId, filter, map, place_url, ratingsAverage, reviewCount: 1 }).save();
            const reviewObj = await new Review({ user, review, rating, resId: restaurant._id }).save();
            restaurant.reviews.push(reviewObj._id);
            const updatedRestaurant =await restaurant.save();
            res.send(updatedRestaurant);
        }
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({})
          .sort('-ratingsAverage')
          .populate({
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

//see filterd restaurants by korean/japanese/chinese/etc and that has two populated reviews and that's user is populated also
router.get('/:filter', async (req, res) => {
    try {
        const filteredRestaurants = await Restaurant.find({filter: req.params.filter})
          .sort('-ratingsAverage')
          .populate({
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
