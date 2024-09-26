
require('dotenv').config();

const mongoose = require('mongoose');

// Use the MONGO_URI from the .env file
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB locally');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});
