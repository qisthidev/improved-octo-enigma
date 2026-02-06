# improved-octo-enigma

Cloudflare Worker for serving profile pages from R2 storage with fallback to origin server.

## Features

- Handles `/people/{id}` routes where `{id}` is alphanumeric
- Fetches HTML profiles from R2 bucket at `profiles/{id}.html`
- Adds custom header `X-Served-By: Anoman-R2-Edge` for R2-served content
- Falls back to origin server for non-matching routes or missing files

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your R2 bucket in `wrangler.toml`:
   - Update `bucket_name` with your actual R2 bucket name

3. Deploy the worker:
   ```bash
   npm run deploy
   ```

## Development

Run the worker locally:
```bash
npm run dev
```

## Configuration

The worker is configured via `wrangler.toml`:
- `BUCKET`: R2 bucket binding for profile storage

## How it Works

1. Incoming requests are checked against the pattern `/people/{id}`
2. If matched, the worker attempts to fetch `profiles/{id}.html` from R2
3. If found, returns the HTML with proper headers
4. Otherwise, proxies the request to the origin server