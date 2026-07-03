jest.mock('../db', () => ({
  __esModule: true,
  default: { execute: jest.fn() },
}));

import pool from '../db';
import { User } from './User';

const mockExecute = pool.execute as jest.Mock;

describe('User model', () => {
  afterEach(() => {
    mockExecute.mockReset();
  });

  it('findByEmail queries by email and returns the first row', async () => {
    const row = { id: 1, email: 'a@b.com', password: 'hash', role: 'user' };
    mockExecute.mockResolvedValueOnce([[row]]);

    const result = await User.findByEmail('a@b.com');

    expect(mockExecute).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE email = ?',
      ['a@b.com']
    );
    expect(result).toEqual(row);
  });

  it('findByEmail returns null when no row matches', async () => {
    mockExecute.mockResolvedValueOnce([[]]);

    const result = await User.findByEmail('missing@b.com');

    expect(result).toBeNull();
  });

  it('findById queries by id', async () => {
    const row = { id: 5, email: 'c@d.com', password: 'hash', role: 'admin' };
    mockExecute.mockResolvedValueOnce([[row]]);

    const result = await User.findById(5);

    expect(mockExecute).toHaveBeenCalledWith(
      'SELECT * FROM users WHERE id = ?',
      [5]
    );
    expect(result).toEqual(row);
  });

  it('create inserts a user with default role and returns it with the new id', async () => {
    mockExecute.mockResolvedValueOnce([{ insertId: 42 }]);

    const result = await User.create({ email: 'new@b.com', password: 'hash' });

    expect(mockExecute).toHaveBeenCalledWith(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      ['new@b.com', 'hash', 'user']
    );
    expect(result).toEqual({ id: 42, email: 'new@b.com', password: 'hash', role: 'user' });
  });

  it('updateRole returns true when a row is affected', async () => {
    mockExecute.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const result = await User.updateRole(1, 'admin');

    expect(mockExecute).toHaveBeenCalledWith(
      'UPDATE users SET role = ? WHERE id = ?',
      ['admin', 1]
    );
    expect(result).toBe(true);
  });

  it('updateRole returns false when no row is affected', async () => {
    mockExecute.mockResolvedValueOnce([{ affectedRows: 0 }]);

    const result = await User.updateRole(999, 'admin');

    expect(result).toBe(false);
  });
});
