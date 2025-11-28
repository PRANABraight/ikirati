import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration - restrict to frontend origin
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// General rate limiter
const generalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter rate limiter for auth endpoints
const authLimiter = rateLimit({
    windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || '5'),
    message: 'Too many authentication attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(generalLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Auth routes with stricter rate limiting
app.use('/api/auth', authLimiter, authRoutes);

// Environment validation
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'secret') {
    console.warn('⚠️  WARNING: JWT_SECRET is not set or using default value. Please set a strong secret in production!');
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🔒 CORS enabled for: ${corsOptions.origin}`);
    console.log(`🛡️  Security headers enabled`);
    console.log(`⏱️  Rate limiting active`);
});