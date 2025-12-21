import { Request } from 'express';

export interface AuthUser {
    id: number;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}
