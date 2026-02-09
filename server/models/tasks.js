// Import the Postgres database connection pool in order to perform queries
import pool from '../config/db.js';

export const TaskModel = {
  getAll(user_id) {
    return pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
  },
  getById(id, user_id) {
    return pool.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, user_id]);
  },
  create(task, user_id) {
    const { title, description, status } = task;
    return pool.query(
      'INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, status, user_id]
    );
  },
  update(id, task, user_id) {
    const { title, description, status } = task;
    return pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 AND user_id = $5 RETURNING *',
      [title, description, status, id, user_id]
    );
  },
  delete(id, user_id) {
    return pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, user_id]);
  },
  search(query, user_id) {
    return pool.query(
      'SELECT * FROM tasks WHERE (title ILIKE $1 OR description ILIKE $1) AND user_id = $2 ORDER BY created_at DESC',
      [`%${query}%`, user_id]
    );
  }
};