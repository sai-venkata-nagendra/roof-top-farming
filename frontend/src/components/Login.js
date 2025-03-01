import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Password visibility state
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error message state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login form submitted"); // Debug
        setLoading(true); // Start loading
        setError(''); // Clear previous errors
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            console.log("API Response:", response.data); // Debug
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="login-container">
            <div className="login-box glassmorphism animate-fade-in">
                <h2 className="text-3xl font-bold mb-8 text-white">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full p-3 border rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full p-3 border rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-white"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 flex items-center justify-center"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> // Spinner
                        ) : (
                            "Login"
                        )}
                    </button>

                    {/* Add the "Don't have an account? Sign up" text */}
                    <div className="signup-prompt">
                        <p className="signup-text">Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}