# Docker Setup for AURA Villas Bali

## Quick Start

### 1. Development Mode (with hot reload)
```bash
# Start development container
docker-compose --profile development up

# Or use the shorthand
docker-compose up aura-villas-dev
```
Access the site at: http://localhost:3003

### 2. Production Mode
```bash
# Build and start production container
docker-compose --profile production up

# Or build first, then run
docker build -t aura-villas .
docker run -p 3002:3000 aura-villas
```
Access the site at: http://localhost:3002

## Integration with Existing Docker Setup

If you have another application already using Docker, you have several options:

### Option 1: Add to Existing docker-compose.yml
Add this service to your existing `docker-compose.yml`:

```yaml
aura-villas:
  build:
    context: ./path-to-aura-villas-bali
    dockerfile: Dockerfile
  container_name: aura-villas
  ports:
    - "3002:3000"  # Production port
  environment:
    - NODE_ENV=production
  networks:
    - your-existing-network
  restart: unless-stopped
```

### Option 2: Use Multiple Compose Files
```bash
# Run both applications together
docker-compose \
  -f /path/to/other-app/docker-compose.yml \
  -f /path/to/aura-villas/docker-compose.extend.yml \
  up
```

### Option 3: Use Docker Networks
Connect containers across different compose files:

```bash
# Create a shared network
docker network create shared-network

# Update both docker-compose files to use external network
networks:
  default:
    external:
      name: shared-network
```

## Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Configure your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Docker Commands

### Build Images
```bash
# Development image
docker build -f Dockerfile.dev -t aura-villas:dev .

# Production image
docker build -t aura-villas:prod .
```

### Run Containers
```bash
# Development with volume mounting
docker run -p 3003:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -v /app/.next \
  aura-villas:dev

# Production
docker run -p 3002:3000 aura-villas:prod
```

### Docker Compose Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f aura-villas-dev

# Rebuild after changes
docker-compose build --no-cache

# Remove volumes
docker-compose down -v
```

## Port Configuration

Default ports:
- Development: 3003
- Production: 3002
- Nginx (optional): 80, 443

To change ports, modify the `ports` section in `docker-compose.yml`:
```yaml
ports:
  - "8080:3000"  # Maps container port 3000 to host port 8080
```

## Troubleshooting

### Hot Reload Not Working
Add `WATCHPACK_POLLING=true` to environment variables in docker-compose.yml

### Permission Issues
```bash
# Fix permissions
docker exec -it aura-villas-dev chmod -R 777 /app/.next
```

### Clear Docker Cache
```bash
docker system prune -a
docker volume prune
```

### Container Can't Start
Check logs:
```bash
docker logs aura-villas-development
```

## Production Deployment

For production deployment with HTTPS:

1. Update `nginx.conf` with your domain
2. Add SSL certificates to `./ssl` directory
3. Run with nginx profile:
```bash
docker-compose --profile with-nginx up -d
```

## Health Check

Add health check to docker-compose.yml:
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## Resource Limits

Add resource constraints for production:
```yaml
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 1G
    reservations:
      cpus: '0.5'
      memory: 512M
```