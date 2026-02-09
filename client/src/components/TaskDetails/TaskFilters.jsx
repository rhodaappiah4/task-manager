import './TaskFilters.css';

// Component for filtering tasks based on their status
function TaskFilters({ filter, setFilter, searchQuery, setSearchQuery }) {
    return (
        <div className="task-filters">
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label>
                Filter Tasks:
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
        </div>
    );
}

export default TaskFilters;