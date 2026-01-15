// Import Express to create a router for task-related routes
import express from 'express';
// Import controller functions to handle task operations (ie. these CRUD functions handle the logic for each endpoint)
import { TaskController } from '../controllers/tasks.js';
// Destructure the controller functions for easier access
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = TaskController;

// Create a new router instance (mini Express app to handle routes)
const router = express.Router();

// Route to get all tasks
router.get('/', getTasks);

// Route to get a specific task by ID
router.get('/:id', getTaskById);

// Route to create a new task
router.post('/', createTask);

// Route to update an existing task by ID
router.put('/:id', updateTask);

// Route to delete a task by ID
router.delete('/:id', deleteTask);

// Export the router to be used in the main application
export default router;