import mongoose from 'mongoose';

// Define Schema
const idSchema = new mongoose.Schema({
  number: { 
    type: String, 
    required: true, 
    unique: true, 
  },
  data: { type: String, required:true},
}, { timestamps: true });

// Create Model
const ID = mongoose.model('ID', idSchema);

export default ID;
