const express = require('express');
const { searchBreweries, getBreweryDetails, addReview, getReviews } = require('../controllers/breweries');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/search', searchBreweries);
router.get('/:id', getBreweryDetails);
router.post('/:id/reviews',auth, addReview);
router.get('/:id/reviews', getReviews);

module.exports = router;
