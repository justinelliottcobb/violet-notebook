// Legacy Remix server - not needed for React Router 7 with Vite
// This file is kept for reference but not used in the new implementation

/*
// server/server.ts
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { createRequestHandler } from '@remix-run/express';
import { broadcastDevReady } from '@remix-run/node';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as build from '../build/index.js';

// Load environment variables
const port = process.env.PORT || 3000;
const API_TARGET = process.env.API_TARGET || 'http://localhost:8080';

const app = express();

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      "connect-src": ["'self'", "ws:", "wss:", "https:"],
      "img-src": ["'self'", "data:", "https:"],
      "font-src": ["'self'", "https:", "data:"],
      "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      "style-src": ["'self'", "'unsafe-inline'", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(compression());
app.use(morgan('combined'));

// Serve static files
app.use(express.static('public', { maxAge: '1h' }));

// Parse JSON bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Proxy API requests
const apiProxy = createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api', // Keep the /api prefix
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(502).json({ error: 'Bad Gateway' });
  }
});

app.use('/api', apiProxy);

// Rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Remix request handler
const remixHandler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

app.all('*', remixHandler);

const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  
  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(build);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Custom error handler middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', error);
  
  if (res.headersSent) {
    return next(error);
  }
  
  const statusCode = error.statusCode || error.status || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error'
    : error.message || 'Something went wrong';
    
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

export default app;

// Types for better TypeScript support
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}
*/