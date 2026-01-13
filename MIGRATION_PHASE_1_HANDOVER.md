# Developer Handover: Phase 1 - Migrate Design System Documentation into Component Library

**Document Version:** 1.0  
**Date:** January 13, 2026  
**Prepared For:** VA Design System Team  
**Migration Goal:** Consolidate vets-design-system-documentation into component-library repo to create a unified monorepo

---

## Executive Summary

This document provides step-by-step instructions for Phase 1 of migrating the VA Design System documentation site (currently in `vets-design-system-documentation`) into the `component-library` monorepo. Phase 1 focuses on creating the monorepo structure and migrating the documentation site while preserving Git history.

**Estimated Time:** 2-3 days for implementation + 1 week for testing and validation

**Key Deliverables:**
- Monorepo structure in `component-library` with documentation site
- Preserved Git history from both repositories
- Working local development environment
- Updated CI/CD pipelines
- Documentation for the team

---

## Current State Assessment

### component-library Repository

- **Location:** https://github.com/department-of-veterans-affairs/component-library
- **Structure:** Existing Yarn workspace monorepo
- **Package Manager:** Yarn (Berry/v3+)
- **Node Version:** v18.19.0 or v22.x.x (per .nvmrc)
- **Existing Packages:**
  ```
  packages/
  ├── web-components/
  ├── react-components/ (deprecated)
  ├── css-library/
  ├── storybook/
  ├── core/
  ├── design-system-dashboard-cli/
  └── integration-examples/
  ```
- **Build System:** Stencil (web components) + custom scripts
- **CI/CD:** GitHub Actions (`.github/workflows/publish.yml`)
- **Deployment:** NPM packages published on release

### vets-design-system-documentation Repository

- **Location:** https://github.com/department-of-veterans-affairs/vets-design-system-documentation
- **Site URL:** https://design.va.gov
- **Technology:** Jekyll (Ruby 3.3.8) + Node.js tooling
- **Node Version:** v18.19.0
- **Key Dependencies:** 
  - Jekyll static site generator
  - Gulp for build tasks
  - Component library imports for examples
- **Deployment:** GitHub Pages / Netlify
- **Content Location:** `/src` directory
- **Git History:** 7,726 commits (valuable history to preserve)

---

## Phase 1 Goals

✅ **Primary Objectives:**
1. Create unified monorepo structure in `component-library`
2. Migrate documentation site code with full Git history
3. Update build system to support Jekyll + JavaScript monorepo
4. Configure CI/CD for docs site deployment
5. Maintain existing Storybook functionality

🚫 **Out of Scope for Phase 1:**
- API documentation migration
- Team-specific documentation
- Confluence content migration
- Decap CMS integration (Phase 2+)

---

## Prerequisites

Before starting, ensure you have:

### Required Tools
- [x] Git 2.30+ (for `git filter-repo` support)
- [x] Node.js v18.19.0 (use `nvm use 18.19.0`)
- [x] Yarn v3+ (Berry)
- [x] Ruby 3.3.8 (use `rbenv` or `rvm`)
- [x] `git-filter-repo` tool (`brew install git-filter-repo` on macOS)
- [x] Python 3.x (for Jekyll)

### Required Access
- [x] Write access to `component-library` repo
- [x] Read access to `vets-design-system-documentation` repo
- [x] Access to VA Slack channels for coordination

### Backups (CRITICAL)
```bash
# Create safety backups before starting
git clone https://github.com/department-of-veterans-affairs/component-library.git component-library-backup
git clone https://github.com/department-of-veterans-affairs/vets-design-system-documentation.git docs-backup
```

---

## Implementation Steps

### Step 1: Prepare the Component Library Repo (30 minutes)

**1.1 Clone and Set Up Component Library**

```bash
# Clone the component library
cd ~/projects
git clone https://github.com/department-of-veterans-affairs/component-library.git
cd component-library

# Ensure you're on the latest main
git checkout main
git pull origin main

# Verify Node version
nvm use 18.19.0

# Install dependencies
yarn install

# Verify existing build works
yarn build
```

