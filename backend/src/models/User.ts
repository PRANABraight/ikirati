import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export interface UserType {
  id: number;
  email: string;
  password: string;
}

export class User {
  static async findByEmail(email: string): Promise<UserType | null> {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0] || null;
  }

  static async create({ email, password }: { email: string; password: string }): Promise<UserType> {
    const res = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, password',
      [email, password]
    );
    return res.rows[0];
  }
} 