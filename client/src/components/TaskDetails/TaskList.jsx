import TaskItem from "./TaskItem";
import "./TaskList.css";

// Component to render a list of tasks
function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
    if (tasks.length === 0) {
        return <p className="empty">No tasks available. Add a new task to get started.</p>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                />
            ))}
        </div>
    );
}

// Export the TaskList component as the default export
export default TaskList;