import React from 'react';
import { Link } from 'react-router-dom';
import rooftop1 from './images/rooftop1.jpg'; // Import images
import rooftop2 from './images/rooftop2.jpg';
import rooftop3 from './images/rooftop3.jpg';
import rooftop4 from './images/rooftop4.jpg';
import rooftop5 from './images/rooftop5.jpg';
import logo from './images/logo.png'; // Import your logo
import './Home.css';

export default function Home() {
    return (
        <div className="home-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Rooftop Farming Logo" className="logo" />
                    <span className="website-name">Rooftop Farming</span>
                </div>
                
            </nav>

            {/* Hero Section */}
            <div className="hero-section">
                <h1 className="text-5xl font-bold text-white">Welcome to the Rooftop Farming App</h1>
                <p className="mt-4 text-xl text-white">Plan and optimize your rooftop farming with AI-driven insights.</p>
                <div className="button-container mt-6">
                    <Link to="/login" className="auth-button login-button">Login</Link>
                    <Link to="/signup" className="auth-button signup-button">Signup</Link>
                </div>
            </div>

            {/* What is Rooftop Farming Section */}
            <div className="info-section mt-12">
                <h2 className="text-3xl font-bold mb-6 text-green-800">What is Rooftop Farming?</h2>
                <p className="custom-text-color text-lg">
                    Rooftop farming involves growing crops on the rooftops of buildings. It can range from simple container gardens to advanced hydroponic or aeroponic systems. This innovative approach to agriculture not only provides fresh produce but also enhances the aesthetic appeal of urban spaces.
                </p>
            </div>

            {/* Why Rooftop Farming Section */}
            <div className="info-section">
                <h2 className="text-3xl font-bold mb-6 text-green-800">Why Rooftop Farming?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Cards */}
                    {[rooftop1, rooftop2, rooftop3, rooftop4, rooftop5].map((image, index) => (
                        <div key={index} className="info-card">
                            <img src={image} alt="Rooftop Farming" className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105" />
                            <p className="mt-4 text-gray-700">
                                {[
                                    "Rooftop farming is a sustainable solution for urban areas. It helps reduce the urban heat island effect, improves air quality, and provides fresh produce to city dwellers.",
                                    "Rooftop farming promotes biodiversity, reduces carbon footprints, and encourages community engagement. It transforms unused spaces into productive green areas.",
                                    "Rooftop farming helps conserve water by using efficient irrigation systems like drip irrigation and rainwater harvesting.",
                                    "It provides a local source of fresh, organic produce, reducing the need for transportation and lowering carbon emissions.",
                                    "Rooftop farming enhances the aesthetic appeal of buildings, making cities greener and more livable."
                                ][index]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}