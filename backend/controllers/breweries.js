const axios = require('axios');
const Review = require('../models/Review');

exports.searchBreweries = async (req, res) => {
    const { by_city, by_name, by_type } = req.query;
    try {
        const response = await axios.get(`https://api.openbrewerydb.org/breweries`, { params: { by_city, by_name, by_type } });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching breweries' });
    }
};

exports.getBreweryDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://api.openbrewerydb.org/breweries/${id}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching brewery details' });
    }
};

exports.addReview = async (req, res) => {
    const { id } = req.params;
    const { rating, description } = req.body;
    const userId = req.user.id;
    try {
        const review = new Review({ user: userId, breweryId: id, rating, description });
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Error adding review' });
    }
};

exports.getReviews = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await Review.find({ breweryId: id }).populate('user', 'name');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching reviews' });
    }
};
