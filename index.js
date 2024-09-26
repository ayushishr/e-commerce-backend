const express = require('express');
const app = express();
require('dotenv').config();
require('./config/db');
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./routes/AuthRouter')
const inventoryRoutes = require("./routes/inventoryRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRouter")

// making port
const PORT = process.env.PORT || 8000

// using middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter)
app.use('/inventory', inventoryRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);


app.listen(PORT, () => {
    console.log('server is running')
})