const API_URL = 'http://localhost:5001/api/tasks';

export async function getTasks() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to load tasks');
    }
    return await response.json();
}

export async function createTask(task) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to create task');
    }
    return await response.json();
}

export async function updateTask(taskId, updates) {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        throw new Error('Failed to update task');
    }
    return await response.json();
}

export async function deleteTask(taskId) {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
    return true;
}   