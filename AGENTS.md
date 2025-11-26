# Grafana Dashboards - PMM Project

> AI agent documentation for Percona Monitoring and Management (PMM) Grafana dashboards

## Project Overview

This repository contains Grafana dashboards for **Percona Monitoring and Management (PMM)**, a database monitoring solution. The main component is `pmm-app`, a Grafana plugin that provides:

- **Query Analytics (QAN)**: Custom panel for analyzing database queries
- **Pre-built dashboards**: 50+ monitoring dashboards for MySQL, MongoDB, PostgreSQL
- **Custom UI components**: React-based interfaces integrated with Grafana

## Repository Structure

```
grafana-dashboards/
├── dashboards/          # Pre-built Grafana dashboard JSON files
├── pmm-app/            # Main Grafana plugin (see pmm-app/AGENTS.md)
│   ├── src/
│   │   ├── pmm-qan/   # Query Analytics panel
│   │   └── shared/     # Shared components and utilities
│   └── dist/           # Build output (git-ignored)
└── panels/             # Legacy panel code
```

## Quick Start

### Development Setup

```bash
# Install dependencies (from root)
make prepare_release

# Start development environment
cd pmm-app
docker-compose up -d
yarn dev

# Access Grafana at http://localhost:80 (admin/admin)
```

### Common Commands

```bash
# Build
make build_package           # Production build (from root)
cd pmm-app && yarn build     # Production build (from pmm-app)
cd pmm-app && yarn dev       # Development with hot reload

# Testing
cd pmm-app && yarn test      # Watch mode
cd pmm-app && yarn test:ci   # CI mode (all tests)

# Code Quality
cd pmm-app && yarn typecheck # Type checking
cd pmm-app && yarn lint:dev  # Auto-fix linting
```

## Git Workflow

### Branch Naming
```
JIRA_ID-short-description
```
Examples: `PMM-5053-add-missed-tooltips`, `PMM-14508-QAN-light-mode-support`

### Commit Format
```
JIRA_ID Description of what is being done
```
Examples:
- `PMM-5053 Add tooltip for Head Block widget`
- `PMM-14508 Improve areas of the user interface`

### Pull Request Process
1. Create feature branch from `v3` (main development branch)
2. Make changes and commit following format above
3. Push to your fork
4. Create PR to `v3` branch
5. Add `pmm-review-fe` team as reviewers
6. Ensure CI passes and CLA is signed

## Critical Rules for Code Generation

### TypeScript
- **NEVER use `any` type** - always provide proper TypeScript types
- Use `noImplicitAny: false` in config, but avoid `any` per project standards

```typescript
// ✅ CORRECT
const getUser = (id: string): Promise<User> => { ... }

// ❌ WRONG - NEVER DO THIS
const getUser = (id: any): any => { ... }
```

### Imports
- **Always use absolute imports** from `src/` (baseUrl configured)
- **Never use relative imports**

```typescript
// ✅ CORRECT
import { Button } from 'shared/components/Elements/Button';

// ❌ WRONG
import { Button } from '../../../shared/components/Elements/Button';
```

### Code Style
- Single quotes for strings
- Max line length: 110 characters (excluding strings and regex)
- Blank lines required before returns, after imports, between statement blocks
- No inline comments
- No inline styles
- Prefer `const` over `let`; never use `var`

```typescript
// ✅ CORRECT
const name = 'John';

const calculate = () => {
  const result = 10 + 20;

  return result; // Blank line before return
};

// ❌ WRONG
const name = "John"; // Double quotes
var x = 10; // Using var
```

## Technology Stack Overview

- **Main App**: React 18 + TypeScript 4.8.4
- **UI**: Ant Design v5, Grafana SDK 11.x
- **Build**: Webpack 5 + SWC
- **Testing**: Jest with @testing-library/react
- **State**: Context API (no Redux)

## Docker Development

The docker-compose setup includes:
- PMM server with Grafana (port 80/443)
- Sample databases (MySQL, MongoDB, PostgreSQL)
- PMM client for metrics collection
- Live reload: `./pmm-app/dist` mounted to `/srv/grafana/plugins/pmm-app/dist`

```bash
# Full environment
cd pmm-app && docker-compose up -d

# Minimal (just PMM server)
cd pmm-app && docker-compose up -d pmm-server
```

## Package Management

- **Node.js**: >= 18 (v22 specified in .nvmrc)
- **Yarn**: 1.22.21
- Always use `yarn install --frozen-lockfile` for reproducible builds

## Key Files

```
AGENTS.md                                  # This file
CLAUDE.md                                  # Legacy Claude Code instructions
pmm-app/AGENTS.md                          # Detailed pmm-app documentation
pmm-app/src/pmm-qan/panel/AGENTS.md       # QAN component specifics
pmm-app/CODE-STYLE.md                     # AirBnB-based style guide
```

## Important Notes

- Main development branch is `v3`, not `main` or `master`
- All PRs require CLA signature and passing CI
- Snake_case is allowed for API interaction
- Helper functions can be defined below main function
- ESLint blank line padding enforced for readability

## For More Details

See `pmm-app/AGENTS.md` for detailed information about:
- Project architecture
- Grafana plugin patterns
- State management
- API integration
- Testing patterns
- Common code examples
