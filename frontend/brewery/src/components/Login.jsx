import  { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './Auth.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await login({ email, password });
        // navigate('/');
        
        const user = await axios.post(`https://brewery-ilyp.onrender.com/api/users/login`,{
            email: email,
            password: password
        })
        if (user.data.token) {
            sessionStorage.setItem('user',user.data.token);
            navigate('/');

            
        }

        
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
