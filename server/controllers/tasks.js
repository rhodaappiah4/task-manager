// Import the TaskModel to interact with the tasks data in the database
import { TaskModel } from "../models/tasks.js";
// Import validation function to validate task data
import { validateTask } from "../utils/validate.js";
// Import AppError class for customized error handling
import { AppError } from "../utils/appError.js";

// Controller functions to handle task operations (CRUD) for tasks
export const TaskController = {  
    // Get all tasks and send the retrieved tasks as a JSON response to the client if successful       
    async getTasks(req, res, next) {
        const user_id = 1; // Get the user ID from the authenticated request
        try {
            const result = await TaskModel.getAll(user_id);
            res.status(200).json(result.rows);
        } catch (error) {
            next(error);
        }
    },
    // Get a specific task by ID and send it as a JSON response to the client if found
    async getTaskById(req, res, next) {
        const { id } = req.params;
        const user_id = 1; // Get the user ID from the authenticated request
        try {
            const result = await TaskModel.getById(id, user_id);
            if (result.rows.length === 0) {
                return next(new AppError('Task not found or unauthorized', 404));
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            next(error);
        }
    },
    // Create a new task with the provided data and send the created task as a JSON response to the client if successful
    async createTask(req, res, next) {
        const task = req.body;
        const user_id = 1; // Get the user ID from the authenticated request
        const { error, value } = validateTask(task);
        if (error) {
            return next(new AppError(error.details[0].message, 400));
        }   
        try {
            const result = await TaskModel.create(value, user_id);
            res.status(201).json(result.rows[0]);
        } catch (error) {
            next(error);
        }
    },
    // Update an existing task by ID with the provided data and send the updated task as a JSON response to the client if successful
    async updateTask(req, res, next) {
        const { id } = req.params;
        const task = req.body;
        const user_id = 1; // Get the user ID from the authenticated request
        const { error, value } = validateTask(task);
        if (error) {
            return next(new AppError(error.details[0].message, 400));
        }       
        try {
            const result = await TaskModel.update(id, value, user_id);
            if (result.rows.length === 0) {
                return next(new AppError('Task not found or unauthorized', 404));
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            next(error);
        }
    },
    // Delete a task by ID and send a 204 No Content response to the client if successful
    async deleteTask(req, res, next) {
        const { id } = req.params; 
        const user_id = 1; // Get the user ID from the authenticated request 
        try {
            const result = await TaskModel.delete(id, user_id); 
            if (result.rowCount === 0) {
                return next(new AppError('Task not found or unauthorized', 404));
            }
            res.status(204).send(); 
        } catch (error) {
            next(error);
        }
    },
    // Search for tasks based on a query string and send the matching tasks as a JSON response to the client if successful
    async searchTasks(req, res, next) {
        const { query } = req.query;
        const user_id = 1; // Get the user ID from the authenticated request
        try {
            const result = await TaskModel.search(query, user_id);
            res.status(200).json(result.rows);
        } catch (error) {
            next(error);
        }
    }
};     