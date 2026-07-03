import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from './authMiddleware';

function mockRes() {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
}

describe('authenticateJWT', () => {
  const secret = process.env.JWT_SECRET || 'secret';

  it('rejects requests with no authorization header', () => {
    const req = { headers: {} } as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    authenticateJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' });
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects requests with a malformed authorization header', () => {
    const req = { headers: { authorization: 'Token abc' } } as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    authenticateJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects requests with an invalid token', () => {
    const req = { headers: { authorization: 'Bearer not-a-real-token' } } as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    authenticateJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('attaches decoded user and calls next for a valid token', () => {
    const payload = { id: 1, email: 'user@example.com', role: 'user' };
    const token = jwt.sign(payload, secret);
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    authenticateJWT(req, res, next);

    expect(req.user).toMatchObject(payload);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
