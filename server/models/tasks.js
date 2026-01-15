// Import the Postgres database connection pool in order to perform queries
import pool from '../config/db.js';

export const TaskModel = {
  getAll() {
    return pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
  },
  getById(id) {
    return pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  },
    create(task) {
    const { title, description, status } = task;
    return pool.query(
      'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
      [title, description, status]
    );
  },
  update(id, task) {
    const { title, description, status } = task;
    return pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [title, description, status, id]
    );
  },
  delete(id) {
    return pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  }
};