**1.2 Create Feature Branch**

```bash
# Create a branch for this work
git checkout -b feat/migrate-docs-site-phase-1

# Create the apps directory (if it doesn't exist)
mkdir -p apps
```

**Expected Result:** Clean working directory with new `apps/` folder ready for documentation site.

---

### Step 2: Create Temporary Clone for History Manipulation (30 minutes)

**2.1 Clone Documentation Repo into Temporary Location**

```bash
# Create a temp directory for manipulation
cd ~/projects
git clone https://github.com/department-of-veterans-affairs/vets-design-system-documentation.git docs-temp
cd docs-temp
```

**2.2 Use git-filter-repo to Restructure**

This step moves all files into a subdirectory to prepare for merge:

```bash
# Move all files into apps/docs subdirectory
# This preserves full Git history while restructuring
git filter-repo --to-subdirectory-filter apps/docs
```

**⚠️ Warning:** After running `git filter-repo`, the remote will be removed. This is intentional.

**Expected Result:**
```
docs-temp/
└── apps/
    └── docs/
        ├── src/
        ├── package.json
        ├── _config.yml
        └── [all other files]
```

**2.3 Verify History Preservation**

```bash
# Check that history is intact
git log --oneline | head -20

# Should show original commit messages with full history
# Verify file structure
ls -la apps/docs/
```

---

### Step 3: Merge Documentation into Component Library (30 minutes)

**3.1 Add Temporary Repo as Remote**

```bash
# Go back to component library
cd ~/projects/component-library

# Add the temp docs repo as a remote
git remote add docs-temp ~/projects/docs-temp

# Fetch the history
git fetch docs-temp --tags
```

**3.2 Merge the Histories**

```bash
# Merge the docs-temp main branch into your feature branch
# Using --allow-unrelated-histories because these are separate repos
git merge docs-temp/main --allow-unrelated-histories -m "feat: Migrate documentation site into monorepo

- Migrate vets-design-system-documentation into apps/docs/
- Preserve full Git history (7,726 commits)
- Prepare for monorepo build system integration

Part of Phase 1 monorepo migration"
```

**3.3 Clean Up Remote**

```bash
# Remove the temporary remote
git remote remove docs-temp
```

**Expected Result:** `component-library` repo now has `apps/docs/` with full Git history.

**Verify:**
```bash
# Check the merged structure
ls -la apps/docs/

# Verify history from docs repo is present
git log --oneline --all | grep "design.va.gov" | head -10
```

---

### Step 4: Update Workspace Configuration (45 minutes)

**4.1 Update Root package.json**

Add the docs app to the workspaces array:

```json
{
  "name": "@department-of-veterans-affairs/design-system",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "dev": "./setup.sh",
    "dev-windows": "./setup.ps1",
    "build": "yarn workspaces foreach -Apt run build",
    "docs": "yarn workspace @va/docs serve",
    "docs:build": "yarn workspace @va/docs build"
  }
}
```

**4.2 Update apps/docs/package.json**

Add workspace-specific configuration:

```json
{
  "name": "@va/docs",
  "version": "1.0.0",
  "private": true,
  "description": "VA Design System Documentation Site (design.va.gov)",
  "scripts": {
    "serve": "bundle exec jekyll serve --config _config.yml",
    "build": "bundle exec jekyll build --config _config.yml",
    "build:gh-pages": "bundle exec jekyll build --config _config.yml,_config_gh_pages.yml",
    "start:storybook-static": "yarn build:storybook-static && bundle exec jekyll serve --config _config.yml",
    "build:storybook-static": "cd ../storybook && yarn build-storybook && yarn static-storybook-server",
    "gulp": "gulp",
    "update-releases": "rm -rf json_data_cache && bundle exec jekyll serve"
  },
  "dependencies": {
    "@department-of-veterans-affairs/component-library": "workspace:*"
  },
  "devDependencies": {
    "gulp": "^4.0.2"
  }
}
```

