import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup({ setToken }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/signup', { name, email, password });

            if (response.data.token) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            } else {
                alert('Signup successful, but no token received. Please log in.');
                navigate('/login');
            }
        } catch (error) {
            console.error('Signup failed:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Could not create account');
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-lg font-semibold">Signup</h2>
            <form onSubmit={handleSignup}>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="border p-2 w-full"
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="border p-2 w-full mt-2"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="border p-2 w-full mt-2"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-2 w-full">Sign Up</button>
            </form>
        </div>
    );
}
