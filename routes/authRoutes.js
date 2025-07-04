// Import express to create a router
import express from 'express';

// Import controller functions for user registration and login
import { registerUser, loginUser } from '../controllers/authController.js';

// Initialize a new router instance
const router = express.Router();

// Route for new user registration
// POST /register
// Expects user details (e.g., name, email, password) in req.body
router.post('/register', registerUser);

// Route for user login
// POST /login
// Expects credentials (e.g., email, password) in req.body
router.post('/login', loginUser);

// Export the configured router to be used in app.js
export default router;
