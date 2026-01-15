# Register and Login Implementation Guide

This document outlines the steps taken to implement the User Authentication system (Register/Login) in the PromptPrint project.

## 1. Backend Setup

### Dependencies

We installed the following packages on the server:

- `bcryptjs`: For hashing passwords securely.
- `jsonwebtoken`: For creating JWT tokens for authentication.

### Database Model (`server/models/User.js`)

Created a schema to store user information:

- `username`: Unique identifier.
- `email`: Unique email address.
- `password`: Hashed password.
- `role`: User role (default: "user").

### API Routes (`server/server.js`)

Added two main endpoints:

1.  **POST `/api/register`**

    - Receives: `username`, `email`, `password`
    - Logic:
      - Checks if email already exists.
      - Hashes the password using `bcrypt`.
      - Creates a new User in MongoDB.

2.  **POST `/api/login`**
    - Receives: `email` (can be username or email), `password`
    - Logic:
      - Finds user by Email OR Username.
      - Compares hashed password.
      - Generates a JWT Token containing `userId` and `role`.
      - Returns user info and token.

## 2. Frontend Implementation

### Register Page (`client/src/views/Register.jsx`)

- Converted static HTML form to a React Component with State.
- Added `handleRegister` function:
  - Validates passwords match.
  - Sends POST request to `/api/register`.
  - Redirects to Login page on success.

### Login Page (`client/src/views/Login.jsx`)

- Updated form to accept "Email/Username".
- Added `handleLogin` function:
  - Sends POST request to `/api/login`.
  - **Storage**: Saves `token`, `userId`, `username`, `role` to `localStorage`.
  - Redirects to Home page and reloads to update UI.

### Navbar Integration (`client/src/components/Navbar.jsx`)

- Added logic to check for logged-in user (`localStorage.getItem('username')`).
- **Condition**:
  - If logged in: Shows "Hi, [User]" and a **Logout** button.
  - If logged out: Shows **Sign In** button.
- **Logout Logic**: Clears `localStorage` and redirects to Home.

---

## How to Test

1.  Go to `/signup`.
2.  create a new account.
3.  Go to `/login`.
4.  Log in with your new credentials (username or email).
5.  Check the Navbar; it should change to show your name.
