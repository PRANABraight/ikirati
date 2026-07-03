import { Request, Response, NextFunction } from 'express';
import { requireAuth, requireAdmin } from './roleMiddleware';

function mockRes() {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
}

describe('requireAuth', () => {
  it('rejects when req.user is missing', () => {
    const req = {} as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next when req.user is present', () => {
    const req = { user: { id: 1, email: 'a@b.com', role: 'user' } } as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe('requireAdmin', () => {
  it('rejects when req.user is missing', () => {
    const req = {} as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects non-admin users', () => {
    const req = { user: { id: 1, email: 'a@b.com', role: 'user' } } as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next for admin users', () => {
    const req = { user: { id: 1, email: 'a@b.com', role: 'admin' } } as Request;
    const res = mockRes();
    const next = jest.fn() as NextFunction;

    requireAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
