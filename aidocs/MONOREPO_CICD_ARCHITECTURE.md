# Monorepo CI/CD Architecture Guide

**Document Version:** 1.0  
**Date:** January 13, 2026  
**For:** DevOps, Tech Leads, Platform Engineers  
**Purpose:** CI/CD strategy for component library + documentation in monorepo

---

## Executive Summary

**Question:** Should the component library and doc sites get separate CI/CD processes?

**Answer:** YES - They get **separate pipelines triggered by path-based rules**, but coordinated through dependency awareness.

**Why Separate:**
- ✅ Different deployment targets (NPM vs Netlify)
- ✅ Different build requirements (Stencil vs Docusaurus/Jekyll)
- ✅ Different test suites (component tests vs content validation)
- ✅ Independent release schedules
- ✅ Faster feedback (don't rebuild everything for doc changes)

**How They Coordinate:**
- Path-based triggering (only run when relevant files change)
- Dependency awareness (docs rebuilds when components change)
- Shared caching (Turborepo)
- Unified status checks

---

## Architecture Overview

### Current Monorepo Structure

```
component-library/
├── .github/
│   └── workflows/
│       ├── publish-components.yml      # NPM publishing
│       ├── deploy-docs-portal.yml      # Docusaurus deployment
│       ├── deploy-jekyll-docs.yml      # Jekyll deployment
│       ├── test-components.yml         # Component testing
│       ├── lint.yml                    # Code quality
│       └── preview-*.yml               # PR previews
├── packages/
│   ├── web-components/     # Deployed to NPM
│   ├── css-library/        # Deployed to NPM
│   ├── storybook/          # Deployed to storybook.va.gov
│   └── core/               # Deployed to NPM
├── apps/
│   ├── docs-portal/        # Deployed to design.va.gov
│   └── docs/               # Legacy Jekyll (if still present)
└── teams/
    └── */docs/             # Part of docs-portal deployment
```

### Deployment Targets

| What | Where | Trigger | Process |
|------|-------|---------|---------|
| Web Components | NPM Registry | Release tag | `publish-components.yml` |
| CSS Library | NPM Registry | Release tag | `publish-components.yml` |
| Storybook | storybook.va.gov | Changes in packages/storybook | `deploy-storybook.yml` |
| Docs Portal | design.va.gov | Changes in apps/docs-portal or teams/*/docs | `deploy-docs-portal.yml` |
| API Docs | design.va.gov/api | Changes in docs/api | `deploy-docs-portal.yml` |

---

## CI/CD Pipeline Design

### Pipeline 1: Component Library Publishing

**Purpose:** Build and publish component packages to NPM

**Trigger:** Release creation (manual process)

**What it does:**
1. Build web-components
2. Build css-library  
3. Build core (bundles web-components + css)
4. Run all tests
5. Publish to NPM
6. Create GitHub Release notes
7. Notify Slack

**File:** `.github/workflows/publish-components.yml`

```yaml
name: Publish Component Library

on:
  release:
    types: [published]
  workflow_dispatch:  # Manual trigger for testing

jobs:
  # Job 1: Build and test
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          cache: 'yarn'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: yarn install --immutable
      
      - name: Cache Turborepo
        uses: actions/cache@v3
        with:
          path: .turbo
          key: ${{ runner.os }}-turbo-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-turbo-
      
      - name: Build all packages
        run: yarn turbo run build --filter='./packages/*'
        env:
          NODE_ENV: production
      
      - name: Run tests
        run: yarn turbo run test --filter='./packages/*'
      
      - name: Run linting
        run: yarn turbo run lint --filter='./packages/*'
      
      # Upload build artifacts for publishing
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-artifacts
          path: |
            packages/*/dist
            packages/*/loader
  
  # Job 2: Publish to NPM
  publish-npm:
    needs: build-and-test
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-artifacts
      
      - name: Publish web-components
        working-directory: packages/web-components
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Publish css-library
        working-directory: packages/css-library
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Publish core
        working-directory: packages/core
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: |
            ✅ Component Library Published!
            Version: ${{ github.event.release.tag_name }}
            Release Notes: ${{ github.event.release.html_url }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
```

**Path-based trigger:** N/A (manual release process)

---

### Pipeline 2: Documentation Portal Deployment

**Purpose:** Deploy Docusaurus documentation site

**Trigger:** Changes to documentation or components (that affect docs)

**What it does:**
1. Build components (if changed)
2. Build Docusaurus
3. Deploy to Netlify
4. Update Algolia search index
5. Notify team

**File:** `.github/workflows/deploy-docs-portal.yml`

```yaml
name: Deploy Documentation Portal

on:
  push:
    branches: [main]
    paths:
      # Trigger on docs changes
      - 'apps/docs-portal/**'
      - 'teams/**/docs/**'
      - 'docs/api/**'
      # Trigger on component changes (docs depend on components)
      - 'packages/web-components/**'
      - 'packages/css-library/**'
  
  pull_request:
    branches: [main]
    paths:
      - 'apps/docs-portal/**'
      - 'teams/**/docs/**'
      - 'docs/api/**'

jobs:
  # Job 1: Determine what changed
  check-changes:
    runs-on: ubuntu-latest
    outputs:
      components-changed: ${{ steps.filter.outputs.components }}
      docs-changed: ${{ steps.filter.outputs.docs }}
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            components:
              - 'packages/web-components/**'
              - 'packages/css-library/**'
            docs:
              - 'apps/docs-portal/**'
              - 'teams/**/docs/**'
              - 'docs/api/**'
  
  # Job 2: Build and deploy
  build-and-deploy:
    needs: check-changes
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --immutable
      
      - name: Cache Turborepo
        uses: actions/cache@v3
        with:
          path: .turbo
          key: ${{ runner.os }}-turbo-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-turbo-
      
      # Only build components if they changed
      - name: Build components
        if: needs.check-changes.outputs.components-changed == 'true'
        run: |
          yarn turbo run build \
            --filter=@department-of-veterans-affairs/web-components \
            --filter=@department-of-veterans-affairs/css-library
      
      # Always build docs (they might reference component changes)
      - name: Build documentation
        run: yarn turbo run build --filter=@va/docs-portal
        env:
          NODE_ENV: production
          ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
          ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
      
      # Deploy to Netlify (production)
      - name: Deploy to Netlify
        if: github.ref == 'refs/heads/main'
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: apps/docs-portal/build
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from commit ${{ github.sha }}"
          enable-commit-comment: true
          enable-pull-request-comment: false
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_DOCS_SITE_ID }}
      
      # Deploy preview (for PRs)
      - name: Deploy Preview
        if: github.event_name == 'pull_request'
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: apps/docs-portal/build
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Preview for PR #${{ github.event.number }}"
          alias: pr-${{ github.event.number }}
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_DOCS_SITE_ID }}
      
      # Update search index
      - name: Update Algolia Search Index
        if: github.ref == 'refs/heads/main'
        run: yarn workspace @va/docs-portal algolia-index
        env:
          ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
          ALGOLIA_ADMIN_KEY: ${{ secrets.ALGOLIA_ADMIN_KEY }}
      
      - name: Notify Slack
        if: github.ref == 'refs/heads/main'
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: |
            📚 Documentation Deployed!
            Site: https://design.va.gov
            Commit: ${{ github.sha }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
```

**Path-based triggers:**
- `apps/docs-portal/**` - Main Docusaurus site
- `teams/**/docs/**` - Team documentation
- `docs/api/**` - API documentation
- `packages/web-components/**` - Components used in docs
- `packages/css-library/**` - Styles used in docs

---

### Pipeline 3: Storybook Deployment

**Purpose:** Deploy component Storybook to separate subdomain

**Trigger:** Changes to Storybook or components

**File:** `.github/workflows/deploy-storybook.yml`

```yaml
name: Deploy Storybook

on:
  push:
    branches: [main]
    paths:
      - 'packages/storybook/**'
      - 'packages/web-components/src/**/*.stories.*'
      - 'packages/web-components/src/components/**'
  
  pull_request:
    paths:
      - 'packages/storybook/**'
      - 'packages/web-components/src/**/*.stories.*'

jobs:
  deploy-storybook:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --immutable
      
      - name: Build web components
        run: yarn workspace @department-of-veterans-affairs/web-components build
      
      - name: Build Storybook
        run: yarn workspace @department-of-veterans-affairs/storybook build-storybook
      
      # Deploy to Netlify subdomain (storybook.design.va.gov)
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: packages/storybook/storybook-static
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_STORYBOOK_SITE_ID }}
        if: github.ref == 'refs/heads/main'
