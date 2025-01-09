// models/foodDeliverySchema.js
import mongoose from 'mongoose';

const foodDeliverySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }, // Reference to Patient model
  dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart', required: true }, // Reference to DietChart
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'PantryStaff', required: true }, // Reference to PantryStaff
  deliveryStatus: { type: String, enum: ['pending', 'in-progress', 'delivered'], default: 'pending' },
  deliveryTime: { type: Date, required: true }, // When the meal is scheduled for delivery
  actualDeliveryTime: { type: Date }, // Time when the meal was actually delivered
  notes: { type: String }, // Any additional information about the delivery
  createdAt: { type: Date, default: Date.now },
});

const FoodDelivery = mongoose.model('FoodDelivery', foodDeliverySchema);

export default FoodDelivery;
