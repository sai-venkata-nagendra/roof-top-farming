import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="text-center p-4">
            <h1 className="text-3xl font-bold">Welcome to the Rooftop Farming App</h1>
            <p className="mt-2 text-lg">Plan and optimize your rooftop farming with AI-driven insights.</p>
            <div className="mt-4">
                <Link to="/login" className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded">Signup</Link>
            </div>
        </div>
    );
}
