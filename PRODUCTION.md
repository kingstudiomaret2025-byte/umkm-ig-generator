# UMKM Instagram Content Generator - Production Server

Express server yang dioptimasi untuk production (Heroku/Railway/Vercel).

## Setup untuk Production

### 1. Heroku Deployment

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=3000

# Deploy
git push heroku main

# Check logs
heroku logs --tail

# Open app
heroku open
```

### 2. Railway Deployment

```bash
# Connect GitHub account
# Railway auto-detect Nodejs app
# Auto-deploy on push

# Environment variables di Railway dashboard:
PORT=3000
NODE_ENV=production
```

### 3. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

## Environment Variables

Untuk production, set these variables di platform:

```env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://your-netlify-site.netlify.app,https://your-custom-domain.com
```

## Performance Optimization

Server sudah dioptimasi dengan:
- ✅ CORS headers
- ✅ Body parser limits
- ✅ Error handling
- ✅ Logging
- ✅ Health check endpoint

## Monitoring

Monitor endpoints:
- **Health Check**: `GET /api/health`
- **Generate Content**: `POST /api/generate-content`

Check logs secara regular untuk performance issues.

