/* Runtime database configuration that application loads and uses while running. 
Creates a connection pool to PostgreSQL. 
Connects Node.js to the PostgreSQL database */

// Import the pg module/package to interact with PostgreSQL
import pkg from 'pg';
// Import and configure dotenv to read/manage environment variables
import dotenv from 'dotenv';
// Load environment variables from .env file into process.env
dotenv.config();

// Destructure Pool class from pg package
// Create a new Pool instance to manage PostgreSQL connections 
const { Pool } = pkg;

// Create and export a new Pool instance using the connection string from environment variables
// This allows other parts of the application to import and use this pool for database operations
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Export the pool instance for use in other modules
export default pool;
