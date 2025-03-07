const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sunlight: { type: String, required: true },
  water: { type: String, required: true },
  growth_time: { type: String, required: true },
  temperature: { type: String, required: true },
  soil_type: { type: String, required: true },
  spacing: { type: String, required: true },
  cost: { type: Number, required: true }  // Added cost field
});

module.exports = mongoose.model("Plant", PlantSchema);
