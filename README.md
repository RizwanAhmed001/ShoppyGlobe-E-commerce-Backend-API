ShoppyGlobe E-commerce Backend API
A robust backend RESTful API for ShoppyGlobe — a full-featured e-commerce platform built with Node.js, Express, and MongoDB. This API handles user authentication, product management, and shopping cart functionality with secure JWT-based authorization.

🚀 Features
User Authentication: Register and login users with secure password hashing and JWT token issuance.

Product Management: Fetch all products or individual product details.

Shopping Cart: Add, update, and remove items in the authenticated user's cart.

Middleware: Custom middleware for authentication, logging, and error handling.

MongoDB Integration: Data persistence with Mongoose schemas and models.

Secure Practices: Password hashing using bcrypt and JWT token verification.

🛠️ Technologies
Node.js & Express.js

MongoDB & Mongoose

JSON Web Tokens (JWT)

bcrypt for password encryption

dotenv for environment variable management

📦 Installation & Setup
Prerequisites
Node.js (v14 or higher recommended)

MongoDB (local or remote instance)

Steps
Clone the repository

bash
Copy
Edit
git clone https://github.com/RizwanAhmed001/ShoppyGlobe-E-commerce-Backend-API.git
cd ShoppyGlobe-E-commerce-Backend-API
Install dependencies

bash
Copy
Edit
npm install
Configure environment variables

Create a .env file at the root with:

ini
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=your_secret_key_here
Start the server

bash
Copy
Edit
npm start
Server runs on http://localhost:5000 by default.

🔗 API Endpoints
Authentication
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	User login, returns JWT token

Products
Method	Endpoint	Description
GET	/products	Retrieve all products
GET	/products/:id	Retrieve product by ID

Cart (Requires JWT Auth)
Method	Endpoint	Description
POST	/cart	Add item to cart
PUT	/cart/:id	Update item quantity in cart
DELETE	/cart/:id	Remove item from cart

🧰 Middleware
authMiddleware: Protects routes by verifying JWT tokens.

methodLogs: Logs HTTP methods and request URLs.

errorHandler: Catches and formats errors consistently.

📁 Project Structure
bash
Copy
Edit
shoppyglobe-backend/
├── controllers/
│   ├── authController.js
│   ├── cartController.js
│   └── productController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── methodLogs.js
├── models/
│   ├── cartModel.js
│   ├── productModel.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   └── productRoutes.js
├── app.js
├── server.js
└── .env
💡 Tips
Use Postman or Thunder Client for API testing.

Keep your JWT secret (JWT_SECRET) secure and never commit .env files to version control.

Extend functionality by adding features like product categories, order processing, or payment integration.

<!-- How to Use cart -->

<!-- Post -->
In post request you have to give productId and quantity;
Like This
{
  "productId": "68676a8379d932b2074b06be",
  "quantity": 1200
}

<!-- Put -->
In put request you have to provide productId in request
Like This
http://localhost:5000/cart/68676a8379d932b2074b06be

and is need only quantity in body
{
  "quantity": 2000
}

<!-- Delete -->
In delete request you have to provide productId in request
Like This
http://localhost:5000/cart/68676a8379d932b2074b06be



if my screenshots are not available in this pdf this is link of my github
<!-- https://github.com/RizwanAhmed001/ShoppyGlobe-E-commerce-Backend-API/blob/main/Project%20Screenshot.pdf -->

<!-- Github link for complete project -->
<!-- https://github.com/RizwanAhmed001/ShoppyGlobe-E-commerce-Backend-API -->