```

**Path-based triggers:**
- `packages/storybook/**` - Storybook configuration
- `packages/web-components/src/**/*.stories.*` - Story files
- `packages/web-components/src/components/**` - Component source

---

### Pipeline 4: Continuous Testing

**Purpose:** Run tests on every PR (fast feedback)

**Trigger:** Any code change in packages/

**File:** `.github/workflows/test.yml`

```yaml
name: Continuous Testing

on:
  pull_request:
    branches: [main]
    paths:
      - 'packages/**'
      - 'apps/**'
  push:
    branches: [main]
    paths:
      - 'packages/**'
      - 'apps/**'

jobs:
  # Job 1: Determine what to test
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      components: ${{ steps.filter.outputs.components }}
      docs: ${{ steps.filter.outputs.docs }}
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            components:
              - 'packages/web-components/**'
              - 'packages/css-library/**'
            docs:
              - 'apps/docs-portal/**'
  
  # Job 2: Test components (if changed)
  test-components:
    needs: detect-changes
    if: needs.detect-changes.outputs.components == 'true'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --immutable
      
      - name: Run component tests
        run: yarn turbo run test --filter='./packages/*'
      
      - name: Run E2E tests
        run: yarn workspace @department-of-veterans-affairs/web-components test.e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: packages/*/test-results/
  
  # Job 3: Test documentation build (if changed)
  test-docs:
    needs: detect-changes
    if: needs.detect-changes.outputs.docs == 'true'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --immutable
      
      - name: Build components (docs dependency)
        run: yarn turbo run build --filter='./packages/*'
      
      - name: Test docs build
        run: yarn workspace @va/docs-portal build
      
      - name: Check for broken links
        run: |
          cd apps/docs-portal
          npx broken-link-checker http://localhost:3000 --recursive --ordered
  
  # Job 4: Lint everything that changed
  lint:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --immutable
      
      - name: Run linting
        run: yarn turbo run lint
      
      - name: Check formatting
        run: yarn prettier --check "**/*.{ts,tsx,js,jsx,json,md}"
