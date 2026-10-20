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

## Deployment

The site is served as static assets from a Cloudflare Worker on
`donaldson.africa` and `www.donaldson.africa`. `wrangler.jsonc` holds the
Worker config, and `public/_headers` sets the security headers.

```bash
# Build, then upload dist/ and deploy
pnpm build
npx wrangler deploy
```

Wrangler isn't a project dependency, so `npx` fetches it. The first deploy on a
machine asks you to sign in to Cloudflare (`npx wrangler login`).

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
├── src/astro.config.mjs        # Astro configuration
└── wrangler.jsonc              # Cloudflare Worker configuration
```

## Technology Stack

- **Framework**: Astro 6
- **Styling**: SCSS/Bootstrap 4
- **Package Manager**: pnpm
- **Hosting**: Cloudflare Workers (static assets)
