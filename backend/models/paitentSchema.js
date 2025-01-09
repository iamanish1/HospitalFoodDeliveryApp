// models/patientSchema.js
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  disease: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  allergies: { type: String, required: false },
  roomNumber: { type: String, required: true },
  dateOfAdmission: { type: Date, default: Date.now },
  dietChart: [{ type: mongoose.Schema.Types.ObjectId, ref: "DietChart" }], // References diet chart
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
