# My Website

Hello! I'm Ian Gillette and this is the source code for my personal website.

## Setup

### Environment variables

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `PRIVATE_PASSWORD` | Password visitors enter on the site to access private files (e.g. resume). |

### Private files

Private files (resume, documents) are served at `/private/[filename]` after validating a session cookie. The backend expects a password hash to be configured and a file server to be reachable at the URL specified in your environment.

### Running locally

```bash
npm install
npm run dev
```

### Building

```bash
npm run build
```

### Docker

```bash
docker compose up -d
```

Requires a shared `web` Docker network to exist.

---

Copyright 2026 Ian Gillette (MelonEncoder)
