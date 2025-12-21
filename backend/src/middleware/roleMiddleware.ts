import { Request, Response, NextFunction } from 'express';

// Middleware to require admin role
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    const user = req.user as { id: number; email: string; role: string } | undefined;

    if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    if (user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }

    next();
}

// Middleware to require authentication (user or admin)
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const user = req.user as { id: number; email: string; role: string } | undefined;

    if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    next();
}
