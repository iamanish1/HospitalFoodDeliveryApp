// controllers/patientController.js
import Patient from '../models/patientSchema.js';
import DietChart from '../models/dietChartSchema.js';

// Create a new patient record
export const createPatient = async (req, res) => {
  const { name, disease, allergies, roomNumber } = req.body;

  try {
    const newPatient = new Patient({
      name,
      disease,
      allergies,
      roomNumber,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Get a single patient by ID
export const getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Update patient information
export const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, disease, allergies, roomNumber } = req.body;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, {
      name,
      disease,
      allergies,
      roomNumber,
    }, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Delete a patient record
export const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};
