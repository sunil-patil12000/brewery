import { useEffect, useState } from 'react';
import axios from 'axios';
import './Search.css';
import { Link, useNavigate } from 'react-router-dom';



const Search = () => {
    const navigate =useNavigate();
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    // const [user, setUser] = useState(sessionStorage.getItem('user'));
    const user =sessionStorage.getItem('user');
    
    useEffect(() => {
        const search =  () => {
            if (!user) {
                navigate('/login')
        
                
            }
            
        }
        search();
      
    }, [])
    

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.openbrewerydb.org/breweries/search?query=${query}`);
            setSearchResults(response.data);
            setError(null);
        } catch (error) {
            console.error('Error searching for breweries:', error);
            setError('An error occurred while fetching data. Please try again later.');
            setSearchResults([]); 
    };

    return (
        <div className="search-container">
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city, name, or type..." 
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p className="error-message">{error}</p>}
            <div className="results-container">
            {searchResults.map(brewery => (
                <Link key={brewery.id} to={`/brewery/${brewery.id}`} className="brewery-link">
                    <div className="brewery-card">
                        <h3>{brewery.name}</h3>
                        <p>City: {brewery.city}</p>
                        <p>Type: {brewery.brewery_type}</p>
                    </div>
                </Link>
            ))}
            </div>
        </div>
    );
};

 export default Search;
