import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signup = async (userData) => {
        const response = await axios.post('/api/users/signup', userData);
        setUser(response.data);
    };

    const login = async (userData) => {
        const response = await axios.post('/api/users/login', userData);
        setUser(response.data);
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        // Optionally check for an existing user session
        const checkUserSession = async () => {
            const response = await axios.get('/api/users/session');
            if (response.data) {
                setUser(response.data);
            }
        };

        checkUserSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
