import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import axios from "axios";

const GardenPlanner = () => {
    const [zones, setZones] = useState({ sunlight_areas: [], obstacles: [], recommended_zones: [] });

    useEffect(() => {
    const fetchAnalysis = async () => {
        try {
            console.log("Fetching AI data...");
            const response = await axios.get("/api/ai/get-latest-analysis");
            console.log("AI Data Received:", response.data);
            setZones(response.data || { sunlight_areas: [], obstacles: [], recommended_zones: [] });
        } catch (error) {
            console.error("Error fetching AI analysis:", error);
        }
    };

    fetchAnalysis(); // 🔹 Call function once
}, []); // 🔹 Empty dependency array prevents infinite loop


    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={1} />
                
                {/* Rooftop Base */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[12, 0.1, 12]} />
                    <meshStandardMaterial color="gray" />
                </mesh>

                {/* Sunlight Areas (Yellow) */}
                {zones.sunlight_areas.length > 0 &&
                    zones.sunlight_areas.map((pos, index) => (
                        <mesh key={`sunlight-${index}`} position={pos}>
                            <boxGeometry args={[1, 0.05, 1]} />
                            <meshStandardMaterial color="yellow" transparent opacity={0.5} />
                        </mesh>
                    ))}

                {/* Obstacles (Red) */}
                {zones.obstacles.length > 0 &&
                    zones.obstacles.map((pos, index) => (
                        <mesh key={`obstacle-${index}`} position={pos}>
                            <boxGeometry args={[1, 0.2, 1]} />
                            <meshStandardMaterial color="red" />
                        </mesh>
                    ))}

                {/* Recommended Planting Zones (Green) */}
                {zones.recommended_zones.length > 0 &&
                    zones.recommended_zones.map((pos, index) => (
                        <mesh key={`recommended-${index}`} position={pos}>
                            <boxGeometry args={[1, 0.1, 1]} />
                            <meshStandardMaterial color="green" transparent opacity={0.7} />
                        </mesh>
                    ))}

                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default GardenPlanner;
