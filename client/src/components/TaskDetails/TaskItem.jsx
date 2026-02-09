import { useState } from "react";
import { updateTask, deleteTask } from "../../api/tasks";
import "./TaskItem.css";
import { FiEdit, FiTrash } from "react-icons/fi";

// Component to display and manage a single task item
function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [editedStatus, setEditedStatus] = useState(task.status);

    // Handle saving the edited task
    const handleSave = async () => {
        const updates = {
            title: editedTitle,
            description: editedDescription,
            status: editedStatus,
        };
        try {
            const updatedTask = await updateTask(task.id, updates);
            onTaskUpdated(updatedTask);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Handle deleting the task
    const handleDelete = async () => {
        try {
            await deleteTask(task.id);
            onTaskDeleted(task.id);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Render the task item
    return (
        <div className="task-item">
            {isEditing ? (
                <div className="edit-form">
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <div className="edit-buttons">
                      <button className="save" onClick={handleSave}>Save</button>
                      <button className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="task-actions">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <button onClick={() => setIsEditing(true)}><FiEdit /></button>
                    <button onClick={handleDelete}><FiTrash /></button>
                </div>
            )}
        </div>
    );
}

// Export the TaskItem component as the default export
export default TaskItem;