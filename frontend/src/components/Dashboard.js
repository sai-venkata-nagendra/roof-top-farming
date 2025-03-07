import React, { useState } from "react";
import "./Dashboard.css"; // Import the CSS file for styling

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Background Grid */}
      <div className="grid-background"></div>
      
      {/* Menu Toggle Button */}
      <button className={`menu-toggle ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      
      {/* Page Title */}
      <h2 className="page-title">Dashboard</h2>
      
      {/* Sidebar Menu */}
      <nav className={`side-menu ${menuOpen ? "active" : ""}`}>
        <div className="menu-section">
          <h3>Dashboard <span className="menu-arrow">←</span></h3>
        </div>
        
        <div className="menu-section">
          <h3>Toolbox</h3>
          <div className="menu-item">🖌️ Draw</div>
          <div className="menu-item">✂️ Cut</div>
          <div className="menu-item">🔍 Zoom</div>
        </div>
        
        <div className="menu-section">
          <h3>Selected Plants</h3>
          <div className="menu-item"><a href="/plants-list">🌿 Plant List</a></div>
        </div>
        
        <div className="menu-section">
          <h3>Navigation</h3>
          <div className="menu-item">🏠 Home</div>
          <div className="menu-item">🗺️ Map View</div>
          <div className="menu-item">⚙️ Settings</div>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
