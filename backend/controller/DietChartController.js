// controllers/dietChartController.js
import DietChart from '../models/dietChartSchema.js';
import Patient from '../models/patientSchema.js';

// Create a new diet chart for a patient
export const createDietChart = async (req, res) => {
  const { patientId, meals } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const newDietChart = new DietChart({
      patientId,
      meals,
    });

    await newDietChart.save();
    res.status(201).json({ message: 'Diet chart created successfully', dietChart: newDietChart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Get all diet charts
export const getDietCharts = async (req, res) => {
  try {
    const dietCharts = await DietChart.find().populate('patientId');
    res.status(200).json(dietCharts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Get a specific diet chart by ID
export const getDietChartById = async (req, res) => {
  const { id } = req.params;

  try {
    const dietChart = await DietChart.findById(id).populate('patientId');
    if (!dietChart) {
      return res.status(404).json({ message: 'Diet chart not found' });
    }
    res.status(200).json(dietChart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Update a diet chart
export const updateDietChart = async (req, res) => {
  const { id } = req.params;
  const { meals } = req.body;

  try {
    const updatedDietChart = await DietChart.findByIdAndUpdate(id, { meals }, { new: true });

    if (!updatedDietChart) {
      return res.status(404).json({ message: 'Diet chart not found' });
    }
    res.status(200).json({ message: 'Diet chart updated successfully', dietChart: updatedDietChart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Delete a diet chart
export const deleteDietChart = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDietChart = await DietChart.findByIdAndDelete(id);

    if (!deletedDietChart) {
      return res.status(404).json({ message: 'Diet chart not found' });
    }
    res.status(200).json({ message: 'Diet chart deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};
