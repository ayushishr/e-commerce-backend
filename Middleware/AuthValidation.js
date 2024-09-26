const joi = require('joi');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const signupValidation = async (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
        return res.status(400).json({
            message: "Bad request by Middleware",
            error: error.details[0].message  // Send a specific error message

        });
    }
    next();
};

const loginValidation = async (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message  // Send a specific error message
        });
    }
    next();
};


const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from the authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded",decoded)
      // Find user by decoded ID and exclude the password
      req.user = await UserModel.findById(decoded._id).select('-password');

      // Move to the next middleware
      return next();
    } catch (error) {
      console.log("error",error)
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the header
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};



module.exports = {
    signupValidation,
    loginValidation,
    protect
};
