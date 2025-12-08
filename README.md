# Donaldson Africa Website

Modern website for Donaldson Attorneys Inc, built with Astro.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment with Dokploy

This project is configured for deployment with Dokploy using Docker.

### Dokploy Configuration

1. **Repository**: Connect your Git repository to Dokploy
2. **Build Method**: Docker
3. **Port**: 80 (nginx serves on port 80 inside the container)
4. **Environment Variables**: None required (all config is baked into the build)

The Dockerfile uses a multi-stage build:
- Stage 1: Installs dependencies with pnpm
- Stage 2: Builds the Astro site
- Stage 3: Serves the static files with nginx

### Manual Docker Build & Test

```bash
# Build the image
docker build -t donaldson-africa-website .

# Run locally
docker run -p 8080:80 donaldson-africa-website

# Visit http://localhost:8080
```

## Project Structure

```
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro    # Main layout with navbar/footer
│   ├── pages/                  # Page routes
│   │   ├── index.astro         # Landing page
│   │   ├── home.astro          # Home page
│   │   ├── about.astro         # About page
│   │   ├── services.astro      # Services page
│   │   ├── contact.astro       # Contact page
│   │   └── ...
│   ├── scripts/js/             # JavaScript modules
│   └── styles/                 # SCSS styles
├── public/
│   └── assets/                 # Static assets (images, videos, fonts, CSS)
├── Dockerfile                  # Docker configuration
└── astro.config.mjs           # Astro configuration
```

## Technology Stack

- **Framework**: Astro 5.16.4
- **Styling**: SCSS/Bootstrap 4
- **Package Manager**: pnpm
- **Deployment**: Docker + Dokploy
- **Web Server**: nginx (in production)