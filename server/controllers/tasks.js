// Import the TaskModel to interact with the tasks data in the database
import { TaskModel } from "../models/tasks.js";

// Controller functions to handle task operations (CRUD) for tasks
export const TaskController = {  
    // Get all tasks and send the retrieved tasks as a JSON response to the client if successful       
    async getTasks(req, res) {
        try {
            const result = await TaskModel.getAll();
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ error: 'Failed to retrieve tasks' });
        }
    },
    // Get a specific task by ID and send it as a JSON response to the client if found
    async getTaskById(req, res) {
        const { id } = req.params;
        try {
            const result = await TaskModel.getById(id);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error fetching task by ID:', error);
            res.status(500).json({ error: 'Failed to retrieve task' });
        }
    },
    // Create a new task with the provided data and send the created task as a JSON response to the client if successful
    async createTask(req, res) {
        const task = req.body;
        try {
            const result = await TaskModel.create(task);
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ error: 'Failed to create task' });
        }
    },
    // Update an existing task by ID with the provided data and send the updated task as a JSON response to the client if successful
    async updateTask(req, res) {
        const { id } = req.params;
        const task = req.body;
        try {
            const result = await TaskModel.update(id, task);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ error: 'Failed to update task' });
        }
    },
    // Delete a task by ID and send a 204 No Content response to the client if successful
    async deleteTask(req, res) {
        const { id } = req.params;  
        try {
            const result = await TaskModel.delete(id); 
            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(204).send(); 
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ error: 'Failed to delete task' });
        }
    }
};     