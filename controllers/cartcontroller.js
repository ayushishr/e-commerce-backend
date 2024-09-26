const Cart = require('../models/CartModel');
const Inventory = require('../models/inventoryModel');  // Import Inventory to get product price

exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        // Check if cart exists for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [], totalAmount: 0 });
        }

        // Check if product already exists in cart
        const productExists = cart.products.find(p => p.productId.toString() === productId);
        if (productExists) {
            productExists.quantity += quantity;
        } else {
            // Add new product to cart
            cart.products.push({ productId, quantity });
        }

        // Recalculate total amount
        let totalAmount = 0;
        for (let item of cart.products) {
            // Get the price of the product from the Inventory model
            const product = await Inventory.findById(item.productId);
            if (product) {
                totalAmount += item.quantity * product.price;  // Calculate total based on product price
            } else {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
        }

        cart.totalAmount = totalAmount;

        // Save the cart
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get cart for a user
exports.getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
