// controllers/foodDeliveryController.js
import FoodDelivery from '../models/foodDeliverySchema.js';
import PantryStaff from '../models/pantryStaffSchema.js';
import Patient from '../models/patientSchema.js';
import DietChart from '../models/dietChartSchema.js';

// Create a new food delivery entry
export const createFoodDelivery = async (req, res) => {
  const { patientId, dietChartId, assignedTo, deliveryTime } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    const dietChart = await DietChart.findById(dietChartId);
    const pantryStaff = await PantryStaff.findById(assignedTo);

    if (!patient || !dietChart || !pantryStaff) {
      return res.status(404).json({ message: 'Invalid patient, diet chart, or pantry staff ID' });
    }

    const newFoodDelivery = new FoodDelivery({
      patientId,
      dietChartId,
      assignedTo,
      deliveryTime,
    });

    await newFoodDelivery.save();
    res.status(201).json({ message: 'Food delivery created successfully', foodDelivery: newFoodDelivery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Get all food deliveries
export const getFoodDeliveries = async (req, res) => {
  try {
    const foodDeliveries = await FoodDelivery.find().populate('patientId dietChartId assignedTo');
    res.status(200).json(foodDeliveries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Get a specific food delivery by ID
export const getFoodDeliveryById = async (req, res) => {
  const { id } = req.params;

  try {
    const foodDelivery = await FoodDelivery.findById(id).populate('patientId dietChartId assignedTo');
    if (!foodDelivery) {
      return res.status(404).json({ message: 'Food delivery not found' });
    }
    res.status(200).json(foodDelivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Update food delivery status
export const updateFoodDelivery = async (req, res) => {
  const { id } = req.params;
  const { deliveryStatus, actualDeliveryTime, notes } = req.body;

  try {
    const updatedFoodDelivery = await FoodDelivery.findByIdAndUpdate(id, {
      deliveryStatus,
      actualDeliveryTime,
      notes,
    }, { new: true });

    if (!updatedFoodDelivery) {
      return res.status(404).json({ message: 'Food delivery not found' });
    }
    res.status(200).json({ message: 'Food delivery updated successfully', foodDelivery: updatedFoodDelivery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Delete
