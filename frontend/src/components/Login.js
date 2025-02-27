import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setToken }) {
    const [email, setEmail] = useState('');  // 🔄 Changed username → email
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending login request with:", { email, password }); // ✅ Log request payload

            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            console.log("Login successful:", response.data); // ✅ Log response

            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);

            if (error.response) {
                console.error("Response Data:", error.response.data);
                console.error("Response Status:", error.response.status);
            }

            alert('Invalid credentials');
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-lg font-semibold">Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 w-full" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 w-full mt-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 w-full">Login</button>
            </form>
        </div>
    );
}