**4.3 Verify Workspace Recognition**

```bash
# From monorepo root
yarn workspaces list

# Should show all packages including @va/docs
```

**Expected Output:**
```
@department-of-veterans-affairs/design-system
@department-of-veterans-affairs/web-components
@department-of-veterans-affairs/react-components
@department-of-veterans-affairs/css-library
@department-of-veterans-affairs/core
@department-of-veterans-affairs/storybook
@va/docs
... (other packages)
```

---

### Step 5: Update Documentation Build Configuration (1 hour)

**5.1 Update apps/docs/_config.yml**

Add workspace-aware paths:

```yaml
# Site settings
title: VA Design System
description: Design system for VA.gov
baseurl: "" # For production
url: "https://design.va.gov"

# Build settings
source: src
destination: _site
sass:
  sass_dir: _sass
  style: compressed

# Collections
collections:
  about:
    output: true
    permalink: /about/:path/
  components:
    output: true
    permalink: /components/:path/
  # ... other collections

# Exclude from build
exclude:
  - node_modules
  - package.json
  - yarn.lock
  - Gemfile
  - Gemfile.lock
  - gulpfile.js
  - README.md

# Plugin configuration
plugins:
  - jekyll-feed
  - jekyll-sitemap

# Component library integration
# Point to Storybook in monorepo
storybook_url: "http://localhost:8080"

# GitHub API for releases
github_repos:
  - name: component-library
    url: https://api.github.com/repos/department-of-veterans-affairs/component-library/releases
  - name: site-releases  
    url: https://api.github.com/repos/department-of-veterans-affairs/vets-design-system-documentation/releases
```

**5.2 Create Monorepo-Aware Gulp Configuration**

Update `apps/docs/gulpfile.js` to work with workspace structure:

```javascript
const gulp = require('gulp');
const path = require('path');

// Update paths to work in monorepo
const paths = {
  components: '../../packages/web-components/dist/',
  css: '../../packages/css-library/dist/',
  storybook: '../storybook/storybook-static/'
};

// Copy component files task
gulp.task('copy-components', () => {
  return gulp.src(path.join(paths.components, '**/*'))
    .pipe(gulp.dest('./src/assets/components/'));
});

// Copy CSS files task  
gulp.task('copy-css', () => {
  return gulp.src(path.join(paths.css, '**/*'))
    .pipe(gulp.dest('./src/assets/css/'));
});

// Copy Storybook build
gulp.task('copy-storybook', () => {
  return gulp.src(path.join(paths.storybook, '**/*'))
    .pipe(gulp.dest('./src/assets/storybook/'));
});

gulp.task('default', gulp.series(
  'copy-components',
  'copy-css',
  'copy-storybook'
));
```

**5.3 Update Ruby Dependencies**

Ensure `apps/docs/Gemfile` has required dependencies:

```ruby
source 'https://rubygems.org'

ruby '3.3.8'

gem 'jekyll', '~> 4.3'
gem 'jekyll-feed'
gem 'jekyll-sitemap'
gem 'webrick' # Required for Ruby 3.0+

group :jekyll_plugins do
  gem 'jekyll-get-json'
end
```

**5.4 Install Ruby Dependencies**

```bash
cd apps/docs
bundle install
cd ../..
```

---

### Step 6: Update CI/CD Configuration (1 hour)

**6.1 Create Documentation Deployment Workflow**

Create `.github/workflows/deploy-docs.yml`:

```yaml
name: Deploy Documentation Site

on:
  push:
    branches: [main]
    paths:
      - 'apps/docs/**'
      - 'packages/web-components/**'
      - 'packages/css-library/**'
      - '.github/workflows/deploy-docs.yml'
  pull_request:
    branches: [main]
    paths:
      - 'apps/docs/**'

jobs:
  deploy-docs:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for Jekyll git plugins
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          cache: 'yarn'
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3.8'
          bundler-cache: true
          working-directory: apps/docs
      
      - name: Install workspace dependencies
        run: yarn install --immutable
      
      - name: Build web components
        run: |
          cd packages/web-components
          yarn build
      
      - name: Build CSS library
        run: |
          cd packages/css-library
          yarn build
      
      - name: Build Storybook (static)
        run: |
          cd packages/storybook
          yarn build-storybook
      
      - name: Install Jekyll dependencies
        run: |
          cd apps/docs
          bundle install
      
      - name: Build documentation site
        run: |
          cd apps/docs
          bundle exec jekyll build --config _config.yml,_config_gh_pages.yml
        env:
          JEKYLL_ENV: production
      
      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: apps/docs/_site
          publish_branch: gh-pages
          cname: design.va.gov
```

**6.2 Create Documentation Preview Workflow**

Create `.github/workflows/preview-docs.yml`:

```yaml
name: Preview Documentation

on:
  pull_request:
    paths:
      - 'apps/docs/**'
      - 'packages/web-components/**'
      - 'packages/css-library/**'

jobs:
  preview:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.19.0'
          cache: 'yarn'
      
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3.8'
          bundler-cache: true
          working-directory: apps/docs
      
      - name: Build and preview
        run: |
          yarn install
          cd packages/web-components && yarn build && cd ../..
          cd packages/css-library && yarn build && cd ../..
          cd apps/docs
          bundle exec jekyll build
      
      - name: Deploy preview to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: apps/docs/_site
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from PR ${{ github.event.number }}"
          alias: pr-${{ github.event.number }}
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

**6.3 Update Existing Publish Workflow**

Modify `.github/workflows/publish.yml` to skip docs on component releases:

```yaml
# Add to existing workflow
jobs:
  publish:
    runs-on: ubuntu-latest
    # Only run if changes are in packages/, not apps/
    if: |
      !contains(github.event.head_commit.message, '[docs only]') &&
      (contains(github.event.head_commit.modified, 'packages/'))
    # ... rest of existing workflow
```

---

### Step 7: Update Development Scripts (30 minutes)

**7.1 Update Root-Level Setup Script**

Modify `setup.sh` to include docs site setup:

```bash
#!/bin/bash

echo "🚀 VA Design System Monorepo Setup"
echo "=================================="

# Check Node version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "Using Node.js $NODE_VERSION"

# Check Ruby version (for docs)
echo "💎 Checking Ruby version..."
RUBY_VERSION=$(ruby -v)
echo "Using $RUBY_VERSION"

# Install root dependencies
echo "📥 Installing workspace dependencies..."
yarn install

# Build web components
echo "🔧 Building web components..."
cd packages/web-components
yarn build
yarn build-bindings
cd ../..

# Build CSS library
echo "🎨 Building CSS library..."
cd packages/css-library
yarn build
cd ../..

# Build core package
echo "📦 Building core package..."
cd packages/core
yarn build
cd ../..

# Build Storybook
echo "📚 Building Storybook..."
cd packages/storybook
yarn build-storybook
cd ../..

# Setup docs site
echo "📖 Setting up documentation site..."
cd apps/docs
bundle install
echo "✅ Documentation site ready!"
echo "Run 'yarn docs' to start the docs server"
cd ../..

# Start Storybook dev server
echo "🎭 Starting Storybook..."
cd packages/storybook
yarn storybook

# Note: In a separate terminal, run 'yarn docs' to start Jekyll
```

**7.2 Create Helper Scripts**

Add to root `package.json`:

```json
{
  "scripts": {
    "dev": "./setup.sh",
    "dev-windows": "./setup.ps1",
    "docs": "yarn workspace @va/docs serve",
    "docs:build": "yarn workspace @va/docs build",
    "storybook": "yarn workspace @va/storybook storybook",
    "build:all": "yarn workspaces foreach -Apt run build"
  }
}
```

---

### Step 8: Testing and Validation (2-3 hours)

**8.1 Test Local Development**

```bash
# From monorepo root
yarn install

