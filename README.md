# FatikSheba - Healthcare Platform (Server Side)

## Project Overview

This is the backend server for the FatikSheba healthcare platform. It provides API endpoints for the client application to interact with the database, handle authentication, and manage healthcare services data.

## Technology Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Cors** - Cross-origin resource sharing middleware
- **Dotenv** - Environment variable management
- **Express-fileupload** - File upload middleware
- **Multer** - File upload handling

## API Endpoints

The server provides the following API endpoints:

- **Authentication**
  - User registration and login
  - Role-based authentication (Admin/Physician/Patient)
  - JWT token generation and validation

- **User Management**
  - Get user profile
  - Update user profile
  - Change user role (Admin only)
  - Verify physician accounts (Admin only)

- **Doctors**
  - Get all doctors
  - Get doctor by ID
  - Add new doctor
  - Update doctor information
  - Delete doctor
  - Filter doctors by specialization
  - Get doctor availability



- **Services**
  - Get all services
  - Get service by ID
  - Add new service (Admin only)
  - Update service (Admin only)
  - Delete service (Admin only)

- **Medical Records**
  - Create medical record (Physician only)
  - Get patient medical history (Physician and respective Patient)
  - Update medical record (Physician only)

- **Blog Posts**
  - Create blog post (Admin and Physician)
  - Get all blog posts
  - Get blog post by ID
  - Update blog post (owner only)
  - Delete blog post (owner and Admin)

- **Messaging**
  - Send message
  - Get conversation history
  - Mark message as read

## Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/FatikSheba.git
   cd FatikSheba/doctor-server-side
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=fatiksheba
   JWT_SECRET=your_jwt_secret
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in production mode.

### `npm run start-dev`

Runs the server in development mode with nodemon for automatic restarts on file changes.

## Database Schema

### Users
- _id: ObjectId
- name: String
- email: String
- password: String (hashed)
- role: String (patient/doctor/admin)
- createdAt: Date

### Doctors
- _id: ObjectId
- name: String
- email: String
- specialization: String
- experience: Number
- fees: Number
- availability: Array
- image: String (file path)



## Deployment

This server can be deployed to various platforms:

1. **Heroku**
   ```
   heroku create
   git push heroku main
   ```

2. **Render**
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.