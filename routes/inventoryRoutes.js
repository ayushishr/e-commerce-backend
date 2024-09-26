const express = require('express');
const { getInventory, createInventory, getInventoryById } = require('../controllers/InventoryControler');
const { protect } = require('../Middleware/AuthValidation');
const router = express.Router();

router.get('/', getInventory);
router.post('/', protect, createInventory); // for create new user
router.get('/:id', getInventoryById);

module.exports = router;
