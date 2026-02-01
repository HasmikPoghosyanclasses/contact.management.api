# Contacts Management API

A RESTful API for managing contacts with user authentication built with Node.js, Express, and MongoDB.

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Contacts-Management-API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/contacts-app
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   ```

4. **Start MongoDB** (if using local installation):
   ```bash
   brew services start mongodb-community  # macOS
   # or start MongoDB service on your system
   ```

5. **Run the server:**
   ```bash
   npm run dev  # Development mode with auto-reload
   # or
   npm start    # Production mode
   ```

The server will be running on `http://localhost:3000`

## Features

- User registration and authentication (JWT-based)
- Create, read, update, and delete contacts
- User-specific contact isolation (users can only access their own contacts)
- Secure password hashing with bcrypt
- MongoDB database integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Detailed Installation

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Contacts-Management-API
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory with the following content:

**For local MongoDB:**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/contacts-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**For MongoDB Atlas:**
```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/contacts-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Important:** 
- Replace `your_super_secret_jwt_key_change_this_in_production` with a secure random string
- For MongoDB Atlas, replace the connection string with your actual cluster URL
- The `.env` file is already in `.gitignore` and will not be committed

### Step 4: Start MongoDB

**Local MongoDB (macOS with Homebrew):**
```bash
brew services start mongodb-community
```

**Local MongoDB (Linux):**
```bash
sudo systemctl start mongod
```

**MongoDB Atlas:**
- No local installation needed
- Use the connection string from your Atlas cluster

### Step 5: Verify Setup

Check that MongoDB is running:
```bash
# macOS
brew services list | grep mongodb

# Or test connection
mongosh mongodb://localhost:27017
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication

#### Register a new user
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token"
  }
  ```

#### Get current user
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

### Contacts

All contact endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Get all contacts
- **GET** `/api/contacts`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  [
    {
      "_id": "contact_id",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "123-456-7890",
      "user": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
  ```

#### Create a new contact
- **POST** `/api/contacts`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "123-456-7890"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "contact_id",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "123-456-7890",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

#### Get a single contact
- **GET** `/api/contacts/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "_id": "contact_id",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "123-456-7890",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

#### Update a contact
- **PUT** `/api/contacts/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "987-654-3210"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "contact_id",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "987-654-3210",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

#### Delete a contact
- **DELETE** `/api/contacts/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Contact removed",
    "id": "contact_id"
  }
  ```

## Project Structure

```
Contacts-Management-API/
├── controllers/
│   ├── authController.js
│   └── contactController.js
├── models/
│   ├── User.js
│   └── Contact.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── contactRoutes.js
├── .env.example
├── server.js
├── package.json
└── README.md
```

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for secure authentication
- User isolation - users can only access their own contacts
- Input validation and error handling

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcryptjs for password hashing
- CORS for cross-origin requests

## License

ISC
