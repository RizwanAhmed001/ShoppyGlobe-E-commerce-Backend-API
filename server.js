// Import the Express app instance from app.js
import app from './app.js';

// Import and configure dotenv to enable use of environment variables
import dotenv from 'dotenv';
dotenv.config();

// Define the port number (you can also use process.env.PORT for flexibility)
const port = process.env.PORT;

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message once the server is successfully running
  console.log(`Server running on http://localhost:${port}`);
});