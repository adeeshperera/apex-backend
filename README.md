# Apex Backend API

A robust and scalable Node.js backend API for the Apex Auto Mods Garage platform. This API manages user authentication, car customization builds, and service catalogs for an automotive customization application.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Database Models](#database-models)
- [Middleware](#middleware)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

Apex Backend is a REST API service built with Express.js and MongoDB. It provides comprehensive endpoints for:

- User authentication and account management
- Management of car customization builds
- Service catalog and pricing information
- JWT-based authorization

The API is designed to be deployed on platforms like Railway and Vercel, with support for both traditional Node.js servers and serverless functions.

## Features

- JWT-based authentication with secure password hashing using bcryptjs
- User registration and login with token generation
- User profile management
- Create, read, update, and delete car customization builds
- Service catalog with categories and pricing
- Input validation middleware for request data
- CORS protection with configurable allowed origins
- Helmet.js for security headers
- MongoDB database integration with Mongoose
- Database connection retry logic
- Service seeding on application startup
- Health check endpoints for deployment monitoring

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.19.2
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.2
- **Security**: Helmet.js 8.1.0, CORS
- **Environment Management**: dotenv 17.2.3
- **Development**: Nodemon 3.1.10

## Project Structure

```
apex-backend/
├── api/
│   └── index.js                 # API entry point for serverless
├── config/
│   ├── database.js              # MongoDB connection configuration
│   └── jwt.js                   # JWT token generation and verification
├── controllers/
│   ├── authController.js        # Authentication business logic
│   ├── buildController.js       # Build management logic
│   └── serviceController.js     # Service catalog logic
├── middleware/
│   ├── auth.js                  # JWT verification middleware
│   └── validation.js            # Request input validation middleware
├── models/
│   ├── User.js                  # User schema definition
│   ├── Build.js                 # Car build schema definition
│   └── Service.js               # Service schema definition
├── routes/
│   ├── auth.js                  # Authentication routes
│   ├── builds.js                # Build management routes
│   └── services.js              # Service catalog routes
├── utils/
│   └── seedServices.js          # Database seeding utility
├── server.js                    # Main application entry point
├── package.json                 # Project dependencies and scripts
├── vercel.json                  # Vercel deployment configuration
├── railway.json                 # Railway deployment configuration
├── Procfile                     # Process file for deployment
└── README.md                    # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud-based like MongoDB Atlas)
- Git for version control

## Installation

1. Clone the repository:
```bash
git clone https://github.com/adeeshperera/apex-backend.git
cd apex-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (see [Configuration](#configuration) section)

## Configuration

Create a `.env` file in the root directory with the following variables:

```
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=3001
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://apex-client-side.vercel.app
```

### Configuration Details

- **MONGODB_URI**: Connection string to your MongoDB database
- **JWT_SECRET**: Secret key for signing JWT tokens (use a strong, random string)
- **JWT_EXPIRE**: Token expiration time (e.g., '7d', '24h')
- **PORT**: Server port (default: 3001)
- **NODE_ENV**: Environment type ('development' or 'production')
- **ALLOWED_ORIGINS**: Comma-separated list of allowed CORS origins

## Running the Application

### Development Mode

Start the server with automatic reload on file changes:

```bash
npm run dev
```

### Production Mode

Start the server:

```bash
npm start
```

### Testing

Run tests (currently not configured):

```bash
npm test
```

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (201):
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

#### Get User Profile
```
GET /api/auth/profile
Authorization: Bearer <token>

Response (200):
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Build Endpoints

#### Get All Builds for User
```
GET /api/builds/user/:userId
Authorization: Bearer <token>

Response (200):
[
  {
    "_id": "build_id",
    "userId": "user_id",
    "carModel": "BMW M3",
    "color": "Midnight Black",
    "selectedParts": [
      {
        "partId": "part1",
        "partName": "Carbon Fiber Hood",
        "price": 299.99
      }
    ],
    "totalPrice": 299.99,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Create New Build
```
POST /api/builds
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "carModel": "BMW M3",
  "color": "Midnight Black",
  "selectedParts": [],
  "totalPrice": 0
}

Response (201):
{
  "_id": "build_id",
  "userId": "user_id",
  "carModel": "BMW M3",
  "color": "Midnight Black",
  "selectedParts": [],
  "totalPrice": 0,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Get Build by ID
```
GET /api/builds/:id
Authorization: Bearer <token>

Response (200):
{
  "_id": "build_id",
  "userId": "user_id",
  "carModel": "BMW M3",
  "color": "Midnight Black",
  "selectedParts": [],
  "totalPrice": 0,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update Build
```
PUT /api/builds/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "carModel": "BMW M4",
  "color": "Alpine White",
  "selectedParts": [
    {
      "partId": "part1",
      "partName": "M Performance Exhaust",
      "price": 599.99
    }
  ],
  "totalPrice": 599.99
}

Response (200):
{
  "_id": "build_id",
  "userId": "user_id",
  "carModel": "BMW M4",
  "color": "Alpine White",
  "selectedParts": [...],
  "totalPrice": 599.99,
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Delete Build
```
DELETE /api/builds/:id
Authorization: Bearer <token>

Response (200):
{
  "message": "Build deleted successfully"
}
```

### Service Endpoints

#### Get All Services
```
GET /api/services

Response (200):
[
  {
    "_id": "service_id",
    "name": "Carbon Fiber Hood",
    "description": "High-quality carbon fiber hood for enhanced aerodynamics",
    "price": 299.99,
    "category": "Exterior",
    "icon": "hood_icon.png",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Service by ID
```
GET /api/services/:id

Response (200):
{
  "_id": "service_id",
  "name": "Carbon Fiber Hood",
  "description": "High-quality carbon fiber hood for enhanced aerodynamics",
  "price": 299.99,
  "category": "Exterior",
  "icon": "hood_icon.png",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Health Check Endpoints

#### Health Check (Root)
```
GET /health

Response (200):
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Health Check (API)
```
GET /api/health

Response (200):
{
  "status": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### API Info
```
GET /api

Response (200):
{
  "message": "Apex API Server",
  "status": "running",
  "version": "1.0.0"
}
```

## Environment Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `MONGODB_URI` | String | Required | MongoDB connection string |
| `JWT_SECRET` | String | Required | Secret key for JWT signing |
| `JWT_EXPIRE` | String | '7d' | Token expiration time |
| `PORT` | Number | 3001 | Server port |
| `NODE_ENV` | String | 'development' | Environment type |

## Database Models

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  passwordHash: String (required),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**Methods:**
- `matchPassword(enteredPassword)`: Compare entered password with stored hash

### Build Model

```javascript
{
  userId: ObjectId (ref: User, required),
  carModel: String (required),
  color: String (required),
  selectedParts: [
    {
      partId: String,
      partName: String,
      price: Number
    }
  ],
  totalPrice: Number (default: 0),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Service Model

```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (required),
  icon: String,
  createdAt: Date (default: now)
}
```

## Middleware

### Authentication Middleware (`auth.js`)

- Verifies JWT tokens from request headers
- Attaches user information to request object
- Returns 401 for invalid or missing tokens

### Validation Middleware (`validation.js`)

- Validates required fields in request body
- Checks for missing or empty fields
- Returns 400 for validation errors

## Authentication

The API uses JSON Web Tokens (JWT) for authentication:

1. **Token Generation**: Upon successful login/registration, a JWT is generated
2. **Token Storage**: Clients should store the token and include it in the Authorization header
3. **Token Verification**: Protected endpoints verify the token validity
4. **Token Expiration**: Tokens expire based on the `JWT_EXPIRE` environment variable

### Authentication Flow

```
User Registration/Login
         |
         v
Generate JWT Token
         |
         v
Client stores token
         |
         v
Include token in Authorization header: "Bearer <token>"
         |
         v
Server verifies token
         |
         v
Grant access to protected resources
```

## Error Handling

The API implements standard HTTP status codes and error responses:

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (invalid/missing token)
- **404**: Not Found
- **500**: Server Error

Error Response Format:
```json
{
  "message": "Error description",
  "error": "Error details"
}
```

