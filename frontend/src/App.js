import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import Home from './components/Home.js';
import Signup from './components/Signup.js';
import GardenPlanner from './components/GardenPlanner.jsx';
import Welcome from './components/Welcome.js';
import PlantsList from './components/PlantsList.js';

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
               
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/signup" element={<Signup setToken={setToken} />} />
                    <Route path="/dashboard" element={token ? <Dashboard /> : <Login setToken={setToken} />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/" element={<Welcome />} />
                    <Route path="/garden-planner" element={<GardenPlanner />} />
                    <Route path="/plants-list" element={<PlantsList />} />
                </Routes>
            </div>
        </Router>
    );
}
