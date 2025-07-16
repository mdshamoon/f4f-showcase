# GitHub Pages Deployment Instructions

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push your code to the main branch:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment configuration"
   git push origin main
   ```

3. **The deployment will happen automatically:**
   - The GitHub Actions workflow will trigger on every push to main
   - Check the "Actions" tab in your repository to monitor the deployment
   - Once complete, your site will be available at: `https://[username].github.io/[repository-name]`

## Local Development

To test the static export locally:

```bash
# Build the static site
npm run build

# Serve the static files (you can use any static file server)
npx serve dist
```

## Configuration Details

- **Next.js Config**: Configured for static export with `output: 'export'`
- **Images**: Set to `unoptimized: true` for static hosting compatibility
- **Trailing Slash**: Enabled for GitHub Pages compatibility
- **Build Output**: Configured to use `dist` directory

## Troubleshooting

1. **Build Fails**: Check the Actions tab for error logs
2. **404 Errors**: The `404.html` file handles client-side routing
3. **Assets Not Loading**: Ensure all assets use relative paths
4. **Dynamic Routes**: Convert to static generation or use client-side routing

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run build
# Upload the contents of the 'dist' folder to your hosting provider
```
