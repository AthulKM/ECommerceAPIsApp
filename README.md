# E-Commerce API App (For MERN Stack Application)

## Overview
The E-Commerce API App is a robust API designed for a full-fledged E-Commerce platform, built using the MERN stack (MongoDB, Express, React, Node.js). This API provides essential functionalities for user management, product management, and order processing. It integrates with MongoDB for data storage and utilizes JWT for secure user authentication.

## Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
3. [API Endpoints](#api-endpoints)
   - [User Routes](#user-routes)
   - [Product Routes](#product-routes)
   - [Order Routes](#order-routes)
4. [Error Handling](#error-handling)
5. [Testing](#testing)
6. [Contributing](#contributing)
7. [License](#license)

## Features
- **User Management:** Registration, login, and profile retrieval.
- **Product Management:** CRUD operations for products, including image upload.
- **Order Management:** Create orders, update order status, and fetch user orders.
- **Authentication & Authorization:** JWT-based authentication with role-based access control.
- **File Uploads:** Handling of image uploads for products.

## Getting Started
To get the E-Commerce API App up and running on your local machine, follow these instructions.

### Prerequisites
- **Node.js:** Ensure Node.js is installed on your machine. You can download it from [Node.js official site](https://nodejs.org/).
- **MongoDB:** A running instance of MongoDB. You can use MongoDB Atlas for a cloud-based solution or install MongoDB locally.

### Installation
1. **Clone the Repository:**
   
   git clone https://github.com/AthulKM/ECommerceAPIsApp.git
   cd ECommerceAPIsApp

2. **Install Dependencies:**

   npm install <dependency name>

3. **Setup Environment Variables:**

   Create a .env file in the root directory and add the following variables:

   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   PORT=3001

   Replace your_mongodb_connection_string with your MongoDB connection string and your_jwt_secret_key with a secret key for JWT.

4. **Run the Application:**

   npm start
    
   The server will start on http://localhost:3001 (or the port specified in .env).

## API Endpoints 
 
### User Routes

- **POST /api/userRegistration:** Register a new user.

- **POST /api/userLogin** Login a user and receive a JWT.

- **GET /api/profile** Get the details of the authenticated user.

### Product Routes

- **POST /api/addProduct:** Create a new product (admin only).
- **GET /api/allProducts:** Get a list of all products.
- **GET /api/getOneProduct/:id:** Get a single product by ID.
- **PUT /api/updateProduct/:id:** Update a product by ID (admin only).
- **DELETE /api/deleteProduct/:id:** Delete a product by ID (admin only).

### Order Routes

- **POST /api/createOrder:** Create a new order.
- **GET /api/userOrders:** Get all orders for the authenticated user.
- **PUT /api/updateOrderStatus/:id:** Update the status of an order (admin only).

## Error Handling

The application includes a global error handler to catch and respond to errors:

Custom Errors: Handled via ErrorResponse class.
MongoDB Errors: Includes handling for validation errors and duplicate keys.
JWT Errors: Handles issues related to authentication tokens.

## Testing

To test the application:

### Run Tests:

Install the testing dependencies if not already installed:

npm install --save-dev mocha chai

- **Run the test suite:**

npm test

Ensure your MongoDB instance is running, and adjust configurations if necessary.

### Using Postman:

- **Install Postman:**

Download and install Postman from Postman official site.

- **Import Postman Collection:**

If available, import a Postman collection for the API into Postman. This collection will contain pre-configured requests for various API endpoints.

- **Test Endpoints:**

Use Postman to send requests to the API endpoints and verify that the responses are as expected. You can test all the endpoints listed under the API Endpoints section.

## Contributing

Contributions are welcome! 

### To contribute:

- **Fork the repository.**
- **Create a new branch:**

git checkout -b feature-branch

- **Commit your changes:**

git commit -am 'Add new feature'
- **Push to the branch:**

git push origin feature-branch

- **Create a new Pull Request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### MIT License Summary

The MIT License is a permissive free software license that allows for the following:

- **Permission**: Free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
- **Conditions**: Include the original copyright notice and permission notice in all copies or substantial portions of the Software.
- **Limitation**: The software is provided "as is", without warranty of any kind. The authors are not liable for any damages arising from the use of the software.

For a full copy of the MIT License, refer to the [Open Source Initiative MIT License](https://opensource.org/licenses/MIT).
