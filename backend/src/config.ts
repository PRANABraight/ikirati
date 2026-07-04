import dotenv from 'dotenv';

dotenv.config();

const PLACEHOLDER_SECRETS = new Set([
    'secret',
    'your-strong-secret-key',
    'your-super-secret-jwt-key-change-this-in-production',
]);

export const isProduction = process.env.NODE_ENV === 'production';

let warnedInsecureSecret = false;

// Read lazily so dotenv has loaded and tests can set JWT_SECRET per-suite.
export function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (secret && !PLACEHOLDER_SECRETS.has(secret)) {
        return secret;
    }
    if (isProduction) {
        console.error('FATAL: JWT_SECRET must be set to a strong, non-placeholder value in production.');
        process.exit(1);
    }
    if (!warnedInsecureSecret) {
        console.warn('⚠️  WARNING: JWT_SECRET is not set or is a known placeholder. Using an insecure dev-only secret.');
        warnedInsecureSecret = true;
    }
    return secret || 'insecure-dev-only-secret';
}
