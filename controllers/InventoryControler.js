const Inventory = require('../models/inventoryModel');

// Get all products
const getInventory = async (req, res) => {
  const products = await Inventory.find();
  res.status(200).json(products);
};

// Create a product
const createInventory = async (req, res) => {
  const { name, description, quantity, weight, price } = req.body;

  const product = new Inventory({
    name,
    description,
    quantity,
    weight,
    price,
  });

  await product.save();
  res.status(201).json(product);
};

// Get a single product by ID
const getInventoryById = async (req, res) => {
  const product = await Inventory.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { getInventory, createInventory, getInventoryById };
