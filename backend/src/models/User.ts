import pool from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface UserType {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'user';
  created_at?: Date;
}

interface UserRow extends RowDataPacket, UserType { }

export class User {
  static async findByEmail(email: string): Promise<UserType | null> {
    const [rows] = await pool.execute<UserRow[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  static async findById(id: number): Promise<UserType | null> {
    const [rows] = await pool.execute<UserRow[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  static async create({ email, password, role = 'user' }: {
    email: string;
    password: string;
    role?: 'admin' | 'user';
  }): Promise<UserType> {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email, password, role]
    );

    return {
      id: result.insertId,
      email,
      password,
      role
    };
  }

  static async updateRole(id: number, role: 'admin' | 'user'): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE users SET role = ? WHERE id = ?',
      [role, id]
    );
    return result.affectedRows > 0;
  }
}