```

**Path-based triggers:**
- `packages/**` - Component code
- `apps/**` - Application code

**Key features:**
- Only tests what changed
- Parallel test execution
- Fast feedback (~5-10 minutes)

---

### Pipeline 5: Preview Environments

**Purpose:** Create preview URLs for every PR

**Trigger:** PR creation/update

**File:** `.github/workflows/preview-all.yml`

```yaml
name: Create Preview Environments

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  # Job 1: Check what changed
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      docs: ${{ steps.filter.outputs.docs }}
      storybook: ${{ steps.filter.outputs.storybook }}
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            docs:
              - 'apps/docs-portal/**'
              - 'teams/**/docs/**'
              - 'docs/api/**'
            storybook:
              - 'packages/storybook/**'
              - 'packages/web-components/src/**/*.stories.*'
  
  # Job 2: Deploy docs preview
  preview-docs:
    needs: detect-changes
    if: needs.detect-changes.outputs.docs == 'true'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          cache: 'yarn'
      
      - name: Install and build
        run: |
          yarn install --immutable
          yarn turbo run build --filter=@va/docs-portal...
      
      - name: Deploy Preview
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: apps/docs-portal/build
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Preview for PR #${{ github.event.number }}"
          alias: pr-${{ github.event.number }}-docs
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_DOCS_SITE_ID }}
      
      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `📚 Documentation preview deployed!\n\n🔗 https://pr-${context.issue.number}-docs--va-design-system.netlify.app`
            })
  
  # Job 3: Deploy Storybook preview
  preview-storybook:
    needs: detect-changes
    if: needs.detect-changes.outputs.storybook == 'true'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          cache: 'yarn'
      
      - name: Install and build
        run: |
          yarn install --immutable
          yarn workspace @department-of-veterans-affairs/web-components build
          yarn workspace @department-of-veterans-affairs/storybook build-storybook
      
      - name: Deploy Preview
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: packages/storybook/storybook-static
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Storybook preview for PR #${{ github.event.number }}"
          alias: pr-${{ github.event.number }}-storybook
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_STORYBOOK_SITE_ID }}
      
      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `🎨 Storybook preview deployed!\n\n🔗 https://pr-${context.issue.number}-storybook--va-storybook.netlify.app`
            })
