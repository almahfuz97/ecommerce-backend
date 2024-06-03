# My Express.js and MongoDB Application

This is a simple Express.js application connected to a MongoDB database, built with TypeScript. The application includes product management functionality with the ability to search products.

## Features

- CRUD operations for products
- Order creating operations
- Order getting for User email
- Inventory Updatation with order
- Search products by name or description
- Input validation using Zod

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (you can use a local instance or a cloud service like MongoDB Atlas)

### Steps

1. **Clone the repository:**

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your environment variables:

   ```env
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/your-database-name
   ```

## Running the Application

### Development

To run the application in development mode:

```bash
npm run start:dev
```
