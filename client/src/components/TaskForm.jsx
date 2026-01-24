// Import useState hook from React for managing component state
import { useState } from "react";
// Import the createTask function from the API module to handle task creation
import { createTask } from "../api/tasks";
// Import CSS for styling the TaskForm component
import "./TaskForm.css";

// Component for the task creation form
function TaskForm({ onTaskCreated }) {
    // State variables for form inputs
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); 
    const [status, setStatus] = useState("pending");

    // Handle form submission
    const handleSubmit = async (e) => {
        // Prevent default form submission behavior
        e.preventDefault();
        // Create a new task object
        const newTask = { title, description, status };
        try {
            // Call API to create the task
            const createdTask = await createTask(newTask);
            // Notify parent component of the new task
            onTaskCreated(createdTask);
            // Reset form fields
            setTitle("");
            setDescription("");
            setStatus("pending");
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    // Render the task creation form
    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <button type="submit" disabled={title.trim() === ""}>Create Task</button>
        </form>
    );
}

// Export the TaskForm component
export default TaskForm;