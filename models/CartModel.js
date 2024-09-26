const mongoose = require('mongoose');
const Inventory = require('../models/inventoryModel');
const User = require('../models/user')

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Cart', cartSchema);
