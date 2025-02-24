# Sawari Backend

## Description

Sawari is a bike marketplace designed to provide a seamless buying experience for motorcycle enthusiasts. Users can explore a wide range of bikes, view detailed specifications, and filter options based on their preferences to find the perfect match. The platform ensures a smooth and secure purchasing process with integrated ShurjoPay payment gateway, allowing hassle-free transactions.

With a user-friendly dashboard, customers can track their orders, manage their accounts, and update passwords as needed. The platform also empowers administrators with advanced management tools, enabling them to add, update, or remove bikes, oversee payment transactions, and handle user accounts. Admins have the authority to block or unblock users, ensuring a safe and well-regulated marketplace.

Sawari combines convenience, security, and efficiency to deliver a premium online bike shopping experience. 🚀🏍️ 

Live Site : https://shahed-sawari.netlify.app





## Features

1. **CRUD Operations:** Create, Read, Update, and Delete functionality for managing products and orders.
2. **Inventory Management:** Automatically updates product quantity when an order is placed.
3. **Zod Validation:** Ensures secure and validated API requests.
4. **TypeScript Integration:** Provides type safety for scalability and maintainability.
5. **Mongoose Models:** Two models for structured database management:
   - **Product Model:** Manages bike-related data.
   - **Order Model:** Handles order placement and updates revenue and product inventory.





## Technologies Used

1. **Node.js:** Backend runtime environment for handling asynchronous operations.
2. **Express:** Framework for building RESTful APIs.
3. **MongoDB:** NoSQL database for storing product and order data.
4. **Mongoose:** ODM library for schema-based data modeling.
5. **TypeScript:** Type-safe JavaScript for better development experience.
6. **Zod:** Schema declaration and validation library for validating API requests.

## Getting Started

**Prerequisites**

Make sure you have the following installed:

1. **Node.js** (v14 or later).
2. **MongoDB** (local or cloud instance).
3. **npm or yarn**
   

## Installation

1. Clone the repository

> git clone https://github.com/Sha-hed/Sawari-Backend.git

2. Navigate to the project directory:

> cd bike-store

3. Install dependencies:

> npm install

**Environment Variables :**

Create a .env file in the root directory with the following values:
> PORT=5000

> MONGO_URI=mongodb://localhost:27017/bike-store

**Run the Application :**

1. Start the development server:
> npm run start:dev

2. Build the application for production: 
> npm run start:dev


## API Endpoints 

**Base URL :  **
>  https://shahed-sawari.netlify.app


## Contact

For any inquiries or suggestions, feel free to reach out:

  - **Name:**    Kazi Mohammad Shahed
  - **Email:**   shahedcse14@gmail.com
  - **GitHub:**  Sha-Hed
