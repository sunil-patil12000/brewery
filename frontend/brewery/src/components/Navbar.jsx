
import { Link, useNavigate } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
   
    const navigate = useNavigate();
    const user =sessionStorage.getItem('user');

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">BreweryApp</Link>
            <div className="navbar-links">
                {user ? (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/search">Search</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
