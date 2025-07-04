import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// Add a product to the user's cart or update quantity if it already exists
export const addToCart = async (req, res) => {
  // Extract productId and quantity from request body
  const { productId, quantity } = req.body;  
  // Extract userId from the authenticated request
  const userId = req.userId;                  

  try {
    if(!productId){
      return res.status(400).json({message: "Please Provide ProductId"})
    }
    // Check if the product exists in the product collection
    const product = await Product.findById(productId);
    console.log("I am product", product)

    if (!product) 
      return res.status(404).json({ message: 'Product not found' });

    // Find the cart belonging to the user, or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

    if (itemIndex > -1) {
      // If product exists in cart, increase the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If product doesn't exist, add it as a new item
      cart.items.push({ productId, quantity });
    }

    // Save the updated cart to the database
    await cart.save();

    // Respond with the updated cart
    res.status(200).json(cart);
  } catch (err) {
    // Handle any server error
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the quantity of a specific product in the user's cart
export const updateCart = async (req, res) => {
  // New quantity from request body
  const { quantity } = req.body;     
  // Authenticated user's ID
  const userId = req.userId;    
  // Product ID from URL parameter     
  const productId = req.params.id;   

  try {
    // Find user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) 
      return res.status(404).json({ message: 'Cart not found' });

    // Find the item in the cart
    const item = cart.items.find(item => item.productId.equals(productId));
    if (!item) 
      return res.status(404).json({ message: 'Product not in cart' });

    // Update the quantity of the item
    item.quantity = quantity;

    // Save the updated cart
    await cart.save();

    // Respond with updated cart
    res.status(200).json(cart);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove a specific product from the user's cart
export const deleteFromCart = async (req, res) => {
  // Authenticated user's ID
  const userId = req.userId;         
  // Product ID to remove from cart
  const productId = req.params.id;   

  try {
    // Find user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) 
      return res.status(404).json({ message: 'Cart not found' });

    // Filter out the product to be removed
    cart.items = cart.items.filter(item => !item.productId.equals(productId));

    // Save the updated cart
    await cart.save();

    // Respond with success message
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Server error' });
  }
};