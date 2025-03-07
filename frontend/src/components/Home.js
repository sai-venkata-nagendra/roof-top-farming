import React from "react";
import "./Home.css"; // Assuming you have a CSS file

const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: "url(/images/BG-Home.jpeg)", // Direct reference
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/images/logo.png" alt="Rooftop Farming Logo" className="logo" />
          <span className="website-name">Rooftop Farming</span>
        </div>
        <ul className="nav-links">
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Signup</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to the Rooftop Farming App</h1>
        <p>Plan and optimize your rooftop farming with AI-driven insights.</p>
        <div className="button-container">
          <a href="/login" className="auth-button login-button">Login</a>
          <a href="/signup" className="auth-button signup-button">Signup</a>
        </div>
      </div>

      {/* Information Sections */}
      <div className="info-section">
        <h2>What is Rooftop Farming?</h2>
        <div className="grid">
          <div className="info-card">
            <img src="/images/rooftop1.jpg" alt="Rooftop Farming" />
            <p>Rooftop farming is a sustainable solution for urban areas...</p>
          </div>
          <div className="info-card">
            <img src="/images/rooftop2.jpg" alt="Rooftop Farming" />
            <p>Rooftop farming promotes biodiversity and reduces carbon footprints...</p>
          </div>
          <div className="info-card">
            <img src="/images/rooftop3.jpg" alt="Rooftop Farming" />
            <p>Efficient irrigation systems like drip irrigation and rainwater harvesting...</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Why Rooftop Farming?</h2>
        <div className="grid">
          <div className="info-card">
            <img src="/images/rooftop4.jpg" alt="Rooftop Farming" />
            <p>Provides local fresh, organic produce while reducing carbon emissions...</p>
          </div>
          <div className="info-card">
            <img src="/images/rooftop5.jpg" alt="Rooftop Farming" />
            <p>Enhances building aesthetics and makes cities greener...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
