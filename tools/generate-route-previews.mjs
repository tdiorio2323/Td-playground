#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

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
const shouldOpen = args.includes('--open');

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

// Generate HTML
function generateHTML(routes) {
  const routeCards = routes.map(route => {
    const fullUrl = `${baseUrl}${route.displayPath}`;

    return `
    <div class="route-card" data-route="${route.path}">
      <div class="route-header">
        <div>
          <h2 class="route-path">${route.path}</h2>
          <p class="route-component">${route.component}</p>
          ${route.isDynamic ? '<span class="dynamic-badge">Dynamic Route</span>' : ''}
        </div>
        <div class="header-actions">
          <button class="load-btn" data-url="${fullUrl}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Load Preview
          </button>
          <a href="${fullUrl}" target="_blank" class="open-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Open
          </a>
        </div>
      </div>

      <div class="frames-container" style="display: none;">
        <div class="frame-wrapper">
          <div class="frame-label">Mobile (390×844)</div>
          <div class="iframe-placeholder mobile-frame">
            <div class="placeholder-content">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              <p>Click "Load Preview" to see mobile view</p>
            </div>
          </div>
        </div>

        <div class="frame-wrapper">
          <div class="frame-label">Desktop (1440×900)</div>
          <div class="iframe-placeholder desktop-frame">
            <div class="placeholder-content">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              <p>Click "Load Preview" to see desktop view</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .route-card {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 12px;
      padding: 2rem;
      transition: all 0.3s ease;
    }

    .route-card:hover {
      border-color: #555;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    }

    .route-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #333;
    }

    .route-path {
      font-size: 1.5rem;
      font-weight: 600;
      font-family: 'SF Mono', Monaco, monospace;
      color: #4ade80;
      margin-bottom: 0.5rem;
    }

    .route-component {
      font-size: 0.9rem;
      color: #888;
      font-family: 'SF Mono', Monaco, monospace;
    }

    .dynamic-badge {
      display: inline-block;
      background: #fbbf24;
      color: #000;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-top: 0.5rem;
    }

    .header-actions {
      display: flex;
      gap: 0.5rem;
    }

    .load-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #4ade80;
      color: #000;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: none;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .load-btn:hover {
      background: #22c55e;
      transform: translateY(-1px);
    }

    .load-btn.loading {
      background: #fbbf24;
      pointer-events: none;
    }

    .load-btn.loaded {
      background: #333;
      color: #fff;
      pointer-events: none;
    }

    .open-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #333;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .open-link:hover {
      background: #444;
      transform: translateY(-1px);
    }

    .iframe-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1a1a1a;
      border: 2px dashed #333;
    }

    .placeholder-content {
      text-align: center;
      color: #666;
    }

    .placeholder-content svg {
      margin: 0 auto 1rem;
      opacity: 0.5;
    }

    .placeholder-content p {
      font-size: 0.85rem;
    }

    .frames-container {
      display: flex;
      gap: 2rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .frame-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .frame-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-align: center;
    }

    .preview-frame {
      border: 1px solid #333;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }

    .mobile-frame {
      width: 390px;
      height: 844px;
    }

    .desktop-frame {
      width: 1440px;
      height: 900px;
      transform: scale(0.5);
      transform-origin: top center;
      margin-bottom: -450px;
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

    @media (max-width: 1600px) {
      .frames-container {
        flex-direction: column;
        align-items: center;
      }

      .desktop-frame {
        transform: scale(0.4);
        margin-bottom: -540px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎨 Route Previews</h1>
    <p>TD Playground Component System</p>
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
  </div>

  <div class="container">
    ${routeCards}
  </div>

  <div class="footer">
    <p>Generated by TD Playground Route Preview Tool</p>
    <p>Refresh this page after making route changes</p>
  </div>

  <script>
    // Load iframes on demand
    document.querySelectorAll('.load-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const card = this.closest('.route-card');
        const framesContainer = card.querySelector('.frames-container');
        const url = this.dataset.url;

        // Show loading state
        this.classList.add('loading');
        this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Loading...';

        // Show frames container
        framesContainer.style.display = 'flex';

        // Replace placeholders with iframes
        const placeholders = card.querySelectorAll('.iframe-placeholder');

        placeholders.forEach((placeholder, index) => {
          const iframe = document.createElement('iframe');
          iframe.src = url;
          iframe.className = placeholder.classList.contains('mobile-frame') ? 'preview-frame mobile-frame' : 'preview-frame desktop-frame';
          iframe.setAttribute('loading', 'eager');
          iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms');

          placeholder.replaceWith(iframe);
        });

        // Update button state after load
        setTimeout(() => {
          this.classList.remove('loading');
          this.classList.add('loaded');
          this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Loaded';
        }, 2000);
      });
    });

    // Load All button functionality
    const loadAllBtn = document.createElement('button');
    loadAllBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Load All Previews';
    loadAllBtn.className = 'load-btn';
    loadAllBtn.style.cssText = 'position: fixed; bottom: 2rem; right: 2rem; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.5);';

    loadAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.load-btn:not(.loaded):not(.loading)').forEach((btn, index) => {
        setTimeout(() => btn.click(), index * 300);
      });
    });

    document.body.appendChild(loadAllBtn);
  </script>

  <style>
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  </style>
</body>
</html>
  `.trim();
}

// Main execution
function main() {
  console.log('🎨 Generating route previews...\n');

  // Extract routes
  const routes = extractRoutes();
  console.log(`📍 Found ${routes.length} routes\n`);

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

main();
