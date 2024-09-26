const mongoose = require('mongoose');

// Inventory Schema
const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    
  },
  quantity: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true, // automatically adds `createdAt` and `updatedAt`
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
