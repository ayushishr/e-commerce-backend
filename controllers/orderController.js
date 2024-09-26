const Order = require('../models/orderModel');
const Cart = require('../models/CartModel');

// Place an order
exports.placeOrder = async (req, res) => {
    const { userId, address } = req.body;

    // Validate input
    if (!userId || !address) {
        return res.status(400).json({ message: 'User ID and address are required' });
    }

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or does not exist' });
        }

        // Create a new order from the cart
        const order = new Order({
            userId,
            products: cart.products, // Items in the cart
            address,
            totalAmount: cart.totalAmount, // Set the total amount from the cart
            placedDate: Date.now(), // Use the correct property
            status: 'pending', // Track order status
        });

        // Save the new order to the database
        const newOrder = await order.save();

        // Clear the user's cart after placing the order
        await Cart.findOneAndUpdate({ userId }, { products: [], totalAmount: 0 }); // Reset totalAmount

        // Respond with success and the created order
        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to place order', error: error.message });
    }
};



// Update order status using a number
exports.updateOrderStatus = async (req, res) => {
    const { orderId, statusNumber } = req.body;

    // Status number to status mapping
    const statusMapping = {
        1: 'Pending',
        2: 'Shipped',
        3: 'Delivered',
        4: 'Canceled'
    };

    // Validate input
    if (!orderId || !statusNumber) {
        return res.status(400).json({ message: 'Order ID and status number are required' });
    }

    try {
        // Check if orderId is a valid MongoDB ObjectId
        if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid Order ID format' });
        }

        // Find the order by ID
        const order = await Order.findById(orderId);
        
        // Check if the order exists
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Get the current status number
        const currentStatusNumber = Object.keys(statusMapping).find(key => statusMapping[key] === order.status);

        // Validate if the status number is a valid transition
        if (statusNumber < 1 || statusNumber > 4) {
            return res.status(400).json({ message: 'Order status does not exist' });
        }

        if (statusNumber !== parseInt(currentStatusNumber) + 1) {
            return res.status(400).json({ message: 'Invalid status transition' });
        }

        // Get the new status from the mapping
        const newStatus = statusMapping[statusNumber];

        // Update the status of the order
        order.status = newStatus;

        // Save the updated order to the database
        await order.save();

        // Respond with success and the updated order
        res.status(200).json({
            message: 'Order status updated successfully',
            order: order
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};



