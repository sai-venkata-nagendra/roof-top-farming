import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css"; // Ensure you create this CSS file

const Welcome = () => {
    return (
        <div className="welcome-page">
            <header>
                <div className="logo-container">
                    <img src="images/logo.png" alt="Logo" className="logo" />
                    <h1>Rooftop Plant Management</h1>
                </div>
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </nav>
            </header>

            <section className="hero">
                <div className="hero-text">
                    <h2>Generate</h2>
                    <h2>Your</h2>
                    <h2>Rooftop</h2>
                    <h2>Design</h2>
                </div>
                <div className="animated-rooftop" id="rooftop-container">
                    <img src="images/animated.jpeg" alt="Animated Rooftop" id="rooftop-image" />
                </div>
            </section>

            <div className="get-started">
                <Link to="/home" className="btn">Get Started</Link>
            </div>

            <section className="features">
                <h2>Why Choose Us?</h2>
                <div className="feature-grid">
                    <div className="feature">
                        <img src="images/feature1.jpeg" alt="Feature 1" />
                        <p>Eco-friendly rooftop designs</p>
                    </div>
                    <div className="feature">
                        <img src="images/feature2.jpg" alt="Feature 2" />
                        <p>Smart plant recommendations</p>
                    </div>
                    <div className="feature">
                        <img src="images/feature3.jpg" alt="Feature 3" />
                        <p>Customized layouts for every home</p>
                    </div>
                </div>
            </section>

            <section className="about">
                <h2>About Us</h2>
                <p>We help you design and manage rooftop gardens, making urban spaces greener and healthier.</p>
            </section>
        </div>
    );
};

export default Welcome;
