// Import mongoose to define schema and model
import mongoose from 'mongoose';

// Define schema for Cart document
const cartSchema = new mongoose.Schema({
  // Reference to the user who owns the cart
  userId: mongoose.Schema.Types.ObjectId,

  // Array of items in the cart
  items: [
    {
      // Reference to a product in the cart
      productId: mongoose.Schema.Types.ObjectId,

      // Quantity of this product in the cart
      quantity: {
        type: Number,
        required: true
      }
    },
  ],
});

// Export the Cart model to interact with the 'carts' collection in MongoDB
export default mongoose.model('Cart', cartSchema);