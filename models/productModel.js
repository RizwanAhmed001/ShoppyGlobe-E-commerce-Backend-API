// Import mongoose to define schema and model
import mongoose from 'mongoose';

// Define the schema for a Product document
const productSchema = new mongoose.Schema({
  // Name of the product
  name: {
    type: String,
    required: true,
  },

  // Price of the product
  price: {
    type: Number,
    required: true,
  },

  // Description of the product
  description: {
    type: String,
    required: true,
  },

  // Available stock count
  stock: {
    type: Number,
    required: true,
  },
});

// Export the Product model to interact with the 'products' collection in MongoDB
export default mongoose.model('Product', productSchema);