```

**Creates preview URLs like:**
- Docs: `https://pr-123-docs--va-design-system.netlify.app`
- Storybook: `https://pr-123-storybook--va-storybook.netlify.app`

---

## Path-Based Trigger Strategy

### The Problem: Unnecessary Builds

**Without path filters:**
```yaml
on:
  push:
    branches: [main]
```
→ Every push rebuilds EVERYTHING (slow, wasteful)

**With path filters:**
```yaml
on:
  push:
    branches: [main]
    paths:
      - 'packages/web-components/**'
```
→ Only rebuilds when web-components changes (fast, efficient)

### Path Filter Patterns

| Change Location | Triggers | Reason |
|----------------|----------|---------|
| `packages/web-components/` | Components publish + Docs deploy + Storybook deploy | Components affect everything |
| `packages/css-library/` | CSS publish + Docs deploy | Docs use CSS |
| `packages/storybook/` | Storybook deploy only | Self-contained |
| `apps/docs-portal/` | Docs deploy only | Self-contained |
| `teams/*/docs/` | Docs deploy only | Part of docs site |
| `docs/api/` | Docs deploy only | Part of docs site |
| `.github/workflows/` | Nothing (manual trigger) | Don't auto-deploy workflow changes |

### Dependency Graph

```
packages/web-components
  ├─> packages/core (depends on it)
  ├─> packages/storybook (imports components)
  └─> apps/docs-portal (imports components)

packages/css-library
  └─> apps/docs-portal (uses styles)

packages/storybook
  └─> storybook.design.va.gov (deploys here)

apps/docs-portal
  └─> design.va.gov (deploys here)
```

**Smart triggering rule:**
- If `web-components` changes → rebuild web-components, storybook, docs
- If `storybook` changes → rebuild storybook only
- If `docs-portal` changes → rebuild docs only

---

## Turborepo Integration for Speed

### Why Turborepo?

Without Turborepo:
```bash
# Rebuilds everything every time
yarn build  # 60 seconds
```

With Turborepo:
```bash
# Only rebuilds what changed
yarn turbo run build  # 10 seconds (with cache)
```

### Configuration

**turbo.json:**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"],
      "cache": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "cache": true
    },
    "lint": {
      "cache": true,
      "outputs": []
    },
    "deploy": {
      "dependsOn": ["build", "test"],
      "cache": false
    }
  }
}
```

**In CI/CD:**
```yaml
- name: Build with caching
  run: yarn turbo run build --filter=@va/docs-portal...
  env:
    TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
    TURBO_TEAM: ${{ secrets.TURBO_TEAM }}
```

**Benefits:**
- ⚡ 3-5x faster builds
- 💾 Shared cache across CI runs
- 🎯 Only builds dependencies
- 📊 Build insights

---

## Deployment Flow Diagrams

### Component Library Release Flow

```
Developer creates release tag
          ↓
     Workflow triggered
          ↓
    ┌─────────────────┐
    │ Build & Test    │
    │ - web-components│
    │ - css-library   │
    │ - core          │
    └─────────────────┘
          ↓
    Tests pass?
    ├─ Yes → Continue
    └─ No → Fail (notify Slack)
          ↓
    ┌─────────────────┐
    │ Publish to NPM  │
    │ - web-components│
    │ - css-library   │
    │ - core          │
    └─────────────────┘
          ↓
    Create GitHub Release
          ↓
    Notify Slack
          ↓
    🎉 Complete
```

### Documentation Deployment Flow

```
Push to main (or PR)
          ↓
  Check what changed
    ├─ Components? → Build components
    └─ Only docs? → Skip component build
          ↓
    ┌─────────────────┐
    │ Build Docusaurus│
    │ - Gather docs   │
    │ - Generate pages│
    │ - Bundle assets │
    └─────────────────┘
          ↓
      Build successful?
    ├─ Yes → Continue
    └─ No → Fail (comment on PR)
          ↓
    ┌─────────────────┐
    │ Deploy          │
    │ Main: Production│
    │ PR: Preview     │
    └─────────────────┘
          ↓
    Update search index (production only)
          ↓
    Comment preview URL (PR only)
          ↓
    🎉 Complete
