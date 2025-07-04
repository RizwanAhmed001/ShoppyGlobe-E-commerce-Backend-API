// Importing required modules

// Express framework to handle routing and middleware
import express from 'express'; 
// ODM to interact with MongoDB
import mongoose from 'mongoose'; 
// Product-related API routes
import productRoutes from './routes/productRoutes.js'; 
// Cart-related API routes
import cartRoutes from './routes/cartRoutes.js'; 
// Authentication-related API routes
import authRoutes from './routes/authRoutes.js'; 
// Custom error handler middleware
import { errorHandler } from './middleware/errorHandler.js'; 
// Middleware to log HTTP methods
import { methodLogs } from './middleware/errorHandler.js'; 
// To load environment variables from .env file
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Parse incoming JSON data
app.use(express.json());

// Custom middleware to log method, URL, and response status
app.use(methodLogs);

// All product-related routes will start with /products
app.use('/products', productRoutes);

// All cart-related routes will start with /cart
app.use('/cart', cartRoutes);

// Auth routes for login/register can be directly accessed from root (/login, /register, etc.)
app.use('/', authRoutes);

// Custom error handler to handle all application-level errors
app.use(errorHandler);

// // Connect to MongoDB on localhost with default port and log the result
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection failed:", err));

// Export app instance to be used in server.js or testing
export default app;