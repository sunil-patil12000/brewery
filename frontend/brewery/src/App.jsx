import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import BreweryDetails from './components/BreweryDetails';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/brewery/:id" element={<BreweryDetails />} />
                        <Route path="/" element={<Search />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
