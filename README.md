# College Booking System - Backend

This is the backend server for the **College Booking System** web application. It is built using **Node.js**, **Express.js**, and **MongoDB**, and supports JWT-based authentication with cookies. The system allows users to register, login, view colleges, apply for admissions, add reviews, and manage their profile.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [License](#license)

---

## Features

- User registration and login (Email, Google, or social login)
- JWT-based authentication using cookies
- View all colleges and search colleges by name
- Apply for college admission
- Update or delete college applications
- Add and view reviews for colleges
- User profile management (view and edit)
- Protected routes for authenticated users
- Fully compatible with frontend hosted on Vite/React or Firebase

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- CORS
- Cookie Parser
- dotenv (for environment variables)

---

## Installation

### Server Side Setup

1. Clone the server-side repository:

   ```bash
   git clone https://github.com/shorifulbd1st/college-booking-server
   cd college-booking-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node index.js
   ```

   --- OR ---

   ```bash
   nodemon index.js
   ```

4. Open the project in a code editor:
   ```bash
   code .
   ```
5. Add the `.env` file in the root directory and include the following environment variables:
   ```bash
   DB_USER=..........................................
   DB_PASS=..........................................
   ACCESS_TOKEN_SECRET=..........................................
   ```

### API Endpoints

- Authentication

- POST /jwt - Generate JWT token and set cookie
  -GET /logout - Clear JWT cookie

## Users

- POST /users - Register new user

- GET /users - Get all users

## Colleges

- GET /colleges - Get all colleges

- GET /college/:id - Get details of a single college

- GET /colleges-search?search=collegeName - Search colleges by name

## - College Applications

- POST /college-registration - Apply to a college

- GET /colleges/:email - Get applied colleges for a user

- PUT /college-registration-update/:id - Update a college application

- DELETE /delete-apply-college/:id - Delete a college application

# Reviews

- POST /review - Add a review

- GET /reviews - Get all reviews

## User Profile

- GET /profile/:email - Get user profile and applied colleges

## 🧑‍💻 Authors

- Shoriful Islam (Lead Developer)
- Lead Developer & Maintainer
- Connect with me on [_GitHub_](https://github.com/shorifulbd1st)
