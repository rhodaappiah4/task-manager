/* Main application file that sets up the Express server, middleware, and routes */

// Import the Express framework to create the server application
import express from 'express';
// Import and use CORS middleware to handle Cross-Origin Resource Sharing
import cors from 'cors';    
// Import task-related routes to handle API endpoints for tasks
import taskRoutes from './routes/tasks.js';
// Import custom error handling middleware
import { errorHandler } from './middleware/errorHandler.js';

// Create a new Express application instance
const app = express();

// Middleware to parse JSON request bodies and enable CORS
app.use(express.json());
app.use(cors());

// Mount the task routes for any requests on the prefix /api/tasks
app.use('/api/tasks', taskRoutes); 

// Basic route to verify that the server is running
app.get('/', (req, res) => {
  res.send('Hello, World! My Task Manager API is running');
});

// Use the custom error handling middleware for handling errors in the application
app.use(errorHandler);

// Export the Express application instance for use in other modules (like starting the server)
export default app;