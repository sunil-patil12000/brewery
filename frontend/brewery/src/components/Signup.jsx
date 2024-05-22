import  { useState } from 'react';


import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        console.log(password)
        e.preventDefault();
        const tf= await axios.post("http://localhost:5000/api/users/signup",{
            name:name,
            email: email,
            password: password
        })
       if (tf.data.token) {
        sessionStorage.setItem('user',tf.data.token);
        navigate('/');
        
        
       }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit} className="auth-form">
            <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
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
                <button onClick={handleSubmit} type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
