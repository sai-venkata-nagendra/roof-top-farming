const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant"); // Import the Plant model

// ✅ Fetch all plants from the database
router.get("/", async (req, res) => {
  try {
    const plants = await Plant.find(); // Fetch all plants
    res.json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get plant by ID
router.get("/plants/:id", async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ error: "Plant not found" });
    res.json(plant);
  } catch (error) {
    console.error("Error fetching plant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Add a new plant (optional)
router.post("/plants", async (req, res) => {
  try {
    const { name, sunlight, water } = req.body;
    const newPlant = new Plant({ name, sunlight, water });
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    console.error("Error adding plant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Export router
module.exports = router;
