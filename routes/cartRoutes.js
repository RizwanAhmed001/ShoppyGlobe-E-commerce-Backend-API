// Import express to create a router
import express from 'express';

// Import cart controller functions that handle add, update, and delete logic
import { addToCart, updateCart, deleteFromCart } from '../controllers/cartController.js';

// Import middleware to protect routes (user must be authenticated)
import { authMiddleware } from '../middleware/authMiddleware.js';

// Create a new router instance
const router = express.Router();

// ----------- PROTECTED CART ROUTES -----------

// Route to add a product to the cart
// POST /cart
// Requires user to be authenticated
router.post('/', authMiddleware, addToCart);

// Route to update an item in the cart (e.g., change quantity)
// PUT /cart/:id
// Requires user to be authenticated
router.put('/:id', authMiddleware, updateCart);

// Route to delete an item from the cart
// DELETE /cart/:id
// Requires user to be authenticated
router.delete('/:id', authMiddleware, deleteFromCart);

// Export the router so it can be used in app.js
export default router;
