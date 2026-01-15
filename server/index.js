/* Entry point of the server application. 
This is the file that runs with Node.js to start the server.
Boots the Express server */

// Import the Express application instance from app.js
import app from './app.js';
// Import and configure dotenv to read/manage environment variables
import dotenv from 'dotenv';

// Load environment variables from .env file into process.env
dotenv.config();

// Define the port the server will listen on
// Use the PORT from environment variables or default to 5001
const PORT = process.env.PORT || 5001;

// Start the server and have it listen on the defined port
// The callback logs a message indicating the server is running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});