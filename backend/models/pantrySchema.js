// models/pantryStaffSchema.js
import mongoose from 'mongoose';

const pantryStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  assignedTasks: [
    { 
      task: { type: String, required: true },
      status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
      assignedAt: { type: Date, default: Date.now },
    },
  ],
  dateOfJoining: { type: Date, default: Date.now },
});

const PantryStaff = mongoose.model('PantryStaff', pantryStaffSchema);

export default PantryStaff;
