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
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:', 'https:'],
      'font-src': ["'self'", 'https:', 'data:'],
      'connect-src': ["'self'", API_TARGET],
    },
  },
}));

// Basic middleware setup
app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use(express.static('public'));

// API proxy configuration
const apiProxy = createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add any necessary headers or auth tokens
    if (process.env.API_KEY) {
      proxyReq.setHeader('Authorization', `Bearer ${process.env.API_KEY}`);
    }
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).json({ error: 'Proxy Error' });
  },
});

// Mount API proxy middleware
app.use('/api', apiProxy);

// Server-side endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rate limiting for server-side endpoints
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

// Apply rate limiting to server-side endpoints
app.use('/server', limiter);

// Server-side components routes
app.use('/server', express.Router()
  .get('/metadata', async (req, res) => {
    try {
      // Example server-side component logic
      const metadata = {
        version: process.env.npm_package_version,
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      };
      res.json(metadata);
    } catch (error) {
      console.error('Metadata Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Handle Remix requests - this should be last
app.all(
  '*',
  createRequestHandler({
    build,
    mode: process.env.NODE_ENV,
  })
);

// Start server
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(build);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

// Type definitions for environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: 'development' | 'production' | 'test';
      API_TARGET?: string;
      API_KEY?: string;
      npm_package_version: string;
    }
  }
}

export default app;