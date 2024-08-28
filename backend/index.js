const mongoose = require('mongoose'); // Import mongoose
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// MongoDB connection string
const MONGO_URI = "mongodb+srv://shopifylifedeveloper:UgWH6D0HbzOSUSLE@cluster0.w2mbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

connectDB(); // Establish the MongoDB connection

const port = process.env.port || 8000;
const app = express();

// Express middleware 
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(fileUpload({
    useTempFiles: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route imports
const authRoute = require("./src/router/auth");
const nurseryRoute = require("./src/router/nursery");
const nurseryStoreRoute = require("./src/router/nurseryStore");
const plantsRoute = require("./src/router/plants");
const products = require("./src/router/products");
const orderRoute = require("./src/router/orders");
const user = require("./src/router/user");
const cart = require("./src/router/cart");
const address = require("./src/router/address");
const payment = require("./src/router/payment");

// Route middleware
app.use('/api/v2/auth', authRoute);
app.use('/api/v2/user', user, cart, orderRoute, address);
app.use("/api/v2/nursery", nurseryRoute, nurseryStoreRoute, plantsRoute);
app.use("/api/v2/checkout", payment);

// Public routes
app.use("/api/v2/products", products);

// Error handling middleware
const errorHandlerMiddleware = require('./src/middleware/errorMiddleware');
app.use(errorHandlerMiddleware);

app.get('*', (req, res) => {
    res.status(200).send("Welcome to Plant Selling Website." + "<br />" + "Frontend App: " + `<a href="${process.env.FRONTEND_URL}" target="_blank">${process.env.FRONTEND_URL}</a>`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
