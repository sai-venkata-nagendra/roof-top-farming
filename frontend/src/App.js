import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import Home from './components/Home.js';
import Signup from './components/Signup.js';

export default function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    
    useEffect(() => {
        if (token) {
            axios.get('/api/auth/validate-token', {
                headers: { Authorization: `Bearer ${token}` }
            }).catch(() => {
                setToken(null);
                localStorage.removeItem('token');
            });
        }
    }, [token]);

    return (
        <Router>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Rooftop Farming App</h1>
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/signup" element={<Signup setToken={setToken} />} />
                    <Route path="/dashboard" element={token ? <Dashboard /> : <Login setToken={setToken} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}
