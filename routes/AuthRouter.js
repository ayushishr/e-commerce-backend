const { signup , login} = require('../controllers/AuthControler');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const express = require('express');  

const router = express.Router();  // Call Router with parentheses

// Example login route
router.post('/login', loginValidation, login )

// Signup route with validation
router.post('/signup', signupValidation, signup)

    
module.exports = router;
