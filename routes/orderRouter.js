const express = require('express');
const router = express.Router();

// Import the order controller
const orderController = require('../controllers/orderController');
const orderModel = require('../models/orderModel');

// Define routes for order-related functionality
router.post('/placed', orderController.placeOrder); 

 // Ensure that `placeOrder` is properly defined

//  router.patch('/placed/:id', async (req, res) => {
//     try {
//         const _id = req.params.id;
        
//         // Validate request body (you can add specific validations as needed)
//         if (!req.body.status) {
//             return res.status(400).send({ message: 'Status field is required' });
//         }

//         // Update the order status
//         const updatedStatus = await orderModel.findByIdAndUpdate(_id, req.body, { new: true });
        
//         // If no order is found, respond with 404
//         if (!updatedStatus) {
//             return res.status(404).send({ message: 'Order not found' });
//         }

//         // Send the updated order back in the response
//         res.send(updatedStatus);
        
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).send({ message: 'An error occurred while updating the order', error: error.message });
//     }
// });


router.put('/update-status', orderController.updateOrderStatus);

module.exports = router;
