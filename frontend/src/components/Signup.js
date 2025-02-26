import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/signup', { username, password });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Could not create account');
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-lg font-semibold">Signup</h2>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="border p-2 w-full" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 w-full mt-2" />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-2 w-full">Sign Up</button>
            </form>
        </div>
    );
}
