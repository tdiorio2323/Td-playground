#!/usr/bin/env node

/**
 * Design Library CLI Utility
 *
 * Quick access, sync, export, and version management for the TD Playground Design Library
 *
 * Usage:
 *   npm run lib              - Show library stats
 *   npm run lib:open         - Open library in browser
 *   npm run lib:export       - Export library snapshot
 *   npm run lib:sync         - Sync library to another project
 *   npm run lib:version      - Show version info
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
};

// Project paths
const projectRoot = path.resolve(__dirname, '..');
const designLibPath = path.join(projectRoot, 'src', 'design-library');
const registryPath = path.join(designLibPath, 'registry');
const tabsPath = path.join(designLibPath, 'tabs');

// Helper functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function title(text) {
  console.log('');
  log(`${colors.bright}${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`  ${text}`, 'bright');
  log(`${colors.bright}${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log('');
}

function countFiles(dir, ext) {
  try {
    return fs.readdirSync(dir).filter(file => file.endsWith(ext)).length;
  } catch (e) {
    return 0;
  }
}

function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function countItemsInRegistry(registryFile) {
  const filePath = path.join(registryPath, registryFile);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Count exported arrays/objects
    const arrayMatch = content.match(/export const \w+:\s*\w+\[\]\s*=\s*\[/);
    if (arrayMatch) {
      const itemsMatch = content.match(/{\s*name:/g);
      return itemsMatch ? itemsMatch.length : 0;
    }
    return 0;
  } catch (e) {
    return 0;
  }
}

// Command: Show library stats
function showStats() {
  title('📚 Design Library Statistics');

  const stats = {
    tabs: countFiles(tabsPath, '.tsx'),
    registries: countFiles(registryPath, '.ts'),
    components: countItemsInRegistry('components.ts'),
    templates: countItemsInRegistry('templates.ts'),
    icons: countItemsInRegistry('icons.ts'),
    fonts: countItemsInRegistry('fonts.ts'),
    backgrounds: countItemsInRegistry('backgrounds.ts'),
    colors: countItemsInRegistry('tokens.ts'),
  };

  log(`  ${colors.cyan}●${colors.reset} Tabs: ${colors.green}${stats.tabs}${colors.reset}`);
  log(`  ${colors.cyan}●${colors.reset} Registry Files: ${colors.green}${stats.registries}${colors.reset}`);
  console.log('');
  log('  Content:', 'bright');
  log(`    ${colors.magenta}→${colors.reset} Components: ${colors.green}${stats.components}${colors.reset}`);
  log(`    ${colors.magenta}→${colors.reset} Templates: ${colors.green}${stats.templates}${colors.reset}`);
  log(`    ${colors.magenta}→${colors.reset} Icons: ${colors.green}${stats.icons}${colors.reset}`);
  log(`    ${colors.magenta}→${colors.reset} Fonts: ${colors.green}${stats.fonts}${colors.reset}`);
  log(`    ${colors.magenta}→${colors.reset} Backgrounds: ${colors.green}${stats.backgrounds}${colors.reset}`);
  log(`    ${colors.magenta}→${colors.reset} Color Tokens: ${colors.green}${stats.colors}${colors.reset}`);
  console.log('');

  const packageJson = readJSON(path.join(projectRoot, 'package.json'));
  if (packageJson) {
    log(`  Version: ${colors.yellow}${packageJson.version || '0.0.0'}${colors.reset}`);
  }

  log(`  Path: ${colors.gray}${designLibPath}${colors.reset}`);
  console.log('');
}

// Command: Open library in browser
function openLibrary() {
  title('🌐 Opening Design Library');

  const url = 'http://localhost:8081/library';
  log(`  Opening: ${colors.cyan}${url}${colors.reset}`);
  console.log('');

  try {
    const platform = process.platform;
    const command = platform === 'darwin' ? 'open' :
                   platform === 'win32' ? 'start' : 'xdg-open';

    execSync(`${command} ${url}`, { stdio: 'ignore' });
    log(`  ${colors.green}✓${colors.reset} Browser launched`, 'green');
  } catch (e) {
    log(`  ${colors.yellow}!${colors.reset} Could not open browser automatically`, 'yellow');
    log(`  Please navigate to: ${colors.cyan}${url}${colors.reset}`);
  }
  console.log('');
}

// Command: Export library snapshot
function exportLibrary() {
  title('📦 Exporting Design Library Snapshot');

  const timestamp = new Date().toISOString().split('T')[0];
  const exportDir = path.join(projectRoot, 'exports', `library-${timestamp}`);

  log(`  Creating snapshot in: ${colors.gray}${exportDir}${colors.reset}`);
  console.log('');

  try {
    // Create export directory
    fs.mkdirSync(exportDir, { recursive: true });

    // Copy design library
    const copyDir = (src, dest) => {
      fs.mkdirSync(dest, { recursive: true });
      const entries = fs.readdirSync(src, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };

    copyDir(designLibPath, path.join(exportDir, 'design-library'));

    // Create manifest
    const packageJson = readJSON(path.join(projectRoot, 'package.json'));
    const manifest = {
      name: 'TD Playground Design Library',
      version: packageJson?.version || '1.0.0',
      exported: new Date().toISOString(),
      stats: {
        components: countItemsInRegistry('components.ts'),
        templates: countItemsInRegistry('templates.ts'),
        icons: countItemsInRegistry('icons.ts'),
        fonts: countItemsInRegistry('fonts.ts'),
        backgrounds: countItemsInRegistry('backgrounds.ts'),
      }
    };

    fs.writeFileSync(
      path.join(exportDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    // Create README
    const readme = `# Design Library Export

**Exported:** ${new Date().toLocaleString()}
**Version:** ${manifest.version}

## Contents

- **Components:** ${manifest.stats.components}
- **Templates:** ${manifest.stats.templates}
- **Icons:** ${manifest.stats.icons}
- **Fonts:** ${manifest.stats.fonts}
- **Backgrounds:** ${manifest.stats.backgrounds}

## Installation

1. Copy the \`design-library\` folder to your project's \`src/\` directory
2. Import tabs as needed:

\`\`\`tsx
import { ComponentsTab } from '@/design-library/tabs/ComponentsTab';
import { IconsTab } from '@/design-library/tabs/IconsTab';
// ... etc
\`\`\`

## Usage

See the main Design Library documentation for integration details.
`;

    fs.writeFileSync(path.join(exportDir, 'README.md'), readme);

    log(`  ${colors.green}✓${colors.reset} Design library copied`);
    log(`  ${colors.green}✓${colors.reset} Manifest created`);
    log(`  ${colors.green}✓${colors.reset} README generated`);
    console.log('');
    log(`  ${colors.bright}Export complete!${colors.reset}`, 'green');
    log(`  Location: ${colors.cyan}${exportDir}${colors.reset}`);
    console.log('');

  } catch (e) {
    log(`  ${colors.yellow}!${colors.reset} Export failed: ${e.message}`, 'yellow');
    console.log('');
  }
}

// Command: Sync library to another project
function syncLibrary() {
  title('🔄 Sync Design Library');

  log('  This command will help you sync the Design Library to another project.', 'dim');
  console.log('');

  const args = process.argv.slice(3);
  const targetPath = args[0];

  if (!targetPath) {
    log(`  Usage: ${colors.cyan}npm run lib:sync <target-path>${colors.reset}`);
    console.log('');
    log('  Example:', 'dim');
    log(`    ${colors.gray}npm run lib:sync ../other-project/src${colors.reset}`, 'dim');
    console.log('');
    return;
  }

  const fullTargetPath = path.resolve(targetPath);

  if (!fs.existsSync(fullTargetPath)) {
    log(`  ${colors.yellow}!${colors.reset} Target path does not exist: ${fullTargetPath}`, 'yellow');
    console.log('');
    return;
  }

  const targetLibPath = path.join(fullTargetPath, 'design-library');

  log(`  Source: ${colors.gray}${designLibPath}${colors.reset}`);
  log(`  Target: ${colors.gray}${targetLibPath}${colors.reset}`);
  console.log('');

  try {
    // Remove existing if present
    if (fs.existsSync(targetLibPath)) {
      fs.rmSync(targetLibPath, { recursive: true });
      log(`  ${colors.cyan}●${colors.reset} Removed existing library`);
    }

    // Copy directory
    execSync(`cp -R "${designLibPath}" "${targetLibPath}"`, { stdio: 'inherit' });

    log(`  ${colors.green}✓${colors.reset} Design library synced successfully!`);
    console.log('');
    log(`  Don't forget to update your imports in the target project.`, 'dim');
    console.log('');

  } catch (e) {
    log(`  ${colors.yellow}!${colors.reset} Sync failed: ${e.message}`, 'yellow');
    console.log('');
  }
}

// Command: Show version info
function showVersion() {
  title('📌 Design Library Version');

  const packageJson = readJSON(path.join(projectRoot, 'package.json'));
  const indexPath = path.join(designLibPath, 'index.tsx');

  log(`  Library Version: ${colors.green}${packageJson?.version || '1.0.0'}${colors.reset}`);

  try {
    const stats = fs.statSync(indexPath);
    log(`  Last Modified: ${colors.cyan}${stats.mtime.toLocaleString()}${colors.reset}`);
  } catch (e) {
    log(`  Last Modified: ${colors.gray}Unknown${colors.reset}`);
  }

  console.log('');
  log('  Available Commands:', 'bright');
  log(`    ${colors.cyan}npm run lib${colors.reset}           - Show library stats`);
  log(`    ${colors.cyan}npm run lib:open${colors.reset}      - Open library in browser`);
  log(`    ${colors.cyan}npm run lib:export${colors.reset}    - Export library snapshot`);
  log(`    ${colors.cyan}npm run lib:sync${colors.reset}      - Sync to another project`);
  log(`    ${colors.cyan}npm run lib:version${colors.reset}   - Show version info`);
  console.log('');
}

// Main command router
function main() {
  const command = process.argv[2];

  switch (command) {
    case 'open':
      openLibrary();
      break;
    case 'export':
      exportLibrary();
      break;
    case 'sync':
      syncLibrary();
      break;
    case 'version':
      showVersion();
      break;
    default:
      showStats();
      break;
  }
}

// Run
main();
