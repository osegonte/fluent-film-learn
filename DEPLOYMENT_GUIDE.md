# CineFluent Production Deployment Guide

## Prerequisites
- [ ] Domain name purchased
- [ ] SSL certificate (handled by hosting platforms)
- [ ] Production database (PostgreSQL)
- [ ] Email service (Gmail, SendGrid, etc.)
- [ ] Error tracking (Sentry account)
- [ ] Analytics (Google Analytics)

## Quick Deployment Options

### Option 1: Railway (Recommended for beginners)
```bash
./scripts/deploy_railway.sh
```

### Option 2: Vercel + Railway
```bash
# Deploy backend to Railway
cd backend && railway up

# Deploy frontend to Vercel
./scripts/deploy_vercel.sh
```

### Option 3: Render
```bash
./scripts/deploy_render.sh
```

## Manual Deployment Steps

### 1. Database Setup
1. Create PostgreSQL database on your hosting platform
2. Run the schema: `psql -d your_database < backend/database/schema.sql`
3. Update DATABASE_URL in your environment variables

### 2. Backend Deployment
1. Deploy backend code to your hosting platform
2. Set environment variables from `.env.production`
3. Ensure health check endpoint is accessible

### 3. Frontend Deployment
1. Update VITE_API_URL to your backend URL
2. Build and deploy frontend
3. Set up custom domain (optional)

### 4. Post-Deployment
1. Test all functionality
2. Set up monitoring and alerts
3. Configure backup strategy
4. Set up CI/CD pipeline

## Environment Variables Checklist

### Backend (.env.production)
- [ ] DATABASE_URL
- [ ] SECRET_KEY (generate new one!)
- [ ] JWT_SECRET_KEY (generate new one!)
- [ ] BACKEND_CORS_ORIGINS
- [ ] SMTP configuration
- [ ] SENTRY_DSN (optional)

### Frontend (.env.production)
- [ ] VITE_API_URL
- [ ] VITE_GOOGLE_ANALYTICS_ID (optional)

## Security Checklist
- [ ] Change all default passwords
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Configure rate limiting
- [ ] Set up backup strategy

## Performance Optimization
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure database connection pooling
- [ ] Add Redis for caching (optional)
- [ ] Optimize images and assets

## Monitoring & Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Configure Google Analytics
- [ ] Set up uptime monitoring
- [ ] Create performance dashboards

## Maintenance
- [ ] Set up automated backups
- [ ] Plan regular updates
- [ ] Monitor resource usage
- [ ] Keep dependencies updated
