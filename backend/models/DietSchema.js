// models/dietChartSchema.js
import mongoose from 'mongoose';

const dietChartSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }, // Reference to Patient model
  meals: [
    {
      mealTime: { type: String, enum: ['morning', 'evening', 'night'], required: true },
      ingredients: { type: [String], required: true },
      instructions: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const DietChart = mongoose.model('DietChart', dietChartSchema);

export default DietChart;
