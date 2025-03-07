import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PlantsList.css";

const PlantsList = () => {
  const [plants, setPlants] = useState({
    fruits: [],
    vegetables: [],
    herbs: [],
    wallHanging: [],
    decorative: []
  });

  useEffect(() => {
    axios.get("/api/plants")
      .then(response => {
        const categorizedPlants = {
          fruits: [],
          vegetables: [],
          herbs: [],
          wallHanging: [],
          decorative: []
        };
        
        response.data.forEach(plant => {
          switch (plant.category) {
            case "Fruit":
              categorizedPlants.fruits.push(plant);
              break;
            case "Vegetable":
              categorizedPlants.vegetables.push(plant);
              break;
            case "Herb":
              categorizedPlants.herbs.push(plant);
              break;
            case "Wall Hanging":
              categorizedPlants.wallHanging.push(plant);
              break;
            case "Decorative":
              categorizedPlants.decorative.push(plant);
              break;
            default:
              break;
          }
        });
        
        setPlants(categorizedPlants);
      })
      .catch(error => console.error("Error fetching plants:", error));
  }, []);

  return (
    <div className="plants-container">
      <h2>Plants List</h2>
      {Object.entries(plants).map(([category, plantList]) => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <ul>
            {plantList.map(plant => (
              <li key={plant.id}>{plant.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PlantsList;
