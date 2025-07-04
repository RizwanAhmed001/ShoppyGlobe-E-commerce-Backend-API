import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Middleware to authenticate users using JWT
export const authMiddleware = (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // If no Authorization header present, deny access
  if (!authHeader) 
    return res.status(401).json({ message: 'No token provided' });

  // Extract token from header (expected format: "Bearer <token>")
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key ("mySecret")
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the userId from token payload to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, respond with 401 Unauthorized
    res.status(401).json({ message: 'Invalid token' });
  }
};