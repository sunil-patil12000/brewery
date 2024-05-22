import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./BreweryDetails.css";

const BreweryDetails = () => {
    const { id } = useParams();
    const [brewery, setBrewery] = useState({});
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(1);
    const [description, setDescription] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrewery = async () => {
            const response = await axios.get(`http://localhost:5000/api/breweries/${id}`);
            setBrewery(response.data);
            console.log(response.data)
        };
        const fetchReviews = async () => {
            const response = await axios.get(`http://localhost:5000/api/breweries/${id}/reviews`);
            setReviews(response.data);
        };
        fetchBrewery();
        fetchReviews();
    }, [id]);

    const handleSubmit = async (e) => {
        const token =sessionStorage.getItem('user')
        e.preventDefault();
       if (token) {
        await axios.post(`http://localhost:5000/api/breweries/${id}/reviews`, { rating, description }, {
            headers: { Authorization: `${token}` }
        });
        
       }
       else{
        navigate('/login');
        
       }
        setDescription('');
        setRating(1);
        const response = await axios.get(`http://localhost:5000/api/breweries/${id}/reviews`);
        setReviews(response.data);
        console.log(response.data)
    };

    return (
        <div className="brewery-details-container">
            <h2> Name:{brewery.name}</h2>
            <p> street:{brewery.street}<br/>city:{brewery.city}<br/> state:{brewery.state}<br/></p>
            <p>phone: {brewery.phone}</p>
            <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Visit Website</a>
            <h3>Reviews</h3>
            <div className="reviews">
                {reviews.map(review => (
                    <div key={review._id} className="review">
                        <p>Rating: {review.rating}/5</p>
                        <p>{review.description}</p>
                        <p>by {review.user.name}</p>
                    </div>
                ))}
            </div>
            {user && (
                <form onSubmit={handleSubmit} className="review-form">
                    <h3>Add a Review</h3>
                    <label>
                        Rating:
                        <select value={rating} onChange={(e) => setRating(e.target.value)}>
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                    />
                    <button type="submit">Submit Review</button>
                </form>
            )}
        </div>
    );
};

export default BreweryDetails;
