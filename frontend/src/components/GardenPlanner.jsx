import React, { useEffect, useState } from "react";

export default function GardenPlanner() {
  const [unityLoaded, setUnityLoaded] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState("Waiting...");

  useEffect(() => {
    const handleUnityMessage = (event) => {
      if (typeof event.data === "string" && event.data.includes("Unity Loaded")) {
        setUnityLoaded(true);
      } else if (typeof event.data === "string") {
        setSimulationStatus(event.data); // Receive messages from Unity
      }
    };

    window.addEventListener("message", handleUnityMessage);
    return () => window.removeEventListener("message", handleUnityMessage);
  }, []);

  const addObstacle = () => {
    window.UnityInstance?.SendMessage("GameManager", "AddObstacle", "3,2");
  };

  const addPlant = (plantType) => {
    const x = Math.random() * 10; // Example position
    const y = Math.random() * 10;
    window.UnityInstance?.SendMessage("GameManager", "AddPlant", `${plantType},${x},${y}`);
  };

  return (
    <div className="unity-container">
      <iframe
        src="/Build/index.html"
        title="Unity Rooftop Simulation"
        width="100%"
        height="600px"
        frameBorder="0"
      />
      <div className="controls">
        <button onClick={addObstacle} disabled={!unityLoaded}>Add Obstacle</button>
        <button onClick={() => addPlant("Tomato")} disabled={!unityLoaded}>Add Tomato</button>
        <button onClick={() => addPlant("Lettuce")} disabled={!unityLoaded}>Add Lettuce</button>
        <button onClick={() => addPlant("Mint")} disabled={!unityLoaded}>Add Mint</button>
        <p>Simulation Status: {simulationStatus}</p>
      </div>
    </div>
  );
}