# Build all packages
yarn build:all

# In terminal 1: Start Storybook
yarn storybook

# In terminal 2: Start Jekyll docs
yarn docs

# Verify:
# - Storybook: http://localhost:6006
# - Docs: http://localhost:4000
```

**Validation Checklist:**
- [ ] Storybook loads and shows all components
- [ ] Documentation site builds without errors
- [ ] Component examples render correctly in docs
- [ ] Internal links work
- [ ] Images and assets load
- [ ] Search functionality works (if applicable)
- [ ] CSS styling is correct

**8.2 Test Workspace Dependencies**

```bash
# Verify component library is accessible from docs
cd apps/docs
yarn info @department-of-veterans-affairs/component-library

# Should show workspace:* resolution
```

**8.3 Test Git History Preservation**

```bash
# Verify docs repo history is intact
git log --oneline --all | grep -i "design.va.gov"

# Check specific file history from docs repo
git log --follow apps/docs/src/_about/whats-new.md

# Should show original commit history
```

**8.4 Test CI/CD**

1. Push feature branch to GitHub
2. Create draft PR to trigger preview workflow
3. Verify preview deployment succeeds
4. Check preview URL works

---

## Rollback Plan

If migration issues arise, follow this rollback procedure:

**Immediate Rollback (< 1 hour after merge):**

```bash
# If on feature branch, simply discard
git checkout main
git branch -D feat/migrate-docs-site-phase-1

# If merged to main, revert the merge commit
git revert -m 1 <merge-commit-sha>
git push origin main
```

**Documentation Site Emergency:**

```bash
# Temporarily redeploy original docs repo
cd ~/projects/docs-backup
git pull origin main

# Trigger deployment manually if needed
# (Depends on your deployment setup)
```

**Complete Reset:**

```bash
# Restore from backups
rm -rf component-library
cp -r component-library-backup component-library
cd component-library
git remote set-url origin https://github.com/department-of-veterans-affairs/component-library.git
```

---

## Post-Migration Tasks

### Immediate (Day 1)
- [ ] Update README.md in component-library
- [ ] Create migration announcement in Slack
- [ ] Update bookmarks and documentation links
- [ ] Archive old docs repo (mark as read-only)

### Short-term (Week 1)
- [ ] Monitor deployment pipelines
- [ ] Gather team feedback
- [ ] Document any issues encountered
- [ ] Update team onboarding docs

### Medium-term (Week 2-4)
- [ ] Update external documentation references
- [ ] Redirect old GitHub Pages to new location
- [ ] Clean up unused dependencies
- [ ] Performance optimization

---

## Common Issues and Solutions

### Issue: Jekyll Build Fails with "Cannot find module"

**Solution:**
```bash
cd apps/docs
bundle install
yarn install
```

### Issue: Component Library Not Found in Docs

**Solution:**
```bash
# Rebuild component library
cd packages/web-components
yarn build
cd ../../apps/docs
```

### Issue: Storybook Iframe Not Loading

**Solution:**
Check `apps/docs/_config.yml`:
```yaml
storybook_url: "http://localhost:8080"  # Should match Storybook port
```

### Issue: Git History Missing

**Solution:**
If history wasn't preserved, re-run migration with `--fetch-depth=0` in checkout:
```yaml
# In GitHub Actions
- uses: actions/checkout@v4
  with:
    fetch-depth: 0  # Full history
```

### Issue: Yarn Workspace Not Recognized

**Solution:**
```bash
# Clear Yarn cache
yarn cache clean

