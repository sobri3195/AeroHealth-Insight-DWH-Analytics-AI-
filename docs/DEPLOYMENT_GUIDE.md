# Deployment Guide - AeroHealth Insight

## 🚀 Deployment Strategy

### Phased Rollout

#### Phase 1: Pilot (Week 1-4)
- **Scope**: 1-2 RS/fasilitas
- **Users**: Limited (10-20 users, selected roles)
- **Features**: Core modules (Home, Capacity, Ops)
- **Goal**: Validate basic functionality, gather feedback

#### Phase 2: Limited Production (Week 5-8)
- **Scope**: 5-10 RS/fasilitas
- **Users**: Expanded (50-100 users, all roles)
- **Features**: All modules except ML predictions
- **Goal**: Test scalability, refine UX

#### Phase 3: General Availability (Week 9+)
- **Scope**: All fasilitas
- **Users**: All authorized users
- **Features**: Full feature set including ML
- **Goal**: Full production rollout

---

## 🏗️ Infrastructure

### Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  Load Balancer (ALB)                │
├─────────────────────────────────────────────────────┤
│              Frontend (React App)                   │
│         - S3 + CloudFront / Nginx                   │
├─────────────────────────────────────────────────────┤
│              API Gateway / Kong                     │
├─────────────────────────────────────────────────────┤
│              Backend Services                       │
│  - KPI Service                                      │
│  - Analytics Service                                │
│  - ML Service                                       │
├─────────────────────────────────────────────────────┤
│              Data Layer                             │
│  - PostgreSQL (DWH)                                 │
│  - Redis (Cache)                                    │
│  - S3 (Data Lake)                                   │
└─────────────────────────────────────────────────────┘
```

### Hosting Options

#### Option 1: Cloud (Recommended)
- **Provider**: AWS / Azure / GCP
- **Frontend**: S3 + CloudFront (AWS) / Blob Storage + CDN (Azure)
- **Compute**: ECS/EKS (AWS) / AKS (Azure) / GKE (GCP)
- **Database**: RDS PostgreSQL
- **Cache**: ElastiCache Redis
- **Advantages**: Scalable, managed services, high availability

#### Option 2: On-Premise
- **Frontend**: Nginx reverse proxy
- **Compute**: Kubernetes cluster
- **Database**: PostgreSQL cluster (HA)
- **Cache**: Redis cluster
- **Advantages**: Full control, data residency

---

## 📦 Build Process

### Prerequisites
```bash
# Check versions
node --version    # Should be >= 18.0.0
npm --version     # Should be >= 9.0.0
```

### Build for Production
```bash
# Install dependencies
npm ci

# Run tests
npm run test

# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Output: dist/ directory
```

### Build Optimization
- **Code splitting**: Automatic via Vite
- **Tree shaking**: Removes unused code
- **Minification**: JS, CSS, HTML
- **Asset optimization**: Images, fonts
- **Source maps**: Generated for debugging

---

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name aerohealth.mil;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.aerohealth.mil;" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (optional)
    location /api/ {
        proxy_pass https://api.aerohealth.mil/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Docker Compose (Development)
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_API_BASE_URL=https://api.aerohealth.mil/v1
    restart: unless-stopped
```

### Build & Run
```bash
# Build image
docker build -t aerohealth-insight:latest .

# Run container
docker run -d \
  -p 80:80 \
  -e VITE_API_BASE_URL=https://api.aerohealth.mil/v1 \
  --name aerohealth-insight \
  aerohealth-insight:latest
```

---

## ☸️ Kubernetes Deployment

### Deployment YAML
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aerohealth-insight
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: aerohealth-insight
  template:
    metadata:
      labels:
        app: aerohealth-insight
    spec:
      containers:
      - name: frontend
        image: aerohealth-insight:latest
        ports:
        - containerPort: 80
        env:
        - name: VITE_API_BASE_URL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: api_base_url
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: aerohealth-insight-service
  namespace: production
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: aerohealth-insight
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: production
data:
  api_base_url: "https://api.aerohealth.mil/v1"
```

### Apply Configuration
```bash
# Create namespace
kubectl create namespace production

# Apply config
kubectl apply -f k8s/

# Check status
kubectl get pods -n production
kubectl get svc -n production

# View logs
kubectl logs -f deployment/aerohealth-insight -n production
```

---

## 🌐 CDN & Static Hosting

### AWS S3 + CloudFront

#### 1. Build Application
```bash
npm run build
```

#### 2. Upload to S3
```bash
aws s3 sync dist/ s3://aerohealth-insight-prod \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html"

