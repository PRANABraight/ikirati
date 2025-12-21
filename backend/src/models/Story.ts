import pool from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface StoryType {
    id: number;
    title: string;
    text: string;
    image?: string;
    author?: string;
    link?: string;
    user_id: number;
    created_at?: Date;
    updated_at?: Date;
}

interface StoryRow extends RowDataPacket, StoryType { }

export class Story {
    static async findAll(): Promise<StoryType[]> {
        const [rows] = await pool.execute<StoryRow[]>(
            'SELECT * FROM stories ORDER BY created_at DESC'
        );
        return rows;
    }

    static async findById(id: number): Promise<StoryType | null> {
        const [rows] = await pool.execute<StoryRow[]>(
            'SELECT * FROM stories WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }

    static async findByUserId(userId: number): Promise<StoryType[]> {
        const [rows] = await pool.execute<StoryRow[]>(
            'SELECT * FROM stories WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        return rows;
    }

    static async create(data: {
        title: string;
        text: string;
        image?: string;
        author?: string;
        link?: string;
        user_id: number;
    }): Promise<StoryType> {
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO stories (title, text, image, author, link, user_id) VALUES (?, ?, ?, ?, ?, ?)',
            [data.title, data.text, data.image || null, data.author || null, data.link || null, data.user_id]
        );

        return {
            id: result.insertId,
            ...data
        };
    }

    static async update(id: number, data: {
        title?: string;
        text?: string;
        image?: string;
        author?: string;
        link?: string;
    }): Promise<boolean> {
        const fields: string[] = [];
        const values: (string | null)[] = [];

        if (data.title !== undefined) {
            fields.push('title = ?');
            values.push(data.title);
        }
        if (data.text !== undefined) {
            fields.push('text = ?');
            values.push(data.text);
        }
        if (data.image !== undefined) {
            fields.push('image = ?');
            values.push(data.image);
        }
        if (data.author !== undefined) {
            fields.push('author = ?');
            values.push(data.author);
        }
        if (data.link !== undefined) {
            fields.push('link = ?');
            values.push(data.link);
        }

        if (fields.length === 0) return false;

        values.push(id.toString());

        const [result] = await pool.execute<ResultSetHeader>(
            `UPDATE stories SET ${fields.join(', ')} WHERE id = ?`,
            values
        );

        return result.affectedRows > 0;
    }

    static async delete(id: number): Promise<boolean> {
        const [result] = await pool.execute<ResultSetHeader>(
            'DELETE FROM stories WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}
