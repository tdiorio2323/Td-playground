#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CLI arguments
const args = process.argv.slice(2);
const getArg = (name, defaultValue) => {
  const arg = args.find(a => a.startsWith(`--${name}=`));
  return arg ? arg.split('=')[1] : defaultValue;
};

const baseUrl = getArg('base', 'http://localhost:8081');
const outputPath = getArg('out', 'previews/routes-preview.html');
const screenshotsDir = getArg('screenshots', 'previews/screenshots');
const shouldOpen = args.includes('--open');
const skipScreenshots = args.includes('--skip-screenshots');

// Read routes from App.tsx
function extractRoutes() {
  const appPath = path.join(__dirname, '..', 'src', 'App.tsx');
  const content = fs.readFileSync(appPath, 'utf-8');

  const routes = [];
  const routeRegex = /<Route\s+path="([^"]+)"\s+element={<([^/>]+)/g;

  let match;
  while ((match = routeRegex.exec(content)) !== null) {
    const [, routePath, component] = match;

    // Skip catch-all routes
    if (routePath.includes('*')) continue;

    // Handle dynamic routes
    const isDynamic = routePath.includes(':');
    const displayPath = isDynamic
      ? routePath.replace(':username', 'example-user').replace(':id', '1')
      : routePath;

    routes.push({
      path: routePath,
      displayPath,
      component,
      isDynamic
    });
  }

  return routes;
}