aws s3 sync dist/ s3://aerohealth-insight-prod \
  --exclude "*" \
  --include "*.html" \
  --cache-control "no-cache"
```

#### 3. Invalidate CloudFront Cache
```bash
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*"
```

#### 4. CloudFront Configuration
- **Origin**: S3 bucket
- **Default Root Object**: index.html
- **Error Pages**: 404 → /index.html (for SPA routing)
- **SSL**: ACM certificate
- **WAF**: Enable web application firewall

---

## 🔧 Environment Configuration

### Development
```env
VITE_API_BASE_URL=http://localhost:8000/v1
VITE_ENV=development
```

### Staging
```env
VITE_API_BASE_URL=https://api-staging.aerohealth.mil/v1
VITE_ENV=staging
```

### Production
```env
VITE_API_BASE_URL=https://api.aerohealth.mil/v1
VITE_ENV=production
```

---

## 📊 Monitoring & Observability

### Frontend Metrics

#### Performance Metrics
- **LCP** (Largest Contentful Paint): Target < 2.5s
- **FID** (First Input Delay): Target < 100ms
- **CLS** (Cumulative Layout Shift): Target < 0.1
- **TTFB** (Time to First Byte): Target < 600ms

#### Tools
- **Real User Monitoring**: Google Analytics, DataDog RUM
- **Synthetic Monitoring**: Pingdom, UptimeRobot
- **Error Tracking**: Sentry

### Application Logs

#### Log Aggregation
- **ELK Stack**: Elasticsearch, Logstash, Kibana
- **Cloud Logging**: CloudWatch (AWS), Stackdriver (GCP), Log Analytics (Azure)

#### Log Levels
- **ERROR**: Application errors, API failures
- **WARN**: Performance issues, deprecated features
- **INFO**: User actions, page views
- **DEBUG**: Development debugging (disabled in production)

### Alerts

#### Critical Alerts
- **Availability**: Uptime < 99.9%
- **Performance**: LCP > 4s
- **Errors**: Error rate > 1%
- **API**: Response time > 2s or error rate > 5%

#### Notification Channels
- Email
- Slack
- PagerDuty (for on-call)

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run type-check
      - run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: dist
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://aerohealth-insight-prod --delete
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} --paths "/*"
```

---

## ✅ Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing
- [ ] Type checks passing
- [ ] No linting errors
- [ ] Code reviewed and approved
- [ ] Security scan completed

### Configuration
- [ ] Environment variables set
- [ ] API endpoints configured
- [ ] Feature flags configured
- [ ] Rate limits configured

### Security
- [ ] Security headers configured
- [ ] CSP policy set
- [ ] HTTPS enforced
- [ ] Secrets rotated
- [ ] Firewall rules configured

### Performance
- [ ] Build optimized
- [ ] Assets compressed
- [ ] CDN configured
- [ ] Cache headers set

### Monitoring
- [ ] Logging configured
- [ ] Error tracking enabled
- [ ] Performance monitoring enabled
- [ ] Alerts configured

### Documentation
- [ ] README updated
- [ ] API documentation published
- [ ] User guide available
- [ ] Runbook prepared

---

## 📈 Success Metrics

### Phase 1 (Pilot)
- **Uptime**: > 99%
- **User Satisfaction**: > 4/5
- **Critical Bugs**: 0
- **Performance**: LCP < 3s

### Phase 2 (Limited Production)
- **Uptime**: > 99.5%
- **User Adoption**: > 70%
- **Dashboard Load Time**: < 2.5s
- **API Error Rate**: < 2%

### Phase 3 (General Availability)
- **Uptime**: > 99.9%
- **User Adoption**: > 90%
- **Dashboard Load Time**: < 2s
- **API Error Rate**: < 1%
- **User Satisfaction**: > 4.5/5

---

## 🆘 Rollback Procedure

### Quick Rollback
```bash
# CloudFront/S3
aws s3 sync s3://aerohealth-insight-prod-backup/ s3://aerohealth-insight-prod/
aws cloudfront create-invalidation --distribution-id XXX --paths "/*"

# Kubernetes
kubectl rollout undo deployment/aerohealth-insight -n production

# Docker
docker stop aerohealth-insight
docker run -d --name aerohealth-insight aerohealth-insight:previous-version
```

### Post-Rollback
1. Notify users of temporary rollback
2. Investigate root cause
3. Fix issues
4. Retest thoroughly
5. Re-deploy with fixes

---

**Dokumen ini di-maintain oleh DevOps Team**
*Last updated: 2024-01-01*