```

### PR Preview Flow

```
Pull Request opened/updated
          ↓
    Check what changed
    ├─ Docs? → Create docs preview
    ├─ Storybook? → Create Storybook preview
    └─ Both? → Create both previews
          ↓
    Build changed apps
          ↓
    Deploy to Netlify preview
          ↓
    Post comment with preview URLs
          ↓
    🎉 Preview ready
```

---

## Environment Variables & Secrets

### Required Secrets (GitHub Repository Settings)

**NPM Publishing:**
```
NPM_TOKEN - Token for publishing to NPM registry
```

**Netlify Deployments:**
```
NETLIFY_AUTH_TOKEN - Netlify authentication token
NETLIFY_DOCS_SITE_ID - Site ID for design.va.gov
NETLIFY_STORYBOOK_SITE_ID - Site ID for storybook.design.va.gov
```

**Search:**
```
ALGOLIA_APP_ID - Algolia application ID
ALGOLIA_API_KEY - Algolia search-only API key (public)
ALGOLIA_ADMIN_KEY - Algolia admin key for indexing (secret)
```

**Notifications:**
```
SLACK_WEBHOOK - Webhook URL for Slack notifications
```

**Turborepo (Optional):**
```
TURBO_TOKEN - Vercel Turborepo token for remote caching
TURBO_TEAM - Vercel team ID
```

### Environment Configuration

**Production (main branch):**
```yaml
env:
  NODE_ENV: production
  ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
  ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
  BASE_URL: https://design.va.gov
```

**Preview (PR branches):**
```yaml
env:
  NODE_ENV: development
  BASE_URL: https://pr-${{ github.event.number }}--va-design-system.netlify.app
```

---

## Monitoring & Notifications

### Build Status Dashboard

Create `.github/workflows/status-dashboard.yml`:

```yaml
name: Build Status Dashboard

on:
  workflow_run:
    workflows: 
      - "Publish Component Library"
      - "Deploy Documentation Portal"
      - "Deploy Storybook"
    types:
      - completed

jobs:
  update-dashboard:
    runs-on: ubuntu-latest
    steps:
      - name: Update GitHub Status
        uses: actions/github-script@v7
        with:
          script: |
            const status = context.payload.workflow_run.conclusion;
            const workflow = context.payload.workflow_run.name;
            
            // Post to Slack
            await fetch(process.env.SLACK_WEBHOOK, {
              method: 'POST',
              body: JSON.stringify({
                text: `${status === 'success' ? '✅' : '❌'} ${workflow} ${status}`,
                blocks: [{
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `*${workflow}*\nStatus: ${status}\nBranch: ${context.payload.workflow_run.head_branch}`
                  }
                }]
              })
            });
```

### Slack Notifications

**Success notification:**
```
✅ Deploy Documentation Portal succeeded
Branch: main
Commit: feat: Add new component docs
Duration: 3m 42s
🔗 https://design.va.gov
```

**Failure notification:**
```
❌ Deploy Documentation Portal failed
Branch: main
Commit: fix: Update broken link
Duration: 1m 15s
Error: Build failed at Step 3
🔗 View logs: https://github.com/.../actions/runs/123456
```

### Build Time Monitoring

Track build performance over time:

```yaml
- name: Track build time
  run: |
    echo "build_time=${{ steps.build.duration }}" >> build-metrics.txt
    
- name: Upload metrics
  uses: actions/upload-artifact@v3
  with:
    name: build-metrics
    path: build-metrics.txt
