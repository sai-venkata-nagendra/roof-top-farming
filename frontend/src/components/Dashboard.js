import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './Dashboard.css';

// Import local images
import snakePlant from './images/snake-plant.jpg';
import pothos from './images/pothos.jpg';
import zzPlant from './images/zz-plant.jpg';
import monstera from './images/monstera.jpg';
import orchid from './images/orchid.jpg';
import succulent from './images/succulent.jpg';
import bonsai from './images/bonsai.jpg';
import roses from './images/roses.jpg';
import aloe from './images/aloe.jpg';
import mint from './images/mint.jpg';
import basil from './images/basil.jpg';
import lavender from './images/lavender.jpg';
import ivy from './images/ivy.jpg';
import fern from './images/fern.jpg';
import philodendron from './images/philodendron.jpg';
import airplant from './images/airplant.jpg';

function Dashboard() {
  const [rooftopImage, setRooftopImage] = useState(null);
  const [dimensions, setDimensions] = useState({ length: '', width: '' });
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedPlants, setSelectedPlants] = useState({
    home: [],
    decorative: [],
    medicinal: [],
    wall: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [parameters, setParameters] = useState({ size: '', type: '' });
  const [data, setData] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);

  // Handle image capture from camera
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setRooftopImage(imageSrc);
    setShowCamera(false);
  };

  // Rest of the code remains the same...

  // Plant data with local images and descriptions
  const plantCategories = [
    {
      id: 'home',
      name: 'Home Plants',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z"/><path d="M12 22V15.5"/><path d="M22 8.5L12 15.5L2 8.5"/><path d="M12 2V8.5"/><path d="M12 15.5L2 8.5"/><path d="M12 15.5L22 8.5"/></svg>',
      plants: [
        { id: 'snake', name: 'Snake Plant', image: snakePlant, description: 'Low-maintenance and air-purifying.' },
        { id: 'pothos', name: 'Pothos', image: pothos, description: 'Great for hanging baskets.' },
        { id: 'zz', name: 'ZZ Plant', image: zzPlant, description: 'Drought-tolerant and hardy.' },
        { id: 'monstera', name: 'Monstera', image: monstera, description: 'Popular for its unique leaf design.' }
      ]
    },
    {
      id: 'decorative',
      name: 'Decorative',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"/></svg>',
      plants: [
        { id: 'orchid', name: 'Orchid', image: orchid, description: 'Elegant and long-lasting blooms.' },
        { id: 'succulent', name: 'Succulent Garden', image: succulent, description: 'Perfect for small spaces.' },
        { id: 'bonsai', name: 'Bonsai Tree', image: bonsai, description: 'A miniature tree for zen vibes.' },
        { id: 'roses', name: 'Rose Bush', image: roses, description: 'Classic and fragrant.' }
      ]
    },
    {
      id: 'medicinal',
      name: 'Medicinal',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 8 4 4-4 4"/><path d="m3 8 4 4-4 4"/><path d="M13 5v14"/><path d="M8 9h8"/><path d="M8 15h8"/></svg>',
      plants: [
        { id: 'aloe', name: 'Aloe Vera', image: aloe, description: 'Healing properties for skin.' },
        { id: 'mint', name: 'Mint', image: mint, description: 'Refreshing and great for teas.' },
        { id: 'basil', name: 'Basil', image: basil, description: 'Aromatic and culinary uses.' },
        { id: 'lavender', name: 'Lavender', image: lavender, description: 'Calming and fragrant.' }
      ]
    },
    {
      id: 'wall',
      name: 'Wall Hangings',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/></svg>',
      plants: [
        { id: 'ivy', name: 'English Ivy', image: ivy, description: 'Great for vertical gardens.' },
        { id: 'fern', name: 'Boston Fern', image: fern, description: 'Lush and green.' },
        { id: 'philodendron', name: 'Philodendron', image: philodendron, description: 'Easy to care for.' },
        { id: 'airplant', name: 'Air Plants', image: airplant, description: 'No soil needed.' }
      ]
    }
  ];

  // Handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setRooftopImage(event.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  // Handle plant selection
  const togglePlantSelection = (categoryId, plantId) => {
    setSelectedPlants(prev => {
      const currentSelection = [...prev[categoryId]];
      const index = currentSelection.indexOf(plantId);
      
      if (index === -1) {
        currentSelection.push(plantId);
      } else {
        currentSelection.splice(index, 1);
      }
      
      return {
        ...prev,
        [categoryId]: currentSelection
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSuccess(false);
        setRooftopImage(null);
        setDimensions({ length: '', width: '' });
        setSelectedPlants({
          home: [],
          decorative: [],
          medicinal: [],
          wall: []
        });
      }, 3000);
    }, 1500);
  };

  // Count total selected plants
  const totalSelectedPlants = Object.values(selectedPlants).reduce(
    (sum, plants) => sum + plants.length, 0
  );

  // Handle modal submission
  const handleModalSubmit = () => {
    console.log('Image:', rooftopImage);
    console.log('Parameters:', parameters);
    setShowModal(false);
  };

  return (
    <div className="dashboard-container">
      <div className="container">
        <header className="header">
          <h1 className="title">Rooftop Plants Management</h1>
          <p className="subtitle">
            Transform your rooftop into a green oasis with our personalized plant selection and arrangement tool.
          </p>
        </header>

        <div className="main-card">
          <div className="card-header">
            <h2>Design Your Rooftop Garden</h2>
          </div>

          <form onSubmit={handleSubmit} className="form">
            {/* Rooftop Image Upload Section */}
            <div className="section">
              <h3 className="section-title">Upload Rooftop Image</h3>
              
              {rooftopImage ? (
                <div className="image-preview">
                  <img 
                    src={rooftopImage} 
                    alt="Rooftop Preview" 
                    className="preview-image"
                  />
                  <button 
                    type="button"
                    onClick={() => setRooftopImage(null)}
                    className="remove-button"
                  >
                    <span className="icon">×</span>
                  </button>
                </div>
              ) : (
                <div className="upload-options">
                  <label className="upload-option">
                    <div className="upload-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                        <circle cx="12" cy="13" r="3"></circle>
                      </svg>
                    </div>
                    <span className="upload-text">Take Photo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      onChange={handleImageUpload} 
                      className="hidden-input" 
                    />
                  </label>
                  
                  <label className="upload-option">
                    <div className="upload-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <span className="upload-text">Choose Photo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden-input" 
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Dimensions Section */}
            <div className="section">
              <h3 className="section-title">
                <span className="icon-small">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 5v14"></path>
                    <path d="M21 5v14"></path>
                    <path d="M12 5v14"></path>
                    <path d="M3 5h18"></path>
                  </svg>
                </span>
                Rooftop Dimensions
              </h3>
              
              <div className="dimensions-grid">
                <div className="dimension-input">
                  <label htmlFor="length" className="input-label">
                    Length (meters)
                  </label>
                  <input
                    type="number"
                    id="length"
                    min="1"
                    step="0.1"
                    value={dimensions.length}
                    onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                
                <div className="dimension-input">
                  <label htmlFor="width" className="input-label">
                    Width (meters)
                  </label>
                  <input
                    type="number"
                    id="width"
                    min="1"
                    step="0.1"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              
              {dimensions.length && dimensions.width && (
                <div className="area-calculation">
                  Total area: {(parseFloat(dimensions.length) * parseFloat(dimensions.width)).toFixed(2)} m²
                </div>
              )}
            </div>

            {/* Plant Selection Section */}
            <div className="section">
              <h3 className="section-title">
                Select Plants ({totalSelectedPlants} selected)
              </h3>
              
              <div className="categories">
                {plantCategories.map((category) => (
                  <div key={category.id} className="category">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className="category-header"
                    >
                      <div className="category-title">
                        <span className="category-icon" dangerouslySetInnerHTML={{ __html: category.icon }}></span>
                        <span className="category-name">{category.name}</span>
                        {selectedPlants[category.id].length > 0 && (
                          <span className="category-badge">
                            {selectedPlants[category.id].length} selected
                          </span>
                        )}
                      </div>
                      <span className="toggle-icon">
                        {expandedCategory === category.id ? '▲' : '▼'}
                      </span>
                    </button>
                    
                    {expandedCategory === category.id && (
                      <div className="category-content">
                        <div className="plants-grid">
                          {category.plants.map((plant) => (
                            <div 
                              key={plant.id}
                              onClick={() => togglePlantSelection(category.id, plant.id)}
                              className={`plant-card ${
                                selectedPlants[category.id].includes(plant.id)
                                  ? 'selected'
                                  : ''
                              }`}
                            >
                              <img 
                                src={plant.image} 
                                alt={plant.name}
                                className="plant-image"
                              />
                              <div className="plant-name">
                                <p>{plant.name}</p>
                                <p className="plant-description">{plant.description}</p>
                              </div>
                              {selectedPlants[category.id].includes(plant.id) && (
                                <div className="selected-badge">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="submit-container">
              <button
                type="submit"
                disabled={isSubmitting || !rooftopImage || !dimensions.length || !dimensions.width || totalSelectedPlants === 0}
                className={`submit-button ${
                  isSubmitting || !rooftopImage || !dimensions.length || !dimensions.width || totalSelectedPlants === 0
                    ? 'disabled'
                    : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Submit Selection
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Previously Generated Plans Section */}
        <div className="section plans-section">
          <div className="plans-header">
            <h3 className="section-title">Previously Generated Plans</h3>
            <button
              onClick={() => setShowModal(true)}
              className="new-plan-button"
            >
              Create New Plan
            </button>
          </div>

          {data.length === 0 ? (
            <p className="no-plans">No past generations found.</p>
          ) : (
            <div className="plans-grid">
              {data.map((item, index) => (
                <div key={index} className="plan-card">
                  <h3 className="plan-title">{item.title}</h3>
                  <img 
                    src={item.image} 
                    alt="Generated Model" 
                    className="plan-image"
                  />
                  <p className="plan-specs">{item.specifications}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="success-message">
            <div className="success-content">
              <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Your rooftop garden plan has been submitted successfully!
            </div>
          </div>
        )}

        {/* Modal for Custom Parameters */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3 className="modal-title">Upload Image & Enter Parameters</h3>
              <input 
                type="file" 
                onChange={handleImageUpload} 
                className="modal-input" 
              />
              <input 
                type="text" 
                placeholder="Enter size" 
                value={parameters.size} 
                onChange={(e) => setParameters({ ...parameters, size: e.target.value })} 
                className="modal-input" 
              />
              <input 
                type="text" 
                placeholder="Enter type" 
                value={parameters.type} 
                onChange={(e) => setParameters({ ...parameters, type: e.target.value })} 
                className="modal-input" 
              />
              <div className="modal-buttons">
                <button 
                  onClick={() => setShowModal(false)} 
                  className="modal-button cancel"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleModalSubmit} 
                  className="modal-button submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;