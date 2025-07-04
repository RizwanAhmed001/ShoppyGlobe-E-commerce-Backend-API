// Import mongoose to define the schema and model
import mongoose from 'mongoose';

// Define the schema for the User collection
// const userSchema = new mongoose.Schema({
//   // First name of the user (required)
//   firstName: {
//     type: String,
//     required: true
//   },
//   // Last name of the user (required)
//   lastName: {
//     type: String,
//     required: true
//   },
//   // User's email (required and must be unique)
//   email: { 
//     type: String, 
//     required: true,
//      // Prevents duplicate emails
//     unique: true 
//   },
//   password: { 
//     type: String,
//     required: true
//   }
// });

const userSchema = new mongoose.Schema({
  // First name of the user (required)
  firstName: {
    type: String,
    required: true
  },
  // Last name of the user (required)
  lastName: {
    type: String,
    required: true
  },
  // User's email (must be unique and end with @gmail.com)
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return value.endsWith("@gmail.com");
      },
      message: "Email must be a Gmail address (e.g., user@gmail.com)"
    }
  },
  // Password must be at least 6 characters
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"]
  }
});



// Export the User model to interact with the "users" collection in MongoDB
export default mongoose.model('User', userSchema);