```

Visualize in Grafana or similar dashboard.

---

## Rollback Procedures

### Rollback Component Library

**Option 1: Revert NPM package (fast)**
```bash
# Publish previous version
npm unpublish @department-of-veterans-affairs/component-library@1.2.3
npm publish # Previous version
```

**Option 2: Create hotfix release**
```bash
git checkout v1.2.2  # Last good version
git checkout -b hotfix/revert-breaking-change
# Make fixes
git tag v1.2.4
git push origin v1.2.4
# Triggers release workflow
```

### Rollback Documentation Site

**Option 1: Netlify rollback (instant)**
1. Go to Netlify dashboard
2. Find previous deployment
3. Click "Publish deploy"
→ Site reverts in ~30 seconds

**Option 2: Git revert + redeploy**
```bash
git revert <bad-commit-sha>
git push origin main
# Triggers deploy workflow
# Site updates in ~5 minutes
```

### Rollback Storybook

Same as documentation site rollback.

---

## Performance Benchmarks

### Target Metrics

| Pipeline | Target Time | Current |
|----------|-------------|---------|
| Component tests (PR) | < 5 min | 4m 30s |
| Component publish | < 15 min | 12m 45s |
| Docs deploy (no component changes) | < 3 min | 2m 15s |
| Docs deploy (with component changes) | < 8 min | 7m 30s |
| Storybook deploy | < 5 min | 4m 45s |
| PR preview | < 5 min | 4m 00s |

### Optimization Tips

**1. Parallel Jobs**
```yaml
jobs:
  test-components:
    # ...
  test-docs:
    # ...
  lint:
    # ...
# All run in parallel
```

**2. Selective Dependencies**
```yaml
- name: Install only needed deps
  run: yarn install --immutable --frozen-lockfile
  working-directory: apps/docs-portal
```

**3. Docker Layer Caching**
```yaml
- name: Build with Docker cache
  uses: docker/build-push-action@v5
  with:
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

**4. Turborepo Remote Cache**
```yaml
env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: va-design-system
```
→ Share cache across all CI runs

---

## Common Issues & Solutions

### Issue: Docs deploy triggered by component change takes too long

**Problem:** Rebuilding components on every docs deploy

**Solution:** Use Turborepo caching
```yaml
- name: Build components (cached)
  run: yarn turbo run build --filter=web-components
  # Only rebuilds if components changed
```

### Issue: Multiple teams trigger same workflow

**Problem:** Benefits team push triggers entire docs site rebuild

**Solution:** More granular path filters
```yaml
paths:
  - 'teams/benefits/**'
  # Only redeploy when Benefits docs change
```

### Issue: Preview environments create too many deployments

**Problem:** Every commit creates new preview

**Solution:** Limit preview creation
```yaml
on:
  pull_request:
    types: [opened, synchronize]  # Not on every commit
```

### Issue: Build fails but unclear why

**Problem:** Generic error message

**Solution:** Better error reporting
```yaml
- name: Build with verbose logging
  run: yarn build --verbose
  env:
    DEBUG: '*'
```

---

## Best Practices Summary

### DO ✅

- Use path-based triggers to avoid unnecessary builds
- Cache aggressively (Turborepo, GitHub cache, Docker layers)
- Run tests in parallel
- Create preview environments for visual changes
- Monitor build times
- Notify team of deployment status
- Keep secrets in GitHub Secrets
- Use Turborepo for smart rebuilds

### DON'T ❌

- Rebuild everything on every change
- Run all tests on every file change
- Deploy without tests passing
- Share secrets in code
- Skip path filters (triggers everything)
- Forget to update search index
- Deploy breaking changes without testing

---

## Appendix: Complete Workflow List

**Core Workflows:**
1. `publish-components.yml` - Publish packages to NPM
2. `deploy-docs-portal.yml` - Deploy Docusaurus site
3. `deploy-storybook.yml` - Deploy Storybook
4. `test.yml` - Run tests on PRs
5. `preview-all.yml` - Create preview environments

**Supporting Workflows:**
6. `lint.yml` - Code quality checks
7. `security.yml` - Dependency security scans
8. `status-dashboard.yml` - Build status tracking
9. `stale-issues.yml` - Close stale issues
10. `auto-assign.yml` - Auto-assign issues to teams

**Utility Workflows:**
11. `cache-cleanup.yml` - Clean up old caches
12. `dependency-update.yml` - Automated dependency updates
13. `performance-audit.yml` - Lighthouse CI tests
14. `accessibility-check.yml` - a11y testing

---

## Contact & Support

**CI/CD Issues:** #vfs-platform-support  
**Build Questions:** #platform-design-system  
**Deployment Help:** #design-system-deploys

---

**Document End**

*Keep this document updated as your CI/CD evolves. Share learnings with the team!*
