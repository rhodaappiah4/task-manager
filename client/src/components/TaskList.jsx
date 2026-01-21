// Component to display a list of tasks
function TaskList({tasks}) {
    if (!tasks || tasks.length === 0) { 
        return <p>No tasks available.</p>;
    }

    return (
        <ul>
            <h2>List of Tasks</h2>
            {tasks.map((task) => (
                <li key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                </li>
            ))}
        </ul>
    );
}

// Export the TaskList component as the default export
export default TaskList;