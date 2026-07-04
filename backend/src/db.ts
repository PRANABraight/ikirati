import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Refuse to run in production with missing DB credentials; the localhost/root
// fallbacks below are for local development only.
if (process.env.NODE_ENV === 'production' && (!process.env.DB_USER || !process.env.DB_PASSWORD)) {
    console.error('FATAL: DB_USER and DB_PASSWORD must be set in production.');
    process.exit(1);
}

// Create connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ikirati',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
export async function testConnection(): Promise<boolean> {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ MySQL connection failed:', error);
        return false;
    }
}

// Initialize database tables
export async function initDatabase(): Promise<void> {
    try {
        // Create users table
        await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Create stories table
        await pool.execute(`
      CREATE TABLE IF NOT EXISTS stories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        image VARCHAR(500),
        author VARCHAR(100),
        link VARCHAR(500),
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        console.log('✅ Database tables initialized');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
}

export default pool;
