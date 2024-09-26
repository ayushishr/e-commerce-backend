const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cartcontroller');
const { protect } = require('../Middleware/AuthValidation');
const { loginValidation } = require('../Middleware/AuthValidation');

// Add product to cart (user only)
router.post('/add',protect, addToCart);

// Get cart for a user
router.get('/:userId', protect, getCart);

module.exports = router;
