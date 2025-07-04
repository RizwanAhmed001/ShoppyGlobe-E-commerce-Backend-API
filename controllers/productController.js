// Import the Product model to interact with the database
import Product from '../models/productModel.js';

// Controller to get all products
export const allProducts = async (req, res) => {
  try {
    // Fetch all products from MongoDB collection
    const products = await Product.find();

    // Respond with status 200 and the list of products in JSON format
    res.status(200).json(products);
  } catch (err) {
    // If an error occurs, respond with status 500 and an error message
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get a single product by its ID
export const singleProduct = async (req, res) => {
  try {
    // Find the product by ID passed as URL parameter
    const product = await Product.findById(req.params.id);

    // If product not found, respond with 404 status and message
    if (!product) 
      return res.status(404).json({ message: 'Product not found' });

    // If found, respond with product data
    res.status(200).json(product);
  } catch (err) {
    // On error (e.g., invalid ID format), respond with status 500 and message
    res.status(500).json({ message: 'Server error' });
  }
};

export const addProduct = async (req, res) => {
  const {name, price, description, stock} = req.body;
  try{
    if(!name || !price || !description || !stock){
    return res.status(400).json({message: "Please Fill All Fields"})
  }

  let newProduct = new Product({
    name: name,
    price: price,
    description: description,
    stock: stock,
  })

  await newProduct.save();

  res.status(201).json(newProduct)
  
  }catch (err){
    res.status(500).json({ message: 'Server error' });
  }
  
}