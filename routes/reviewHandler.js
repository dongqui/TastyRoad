const router = require('express').Router();
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

router.post('/', async (req, res) => {
    try {
        const review = await new Review(req.body.data).save();
        const restaurant = await Restaurant.findOne({_id: review.resId});
        restaurant.reviews.push(data._id);
        let ratingsAverage = (restaurant.ratingsAverage * restaurant.reviewCount + review.rating) / ++restaurant.reviewCount;
        restaurant.ratingsAverage = ratingsAverage.toFixed(2);
        await restaurant.save();
        const reviews = await Review.find({resId: req.params.restaurantId}).
        populate({
            path: 'user'
        });
        res.send(reviews);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

router.get('/:restaurantId', async (req, res) => {
    try {
        const reviews = await Review.find({resId: req.params.restaurantId}).
        populate({
            path: 'user'
        });
        res.send(reviews);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
