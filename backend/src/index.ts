import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import authRoutes from './routes/auth';
import storiesRoutes from './routes/stories';
import { testConnection, initDatabase } from './db';

dotenv.config();

const app = express();

// Security middleware - configure helmet for serving frontend
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'"],
            mediaSrc: ["'self'", "https:"],
        },
    },
}));

// CORS configuration - restrict to frontend origin (needed for dev mode)
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

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/stories', storiesRoutes);

// Serve static frontend files in production
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

// SPA catch-all route - serve index.html for all non-API routes
app.get('*', (req, res) => {
    // Only serve index.html for non-API routes
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(frontendDistPath, 'index.html'));
    }
});

// Environment validation
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'secret') {
    console.warn('⚠️  WARNING: JWT_SECRET is not set or using default value. Please set a strong secret in production!');
}

const PORT = process.env.PORT || 4000;

// Start server with database initialization
async function startServer() {
    try {
        // Test database connection
        const connected = await testConnection();
        if (connected) {
            // Initialize database tables
            await initDatabase();
        } else {
            console.warn('⚠️  Running without database connection. Some features may not work.');
        }

        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`🔒 CORS enabled for: ${corsOptions.origin}`);
            console.log(`🛡️  Security headers enabled`);
            console.log(`⏱️  Rate limiting active`);
            console.log(`📁 Serving frontend from: ${frontendDistPath}`);
            console.log(`📚 Stories API: /api/stories`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
