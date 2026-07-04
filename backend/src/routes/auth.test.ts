jest.mock('../models/User', () => ({
  User: {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  },
}));

process.env.JWT_SECRET = 'test-secret';

import express from 'express';
import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authRoutes from './auth';
import { User } from '../models/User';

const mockUser = User as jest.Mocked<typeof User>;

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('POST /api/auth/register', () => {
  afterEach(() => jest.resetAllMocks());

  it('rejects an invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'not-an-email', password: 'Password1' });
    expect(res.status).toBe(400);
  });

  it('rejects a weak password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'a@b.com', password: 'weak' });
    expect(res.status).toBe(400);
  });

  it('returns a generic error when the email is already registered', async () => {
    mockUser.findByEmail.mockResolvedValueOnce({ id: 1, email: 'a@b.com', password: 'hash', role: 'user' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'a@b.com', password: 'Password1' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Registration failed');
  });

  it('creates a user and never returns the password hash', async () => {
    mockUser.findByEmail.mockResolvedValueOnce(null);
    mockUser.create.mockResolvedValueOnce({ id: 7, email: 'a@b.com', password: 'hash', role: 'user' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'a@b.com', password: 'Password1' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 7, email: 'a@b.com', role: 'user' });
    expect(res.body.password).toBeUndefined();
  });
});

describe('POST /api/auth/login', () => {
  afterEach(() => jest.resetAllMocks());

  it('returns 401 for an unknown email', async () => {
    mockUser.findByEmail.mockResolvedValueOnce(null);
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'a@b.com', password: 'Password1' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('returns 401 for a wrong password', async () => {
    const hash = await bcrypt.hash('Correct1pass', 12);
    mockUser.findByEmail.mockResolvedValueOnce({ id: 1, email: 'a@b.com', password: hash, role: 'user' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'a@b.com', password: 'Wrong1password' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('returns a signed token and user on success', async () => {
    const hash = await bcrypt.hash('Correct1pass', 12);
    mockUser.findByEmail.mockResolvedValueOnce({ id: 1, email: 'a@b.com', password: hash, role: 'user' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'a@b.com', password: 'Correct1pass' });
    expect(res.status).toBe(200);
    expect(res.body.user).toEqual({ id: 1, email: 'a@b.com', role: 'user' });
    const decoded = jwt.verify(res.body.token, 'test-secret') as { id: number; role: string };
    expect(decoded.id).toBe(1);
    expect(decoded.role).toBe('user');
  });
});

describe('GET /api/auth/profile', () => {
  it('rejects requests without a token', async () => {
    const res = await request(app).get('/api/auth/profile');
    expect(res.status).toBe(401);
  });

  it('returns the decoded user for a valid token', async () => {
    const token = jwt.sign({ id: 1, email: 'a@b.com', role: 'user' }, 'test-secret');
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.user).toMatchObject({ id: 1, email: 'a@b.com', role: 'user' });
  });
});
