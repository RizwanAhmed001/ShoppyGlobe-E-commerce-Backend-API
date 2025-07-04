// Import express to create the router
import express from 'express';

// Import controller functions that handle the business logic for products
import { addProduct, allProducts, singleProduct } from '../controllers/productController.js';

// Create a new router instance
const router = express.Router();

// Route to get all products
// GET /products
router.get('/', allProducts);

// Route to get a single product by its ID
// GET /products/:id
router.get('/:id', singleProduct);

// Route to add product 
router.post("/product", addProduct)

// Export the router so it can be used in app.js
export default router;


