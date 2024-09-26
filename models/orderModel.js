const mongoose = require('mongoose');
const Inventory = require('../models/inventoryModel');
const User = require('../models/user')


const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    address: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'], // Valid status values
        default: 'Pending'
    },
    placeDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
