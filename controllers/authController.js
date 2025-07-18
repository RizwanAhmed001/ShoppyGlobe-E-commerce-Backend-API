// Library to hash passwords securely
import bcrypt from "bcryptjs";
// Library to generate and verify JWT tokens
import jwt from "jsonwebtoken";
// User mongoose model
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

// Register new user
export const registerUser = async (req, res) => {
  // Extract user details from request body
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if a user with the same email already exists
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please Fill All Fileds" });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "invalid email format" });
    }

    // Password regex validation (at least 6 chars, 1 letter, 1 number, 1 special 1 Capital)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "password must be at least 6 characters, include at least one Capital letter one small letter, one number and one special character.",
        });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    // Hash the password before saving to the database (10 salt rounds)
    const hash = await bcrypt.hash(password, 10);

    // Create new user document with hashed password
    const user = new User({ firstName, lastName, email, password: hash });

    // Save user to the database
    await user.save();

    // Respond with success message and status 201 (Created)
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    // Handle unexpected errors with status 500
    res.status(500).json({ message: "Server error" });
  }
};

// Login existing user
export const loginUser = async (req, res) => {
  // Extract credentials from request body
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token with userId payload, expires in 1 hour
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with the JWT token
    res.status(200).json({ token });
  } catch (err) {
    // Handle unexpected errors with status 500
    res.status(500).json({ message: "Server error" });
  }
};