// Take screenshots
async function captureScreenshots(routes) {
  console.log('📸 Starting screenshot capture...\n');

  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  let completed = 0;
  const total = routes.length;

  for (const route of routes) {
    const url = `${baseUrl}${route.displayPath}`;
    const safeName = route.displayPath.replace(/\//g, '_').replace(/^_/, 'root');

    try {
      // Mobile screenshot
      await page.setViewport({ width: 390, height: 844 });
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
      await page.screenshot({
        path: path.join(screenshotsDir, `${safeName}_mobile.png`),
        fullPage: false
      });

      // Desktop screenshot
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
      await page.screenshot({
        path: path.join(screenshotsDir, `${safeName}_desktop.png`),
        fullPage: false
      });

      completed++;
      console.log(`  ✓ ${completed}/${total} ${route.path}`);
    } catch (error) {
      console.log(`  ✗ ${route.path} - ${error.message}`);
    }
  }

  await browser.close();
  console.log('\n✅ Screenshots complete!\n');
}

// Generate HTML with image previews
function generateHTML(routes) {
  const routeCards = routes.map(route => {
    const fullUrl = `${baseUrl}${route.displayPath}`;
    const safeName = route.displayPath.replace(/\//g, '_').replace(/^_/, 'root');
    const mobileImg = `screenshots/${safeName}_mobile.png`;
    const desktopImg = `screenshots/${safeName}_desktop.png`;

    return `
    <a href="${fullUrl}" target="_blank" class="route-card" data-route="${route.path}">
      <div class="screenshot-container">
        <img
          src="${desktopImg}"
          alt="${route.path}"
          class="preview-screenshot"
          loading="lazy"
        />
        ${route.isDynamic ? '<span class="dynamic-badge">Dynamic</span>' : ''}
      </div>
      <div class="route-info">
        <h3 class="route-path">${route.path}</h3>
        <p class="route-component">${route.component}</p>
      </div>
    </a>
    `;
  }).join('\n');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Route Previews - TD Playground</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #0a0a0a;
      color: #fff;
      padding: 2rem;
      line-height: 1.6;
    }

    .header {
      max-width: 1800px;
      margin: 0 auto 3rem;
      text-align: center;
    }

    .header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #fff 0%, #888 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header p {
      color: #888;
      font-size: 1rem;
    }

    .base-url {
      background: #1a1a1a;
      border: 1px solid #333;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem auto;
      max-width: 600px;
      font-family: 'SF Mono', Monaco, monospace;
      font-size: 0.9rem;
      color: #4ade80;
    }

    .stats {
      display: flex;
      gap: 2rem;
      justify-content: center;
      margin: 2rem 0;
      font-size: 0.9rem;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #888;
    }

    .stat-value {
      color: #fff;
      font-weight: 600;
    }

    .container {
      max-width: 1800px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 1600px) {
      .container {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 1200px) {
      .container {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr;
      }
    }

    .route-card {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }

    .route-card:hover {
      border-color: #4ade80;
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(74, 222, 128, 0.2);
    }

    .screenshot-container {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
      background: #0a0a0a;
    }

    .preview-screenshot {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.3s ease;
    }

    .route-card:hover .preview-screenshot {
      transform: scale(1.05);
    }

    .dynamic-badge {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background: #fbbf24;
      color: #000;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .route-info {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .route-path {
      font-size: 0.95rem;
      font-weight: 600;
      font-family: 'SF Mono', Monaco, monospace;
      color: #4ade80;
      margin: 0;
    }

    .route-component {
      font-size: 0.8rem;
      color: #888;
      font-family: 'SF Mono', Monaco, monospace;
      margin: 0;
    }

    .footer {
      max-width: 1800px;
      margin: 4rem auto 0;
      padding: 2rem;
      text-align: center;
      color: #666;
      font-size: 0.85rem;
      border-top: 1px solid #333;
    }

    .regenerate-info {
      background: #1a1a1a;
      border: 1px solid #333;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem auto;
      max-width: 600px;
      font-family: 'SF Mono', Monaco, monospace;
      font-size: 0.85rem;
      color: #fbbf24;
    }

    @media (max-width: 1600px) {
      .frames-container {
        flex-direction: column;
        align-items: center;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📸 Route Previews</h1>
    <p>TD Playground Component System - Screenshot Gallery</p>
    <div class="base-url">${baseUrl}</div>
    <div class="stats">
      <div class="stat-item">
        <span>Total Routes:</span>
        <span class="stat-value">${routes.length}</span>
      </div>
      <div class="stat-item">
        <span>Dynamic Routes:</span>
        <span class="stat-value">${routes.filter(r => r.isDynamic).length}</span>
      </div>
      <div class="stat-item">
        <span>Generated:</span>
        <span class="stat-value">${new Date().toLocaleString()}</span>
      </div>
    </div>
    <div class="regenerate-info">
      Run <code>pnpm routes:preview</code> to regenerate screenshots
    </div>
  </div>

  <div class="container">
    ${routeCards}
  </div>

  <div class="footer">
    <p>Generated by TD Playground Route Preview Tool</p>
    <p>Click any screenshot to open the live route</p>
  </div>
</body>
</html>
  `.trim();
}

// Main execution
async function main() {
  console.log('🎨 Generating route previews with screenshots...\n');

  // Extract routes
  const routes = extractRoutes();
  console.log(`📍 Found ${routes.length} routes\n`);

  // Capture screenshots unless skipped
  if (!skipScreenshots) {
    await captureScreenshots(routes);
  } else {
    console.log('⏭️  Skipping screenshot capture (using existing screenshots)\n');
  }

  // Generate HTML
  const html = generateHTML(routes);

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write file
  const fullOutputPath = path.resolve(outputPath);
  fs.writeFileSync(fullOutputPath, html, 'utf-8');
  console.log(`✅ Generated: ${fullOutputPath}\n`);

  // Open in browser if requested
  if (shouldOpen) {
    const command = process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
        ? 'start'
        : 'xdg-open';

    exec(`${command} "${fullOutputPath}"`, (error) => {
      if (error) {
        console.log(`⚠️  Could not auto-open browser. Please open manually:\n   ${fullOutputPath}\n`);
      } else {
        console.log('🌐 Opened in browser\n');
      }
    });
  }

  console.log('Routes:');
  routes.forEach(route => {
    console.log(`  ${route.isDynamic ? '⚡' : '📄'} ${route.path} → ${route.component}`);
  });
  console.log('');
}

main().catch(console.error);
