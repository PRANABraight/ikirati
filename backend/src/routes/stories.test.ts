jest.mock('../models/Story', () => ({
  Story: {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByUserId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

process.env.JWT_SECRET = 'test-secret';

import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import storiesRoutes from './stories';
import { Story } from '../models/Story';

const mockStory = Story as jest.Mocked<typeof Story>;

const app = express();
app.use(express.json());
app.use('/api/stories', storiesRoutes);

const userToken = jwt.sign({ id: 1, email: 'user@b.com', role: 'user' }, 'test-secret');
const otherToken = jwt.sign({ id: 2, email: 'other@b.com', role: 'user' }, 'test-secret');
const adminToken = jwt.sign({ id: 99, email: 'admin@b.com', role: 'admin' }, 'test-secret');

const storyRow = { id: 5, title: 'T', text: 'X', user_id: 1 };

describe('stories routes', () => {
  afterEach(() => jest.resetAllMocks());

  it('GET / is public and returns stories', async () => {
    mockStory.findAll.mockResolvedValueOnce([storyRow] as never);
    const res = await request(app).get('/api/stories');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([storyRow]);
  });

  it('GET /:id returns 400 for a non-numeric id', async () => {
    const res = await request(app).get('/api/stories/abc');
    expect(res.status).toBe(400);
  });

  it('GET /:id returns 404 when missing', async () => {
    mockStory.findById.mockResolvedValueOnce(null);
    const res = await request(app).get('/api/stories/123');
    expect(res.status).toBe(404);
  });

  it('POST / rejects unauthenticated requests', async () => {
    const res = await request(app).post('/api/stories').send({ title: 'T', text: 'X' });
    expect(res.status).toBe(401);
    expect(mockStory.create).not.toHaveBeenCalled();
  });

  it('POST / validates the body', async () => {
    const res = await request(app)
      .post('/api/stories')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: '', text: '' });
    expect(res.status).toBe(400);
  });

  it('POST / creates a story for the authenticated user', async () => {
    mockStory.create.mockResolvedValueOnce({ ...storyRow } as never);
    const res = await request(app)
      .post('/api/stories')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'T', text: 'X' });
    expect(res.status).toBe(201);
    expect(mockStory.create).toHaveBeenCalledWith(expect.objectContaining({ user_id: 1 }));
  });

  it('PUT /:id forbids editing another user’s story', async () => {
    mockStory.findById.mockResolvedValueOnce(storyRow as never);
    const res = await request(app)
      .put('/api/stories/5')
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ title: 'New', text: 'Y' });
    expect(res.status).toBe(403);
    expect(mockStory.update).not.toHaveBeenCalled();
  });

  it('PUT /:id allows an admin to edit any story', async () => {
    mockStory.findById.mockResolvedValueOnce(storyRow as never);
    mockStory.update.mockResolvedValueOnce(true as never);
    mockStory.findById.mockResolvedValueOnce({ ...storyRow, title: 'New' } as never);
    const res = await request(app)
      .put('/api/stories/5')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'New', text: 'Y' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('New');
  });

  it('DELETE /:id forbids deleting another user’s story', async () => {
    mockStory.findById.mockResolvedValueOnce(storyRow as never);
    const res = await request(app)
      .delete('/api/stories/5')
      .set('Authorization', `Bearer ${otherToken}`);
    expect(res.status).toBe(403);
    expect(mockStory.delete).not.toHaveBeenCalled();
  });

  it('DELETE /:id lets the owner delete', async () => {
    mockStory.findById.mockResolvedValueOnce(storyRow as never);
    mockStory.delete.mockResolvedValueOnce(true as never);
    const res = await request(app)
      .delete('/api/stories/5')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(200);
  });
});
