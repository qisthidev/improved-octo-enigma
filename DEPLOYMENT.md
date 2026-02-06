# Cloudflare Worker Deployment Guide

## Prerequisites

1. A Cloudflare account
2. Wrangler CLI installed (comes with the project via npm install)
3. An R2 bucket created in your Cloudflare account

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Wrangler

Update `wrangler.toml` with your actual R2 bucket name:

```toml
[[r2_buckets]]
binding = "BUCKET"
bucket_name = "your-actual-r2-bucket-name"  # Change this!
```

### 3. Authenticate with Cloudflare

```bash
npx wrangler login
```

This will open a browser window to authenticate with Cloudflare.

### 4. Create R2 Bucket (if not already created)

```bash
npx wrangler r2 bucket create your-bucket-name
```

### 5. Upload Profile Files to R2

Upload HTML files to your R2 bucket with the path structure: `profiles/{id}.html`

Example using Wrangler:
```bash
npx wrangler r2 object put your-bucket-name/profiles/john123.html --file=examples/profile-example.html
```

Or use the Cloudflare dashboard to upload files.

### 6. Deploy the Worker

```bash
npm run deploy
```

### 7. Test Your Worker

Once deployed, test your worker:

```bash
# Test with an existing profile
curl https://improved-octo-enigma.your-subdomain.workers.dev/people/john123

# Test with a non-existent profile (should fallback to origin)
curl https://improved-octo-enigma.your-subdomain.workers.dev/people/nonexistent
```

## Local Development

To test locally:

```bash
npm run dev
```

This will start a local development server. Note that you'll need to configure local R2 bucket access or use remote R2 even in dev mode.

## Troubleshooting

### Issue: R2 bucket not found

Make sure:
1. The bucket name in `wrangler.toml` matches your actual R2 bucket
2. The bucket exists in the same Cloudflare account
3. You've authenticated with the correct account

### Issue: Worker not serving files

Check:
1. Files are uploaded to R2 with the correct path: `profiles/{id}.html`
2. The person ID in the URL matches the filename (alphanumeric only)
3. Check worker logs: `npx wrangler tail`

## Monitoring

View real-time logs:
```bash
npx wrangler tail
```

## Additional Configuration

To add custom domains, routes, or other settings, update `wrangler.toml`. See [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/) for more details.
