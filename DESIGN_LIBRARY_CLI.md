# Design Library CLI

Command-line utility for managing, syncing, and exporting the TD Playground Design Library.

## Installation

The CLI is already configured in this project. No additional installation needed.

## Commands

### 📊 Show Statistics

```bash
npm run lib
```

Displays comprehensive statistics about the Design Library:
- Number of tabs and registry files
- Content counts (components, templates, icons, fonts, backgrounds, tokens)
- Current version
- File path

**Example Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📚 Design Library Statistics
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ● Tabs: 7
  ● Registry Files: 6

  Content:
    → Components: 19
    → Templates: 18
    → Icons: 48
    → Fonts: 6
    → Backgrounds: 9
    → Color Tokens: 48

  Version: 1.0.0
  Path: /Users/you/project/src/design-library
```

---

### 🌐 Open in Browser

```bash
npm run lib:open
```

Opens the Design Library in your default browser at `http://localhost:8081/library`.

**Note:** Dev server must be running (`npm run dev`).

---

### 📦 Export Snapshot

```bash
npm run lib:export
```

Creates a timestamped snapshot of the entire Design Library in the `exports/` directory.

**What gets exported:**
- Complete `design-library` folder with all tabs and registries
- `manifest.json` - Metadata and stats
- `README.md` - Installation and usage instructions

**Export location:**
```
exports/library-YYYY-MM-DD/
├── design-library/
│   ├── tabs/
│   ├── registry/
│   ├── utils/
│   └── index.tsx
├── manifest.json
└── README.md
```

**Use cases:**
- Backup before major changes
- Share library with other projects
- Version control milestones
- Client deliverables

---

### 🔄 Sync to Another Project

```bash
npm run lib:sync <target-path>
```

Copies the Design Library to another project directory.

**Example:**
```bash
# Sync to another project's src directory
npm run lib:sync ../my-other-project/src

# Sync to a specific location
npm run lib:sync /Users/you/projects/client-site/src
```

**What it does:**
1. Removes existing `design-library` folder in target (if present)
2. Copies current Design Library to target
3. Preserves all folder structure and files

**After syncing:**
Update your imports in the target project:
```tsx
import { ComponentsTab } from '@/design-library/tabs/ComponentsTab';
import { IconsTab } from '@/design-library/tabs/IconsTab';
```

---

### 📌 Version Info

```bash
npm run lib:version
```

Shows version information and available commands.

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📌 Design Library Version
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Library Version: 1.0.0
  Last Modified: 10/4/2025, 6:38:06 PM

  Available Commands:
    npm run lib           - Show library stats
    npm run lib:open      - Open library in browser
    npm run lib:export    - Export library snapshot
    npm run lib:sync      - Sync to another project
    npm run lib:version   - Show version info
```

---

## Workflow Examples

### Daily Development
```bash
# Check current state
npm run lib

# Open library to review components
npm run lib:open
```

### Before Major Refactor
```bash
# Create backup snapshot
npm run lib:export

# Make your changes...

# Verify stats
npm run lib
```

### Sharing with Team
```bash
# Export for sharing
npm run lib:export

# Zip the export folder
cd exports
zip -r library-2025-10-04.zip library-2025-10-04/

# Share the zip file
```

### Multi-Project Setup
```bash
# Sync to main project
npm run lib:sync ../main-project/src

# Sync to client project
npm run lib:sync ../client-app/src

# Sync to documentation site
npm run lib:sync ../docs-site/src
```

---

## Technical Details

### File Structure
```
tools/
└── design-lib.cjs          # CLI implementation (CommonJS)

src/design-library/
├── index.tsx               # Main library page
├── tabs/                   # 7 tab components
│   ├── ComponentsTab.tsx
│   ├── TemplatesTab.tsx
│   ├── IconsTab.tsx
│   ├── FontsTab.tsx
│   ├── BackgroundsTab.tsx
│   ├── MediaTab.tsx
│   └── TokensTab.tsx
├── registry/               # 6 data registries
│   ├── components.ts
│   ├── templates.ts
│   ├── icons.ts
│   ├── fonts.ts
│   ├── backgrounds.ts
│   └── tokens.ts
└── utils/                  # Helper utilities
    ├── copyToClipboard.ts
    ├── useMediaFiles.ts
    └── SafePreview.tsx
```

### Dependencies
- Node.js built-in modules (`fs`, `path`, `child_process`)
- No external dependencies required

### Compatibility
- Works on macOS, Linux, Windows
- Requires Node.js v14+
- Package manager agnostic (npm, yarn, pnpm)

---

## Troubleshooting

### "Cannot open browser"
The `lib:open` command may fail to auto-launch browser on some systems. Manually navigate to `http://localhost:8081/library`.

### "Target path does not exist"
When using `lib:sync`, ensure the target path exists before running the command.

### "Permission denied"
If you get permission errors, ensure the script is executable:
```bash
chmod +x tools/design-lib.cjs
```

### Export location
Exports are saved to `exports/library-YYYY-MM-DD/`. This directory is gitignored by default.

---

## Future Enhancements

Potential additions to the CLI:

- **Version bumping**: `npm run lib:version:bump`
- **Diff between versions**: `npm run lib:diff v1.0.0 v1.1.0`
- **Component search**: `npm run lib:search "AuthPage"`
- **Generate documentation**: `npm run lib:docs`
- **Validate registries**: `npm run lib:validate`
- **Bundle analysis**: `npm run lib:analyze`

---

## Support

For issues or feature requests, update the CLI script at `tools/design-lib.cjs`.

**Created:** October 2025
**Version:** 1.0.0
**Maintainer:** TD Studios