# Remove node_modules and reinstall
rm -rf node_modules
yarn install
```

---

## Documentation Updates Required

After migration, update the following documentation:

1. **Component Library README**
   - Add section about docs site location
   - Update local development instructions
   - Document monorepo structure

2. **Documentation Site About Page**
   - Update "Contributing" section with new repo location
   - Update links to source code

3. **Team Wiki / Confluence**
   - Update developer onboarding docs
   - Update deployment procedures
   - Update troubleshooting guides

4. **External Links**
   - Update links in va.gov codebase
   - Update links in other VA repos
   - Update links in team documentation

---

## Success Criteria

Phase 1 is considered complete when:

✅ **Technical:**
- [ ] Documentation site builds successfully in monorepo
- [ ] All tests pass in CI
- [ ] Preview deployments work for PRs
- [ ] Production deployment to design.va.gov succeeds
- [ ] Git history preserved (verified with git log)
- [ ] No broken links or missing assets

✅ **Operational:**
- [ ] Team can run `yarn install && yarn dev` to start development
- [ ] Deployment pipeline is documented and tested
- [ ] Rollback procedure is documented and tested
- [ ] Team members trained on new workflow

✅ **Quality:**
- [ ] Site performance is same or better
- [ ] All existing functionality works
- [ ] SEO is maintained (URLs unchanged)
- [ ] No accessibility regressions

---

## Next Steps (Phase 2+)

After Phase 1 is stable:

1. **Add Docusaurus Integration** (if using Docusaurus + Decap CMS)
   - Set up Docusaurus in parallel with Jekyll
   - Configure Decap CMS for visual editing
   - Migrate content progressively

2. **Add Multi-Instance Docs** (for API docs, team docs)
   - Configure multiple doc sources
   - Set up team-specific folders with CODEOWNERS

3. **Performance Optimization**
   - Implement build caching
   - Optimize Storybook iframe embedding
   - Add Turborepo for faster builds

---

## Contact and Support

**Primary Contact:** [Your Name]  
**Team Slack Channel:** #platform-design-system  
**Support Channel:** #vfs-platform-support  

**Questions During Migration:**
- Post in #platform-design-system
- Tag @design-system-team for urgent issues

**Post-Migration Issues:**
- Create issue in component-library repo with label `docs-migration`
- Include steps to reproduce and logs

---

## Appendix A: File Structure After Migration

```
component-library/
├── .github/
│   └── workflows/
│       ├── publish.yml              # Component library publishing
│       ├── deploy-docs.yml          # NEW: Docs deployment
│       └── preview-docs.yml         # NEW: Docs preview
├── apps/
│   └── docs/                        # NEW: Documentation site
│       ├── src/                     # Jekyll source files
│       ├── _config.yml              # Jekyll configuration
│       ├── package.json             # Docs workspace package
│       ├── Gemfile                  # Ruby dependencies
│       └── gulpfile.js              # Build tasks
├── packages/
│   ├── web-components/              # Existing
│   ├── css-library/                 # Existing
│   ├── storybook/                   # Existing
│   └── core/                        # Existing
├── package.json                     # UPDATED: New scripts
├── README.md                        # UPDATED: New instructions
└── yarn.lock                        # UPDATED: New dependencies
```

## Appendix B: Command Reference

**Development:**
```bash
yarn install          # Install all workspace dependencies
yarn dev              # Run full development setup
yarn docs             # Start Jekyll docs server only
yarn storybook        # Start Storybook only
yarn build:all        # Build all packages
```

**Docs-specific:**
```bash
cd apps/docs
bundle install        # Install Ruby dependencies
bundle exec jekyll serve    # Start Jekyll server
bundle exec jekyll build    # Build static site
```

**Testing:**
```bash
yarn workspaces foreach run test    # Run all tests
yarn workspace @va/docs test        # Run docs tests only
```

---

## Appendix C: Key Configuration Files

**Root package.json** - Workspace configuration  
**apps/docs/package.json** - Docs package configuration  
**apps/docs/_config.yml** - Jekyll configuration  
**.github/workflows/deploy-docs.yml** - Docs deployment  
**apps/docs/Gemfile** - Ruby dependencies  

---

**Document End**

*This handover document should be updated as you progress through the migration. Add notes about issues encountered and solutions found for future reference.*
