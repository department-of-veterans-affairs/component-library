# Developer Handover: Phase 3 - Scale Team Adoption & System Optimization

**Document Version:** 1.0  
**Date:** January 13, 2026  
**Prepared For:** VA Design System Team  
**Phase 3 Goal:** Scale from pilot to production-ready multi-team documentation platform

---

## Executive Summary

Phase 3 transforms your working Docusaurus + Decap CMS prototype into a production-scale documentation platform that serves 10+ teams. This phase focuses on operational excellence, self-service workflows, and performance optimization.

**Estimated Time:** 6-8 weeks
- Weeks 1-2: Self-service team onboarding automation
- Weeks 3-4: API documentation migration + Confluence migration strategy
- Weeks 5-6: Performance optimization (Turborepo, caching, CDN)
- Weeks 7-8: Advanced features (versioning, analytics, monitoring)

**Key Deliverables:**
- Self-service team onboarding workflow
- API documentation integrated into monorepo
- Confluence migration playbook + tooling
- Turborepo build optimization (3-5x faster builds)
- Analytics and monitoring dashboard
- Documentation for 10+ teams

---

## Phase 1 & 2 Recap - What You Built

✅ **Phase 1 Completed:**
- Monorepo structure with design system docs
- Jekyll documentation site migrated
- Git history preserved
- CI/CD pipelines working

✅ **Phase 2 Completed:**
- Docusaurus + Decap CMS integrated
- Multi-instance documentation configured
- Pilot team (Benefits) successfully onboarded
- Visual editing interface at /admin
- Editorial workflow (draft/review/publish)

**Current State:**
```
component-library/
├── apps/
│   ├── docs/              # Jekyll (legacy)
│   └── docs-portal/       # Docusaurus + Decap CMS
├── packages/
│   ├── web-components/
│   ├── css-library/
│   └── storybook/
└── teams/
    └── benefits/          # Pilot team docs
        ├── docs/
        └── CODEOWNERS
```

---

## Phase 3 Goals

### 1. Scale Team Onboarding (Operational Goal)

**Current:** Manual onboarding, 1 team (Benefits)  
**Target:** Self-service onboarding, 10+ teams

- Automated team folder creation
- Template documentation sets
- Self-service CMS access
- Onboarding tracking dashboard

### 2. Migrate API Documentation (Content Goal)

**Current:** API docs scattered across repositories  
**Target:** Unified API docs in monorepo with auto-generation

- Migrate existing API documentation
- Set up OpenAPI/Swagger integration
- Auto-generate API reference docs
- Link API docs to design system components

### 3. Confluence Migration Strategy (Content Goal)

**Current:** Technical docs in Confluence, unclear migration path  
**Target:** Clear playbook + tools for migrating Confluence → Git

- Confluence export scripts
- Content transformation pipeline
- URL redirect mapping
- Hybrid strategy (what stays, what moves)

### 4. Performance Optimization (Technical Goal)

**Current:** Standard build times, no caching  
**Target:** 3-5x faster builds, sub-second deploys

- Implement Turborepo
- Configure build caching
- Optimize bundle sizes
- CDN configuration for static assets

### 5. Advanced Features (Product Goal)

**Current:** Basic documentation platform  
**Target:** Production-grade with versioning, analytics, monitoring

- Documentation versioning
- Usage analytics
- Uptime monitoring
- Advanced search features

---

## Implementation Roadmap

### Week 1-2: Self-Service Team Onboarding

#### Goal: Any team can onboard themselves in < 30 minutes

**1.1 Create Team Onboarding Script**

Create `scripts/onboard-team.sh`:

```bash
#!/bin/bash

# VA Design System - Team Onboarding Script
# Usage: ./scripts/onboard-team.sh <team-name> <team-email> <github-team>

set -e

TEAM_NAME=$1
TEAM_EMAIL=$2
GITHUB_TEAM=$3

if [ -z "$TEAM_NAME" ] || [ -z "$TEAM_EMAIL" ] || [ -z "$GITHUB_TEAM" ]; then
    echo "Usage: ./scripts/onboard-team.sh <team-name> <team-email> <github-team>"
    echo "Example: ./scripts/onboard-team.sh claims claims-team@va.gov @department-of-veterans-affairs/claims-team"
    exit 1
fi

echo "🚀 Onboarding team: $TEAM_NAME"
echo "================================"

# 1. Create team directory structure
echo "📁 Creating team directory structure..."
mkdir -p "teams/${TEAM_NAME}/docs"/{overview,architecture,runbooks,api}

# 2. Create initial documentation from templates
echo "📝 Creating documentation from templates..."
cat > "teams/${TEAM_NAME}/docs/overview.md" << EOF
---
title: ${TEAM_NAME^} Team Overview
sidebar_label: Overview
team: ${TEAM_NAME}
---

# ${TEAM_NAME^} Team Documentation

Welcome to the ${TEAM_NAME^} team documentation.

## What We Do

[Describe what your team builds and maintains]

## Team Members

- Product Owner: [Name]
- Tech Lead: [Name]
- Engineers: [Names]

## Key Applications

- [Application 1]: [Description]
- [Application 2]: [Description]

## Getting Started

- [Link to setup guide]
- [Link to architecture docs]
- [Link to team Slack channel]
EOF

# 3. Create architecture documentation template
cat > "teams/${TEAM_NAME}/docs/architecture/system-overview.md" << EOF
---
title: System Architecture
category: Architecture
team: ${TEAM_NAME}
---

# ${TEAM_NAME^} System Architecture

## Overview

[High-level description of your system]

## Components

### Frontend
- [Technology stack]
- [Key libraries]

### Backend
- [Technology stack]
- [APIs and services]

### Infrastructure
- [Deployment platform]
- [Key services]

## Architecture Diagram

[Add diagram here]

## Data Flow

[Describe how data moves through the system]
EOF

# 4. Create runbook template
cat > "teams/${TEAM_NAME}/docs/runbooks/deployment.md" << EOF
---
title: Deployment Runbook
category: Runbooks
team: ${TEAM_NAME}
---

# Deployment Runbook

## Prerequisites

- [ ] [Prerequisite 1]
- [ ] [Prerequisite 2]

## Deployment Steps

### 1. Pre-deployment

\`\`\`bash
# Commands here
\`\`\`

### 2. Deployment

\`\`\`bash
# Commands here
\`\`\`

### 3. Post-deployment Verification

- [ ] Check application health
- [ ] Verify key functionality
- [ ] Monitor error rates

## Rollback Procedure

\`\`\`bash
# Rollback commands
\`\`\`
EOF

# 5. Create CODEOWNERS file
echo "🔐 Setting up code ownership..."
cat > "teams/${TEAM_NAME}/CODEOWNERS" << EOF
# ${TEAM_NAME^} Team owns all docs in this directory
* ${GITHUB_TEAM}
EOF

# 6. Update Docusaurus configuration
echo "⚙️  Updating Docusaurus configuration..."

# This would typically be done manually or with a Node.js script
# For now, output instructions

cat << EOF

✅ Team structure created successfully!

📋 Next Steps:

1. Update Docusaurus Configuration:
   
   Edit apps/docs-portal/docusaurus.config.ts and add:

   {
     id: 'team-${TEAM_NAME}',
     path: '../../teams/${TEAM_NAME}/docs',
     routeBasePath: 'teams/${TEAM_NAME}',
     sidebarPath: './sidebars-${TEAM_NAME}.ts',
   }

2. Create Sidebar Configuration:
   
   Create apps/docs-portal/sidebars-${TEAM_NAME}.ts

3. Update Decap CMS Configuration:
   
   Edit apps/docs-portal/static/admin/config.yml and add:

   - name: team-${TEAM_NAME}
     label: "${TEAM_NAME^} Team Docs"
     folder: "teams/${TEAM_NAME}/docs"
     filter: {field: "team", value: "${TEAM_NAME}"}

4. Invite Team Members to CMS:
   
   Go to Netlify Identity dashboard and invite:
   ${TEAM_EMAIL}

5. Commit and Push:
   
   git checkout -b onboard-team-${TEAM_NAME}
   git add teams/${TEAM_NAME}
   git commit -m "feat: Onboard ${TEAM_NAME} team"
   git push origin onboard-team-${TEAM_NAME}

6. Create Pull Request and notify team!

EOF

echo "🎉 Onboarding script complete!"
```

Make script executable:
```bash
chmod +x scripts/onboard-team.sh
```

**1.2 Create Automated Configuration Updates**

Create `scripts/update-docusaurus-config.js`:

```javascript
#!/usr/bin/env node

/**
 * Automatically update Docusaurus config for new team
 * Usage: node scripts/update-docusaurus-config.js <team-name>
 */

const fs = require('fs');
const path = require('path');

const teamName = process.argv[2];

if (!teamName) {
  console.error('Usage: node scripts/update-docusaurus-config.js <team-name>');
  process.exit(1);
}

console.log(`📝 Updating Docusaurus config for team: ${teamName}`);

const configPath = path.join(__dirname, '../apps/docs-portal/docusaurus.config.ts');
let config = fs.readFileSync(configPath, 'utf8');

// Add plugin configuration
const pluginConfig = `
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'team-${teamName}',
        path: '../../teams/${teamName}/docs',
        routeBasePath: 'teams/${teamName}',
        sidebarPath: './sidebars-${teamName}.ts',
        editUrl: 'https://github.com/department-of-veterans-affairs/component-library/tree/main/teams/${teamName}/',
      },
    ],`;

// Insert before the closing bracket of plugins array
config = config.replace(/\n  \],\n\n  themeConfig:/, `${pluginConfig}\n  ],\n\n  themeConfig:`);

fs.writeFileSync(configPath, config);

// Create sidebar configuration
const sidebarConfig = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  ${teamName}Sidebar: [
    'overview',
    {
      type: 'category',
      label: 'Architecture',
      items: ['architecture/system-overview'],
    },
    {
      type: 'category',
      label: 'Runbooks',
      items: ['runbooks/deployment'],
    },
  ],
};

export default sidebars;
`;

const sidebarPath = path.join(__dirname, `../apps/docs-portal/sidebars-${teamName}.ts`);
fs.writeFileSync(sidebarPath, sidebarConfig);

// Update navbar dropdown
const navbarUpdate = `
            {
              label: '${teamName.charAt(0).toUpperCase() + teamName.slice(1)}',
              to: '/teams/${teamName}/overview',
            },`;

config = config.replace(
  /(\/\/ Add more teams as they onboard)/,
  `$1${navbarUpdate}`
);

fs.writeFileSync(configPath, config);

console.log('✅ Docusaurus config updated!');
console.log('✅ Sidebar config created!');
console.log('\n📋 Next steps:');
console.log('1. Update Decap CMS config manually');
console.log('2. Test the changes locally');
console.log('3. Commit and push');
```

Make executable:
```bash
chmod +x scripts/update-docusaurus-config.js
```

**1.3 Create Team Onboarding Dashboard**

Create `apps/docs-portal/src/pages/teams.tsx`:

```tsx
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

interface Team {
  name: string;
  description: string;
  docsPath: string;
  contact: string;
  status: 'active' | 'onboarding' | 'planned';
}

const teams: Team[] = [
  {
    name: 'Benefits',
    description: 'Veterans Benefits applications and services',
    docsPath: '/teams/benefits/overview',
    contact: 'benefits-team@va.gov',
    status: 'active',
  },
  {
    name: 'Claims',
    description: 'Claims processing and management',
    docsPath: '/teams/claims/overview',
    contact: 'claims-team@va.gov',
    status: 'onboarding',
  },
  // Add more teams as they onboard
];

export default function Teams() {
  const activeTeams = teams.filter(t => t.status === 'active');
  const onboardingTeams = teams.filter(t => t.status === 'onboarding');

  return (
    <Layout title="Team Documentation" description="Documentation by VA product teams">
      <div className="container margin-vert--lg">
        <h1>Team Documentation</h1>
        <p className="hero__subtitle">
          Technical documentation maintained by VA product teams
        </p>

        <div className="margin-vert--lg">
          <h2>Active Teams ({activeTeams.length})</h2>
          <div className="row">
            {activeTeams.map((team) => (
              <div key={team.name} className="col col--4 margin-bottom--lg">
                <div className="card">
                  <div className="card__header">
                    <h3>{team.name}</h3>
                  </div>
                  <div className="card__body">
                    <p>{team.description}</p>
                    <p><strong>Contact:</strong> {team.contact}</p>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--primary button--block"
                      to={team.docsPath}>
                      View Docs
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {onboardingTeams.length > 0 && (
          <div className="margin-vert--lg">
            <h2>Coming Soon ({onboardingTeams.length})</h2>
            <div className="row">
              {onboardingTeams.map((team) => (
                <div key={team.name} className="col col--4 margin-bottom--lg">
                  <div className="card">
                    <div className="card__header">
                      <h3>{team.name}</h3>
                      <span className="badge badge--warning">Onboarding</span>
                    </div>
                    <div className="card__body">
                      <p>{team.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="margin-vert--xl">
          <div className="card">
            <div className="card__header">
              <h2>Want to Add Your Team's Documentation?</h2>
            </div>
            <div className="card__body">
              <p>
                Adding your team's technical documentation to the VA Design System documentation
                platform is easy. You'll get:
              </p>
              <ul>
                <li>Visual editing interface (no Git required)</li>
                <li>Unified search across all VA documentation</li>
                <li>Version control and approval workflows</li>
                <li>Your team controls access with CODEOWNERS</li>
              </ul>
              <p>
                <strong>Time to onboard:</strong> ~30 minutes
              </p>
            </div>
            <div className="card__footer">
              <Link
                className="button button--primary"
                to="/docs/guides/onboard-your-team">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
```

**1.4 Create Self-Service Onboarding Guide**

Create `apps/docs-portal/docs/guides/onboard-your-team.md`:

```markdown
---
title: Onboard Your Team
sidebar_label: Team Onboarding
---

# Onboard Your Team to VA Docs

## Overview

This guide will help you add your team's technical documentation to the VA Design System documentation platform in about 30 minutes.

## Prerequisites

- [ ] GitHub account with access to component-library repo
- [ ] Team lead approval
- [ ] Identified documentation to migrate (optional)

## Step 1: Run Onboarding Script (5 min)

Clone the repository and run the onboarding script:

```bash
git clone https://github.com/department-of-veterans-affairs/component-library.git
cd component-library

# Run onboarding script
./scripts/onboard-team.sh your-team-name team-email@va.gov @github-team
```

This creates:
- Team folder structure in `teams/your-team-name/`
- Template documentation files
- CODEOWNERS file

## Step 2: Update Configuration (10 min)

Run the configuration update script:

```bash
node scripts/update-docusaurus-config.js your-team-name
```

This updates:
- Docusaurus plugin configuration
- Navigation menu
- Sidebar configuration

## Step 3: Request CMS Access (5 min)

Post in #platform-design-system Slack:

> "Hi! We'd like to onboard the [Team Name] team to the VA docs platform.
> Please invite these team members to Decap CMS:
> - name@va.gov
> - name@va.gov"

You'll receive invitation emails within 1 business day.

## Step 4: Add Content (15 min)

### Option A: Use the CMS (Recommended for most users)

1. Go to https://design.va.gov/admin
2. Log in with your VA email
3. Click "New [Your Team] Page"
4. Fill in the content
5. Click "Save"

### Option B: Edit in Git (For technical users)

```bash
cd teams/your-team-name/docs

# Edit files
vim overview.md

# Commit and push
git add .
git commit -m "docs: Update team overview"
git push origin main
```

## Step 5: Set Up CODEOWNERS (5 min)

Update `teams/your-team-name/CODEOWNERS`:

```
# Your Team owns all docs in this directory
* @department-of-veterans-affairs/your-team
```

This ensures only your team can approve changes to your docs.

## Step 6: Publish! (2 min)

Create a pull request with your changes:

```bash
git checkout -b onboard-your-team
git add teams/your-team-name
git commit -m "feat: Onboard Your Team documentation"
git push origin onboard-your-team
```

A team member will review and merge!

## What You Get

✅ **Visual Editing Interface**
- Create and edit pages through web interface
- No Git knowledge required
- Preview before publishing

✅ **Search Integration**
- Your docs appear in site-wide search
- Algolia-powered relevance

✅ **Team Autonomy**
- Your team controls access
- Your team approves changes
- Deploy independently

✅ **Professional Infrastructure**
- Automatic deployments
- Preview environments for PRs
- Version control

## Support

- **Slack:** #platform-design-system
- **Office Hours:** Tuesdays 2-3pm ET
- **Issues:** https://github.com/department-of-veterans-affairs/component-library/issues

## FAQ

**Q: Can we keep some docs in Confluence?**  
A: Yes! You don't have to migrate everything. We recommend moving technical docs (architecture, runbooks, APIs) to Git, and keeping meeting notes and project planning in Confluence.

**Q: Who can edit our docs?**  
A: Anyone you invite to the CMS can create drafts. Your team (via CODEOWNERS) approves what gets published.

**Q: What if we want to remove our docs later?**  
A: No problem. Create a PR that removes your team folder.

**Q: Can we customize the look of our doc section?**  
A: Not yet, but it's on the roadmap! For now, all docs share the same theme for consistency.
```

---

### Week 3-4: API Documentation Migration

#### Goal: Unified API documentation with auto-generation from OpenAPI specs

**2.1 Set Up API Documentation Structure**

```bash
# Create API docs folder
mkdir -p docs/api/{getting-started,reference,guides}

# Create getting started page
cat > docs/api/getting-started.md << 'EOF'
---
title: API Getting Started
sidebar_label: Getting Started
---

# VA API Documentation

## Overview

The VA provides APIs for integrating with various VA systems and services.

## Available APIs

- **Benefits API**: Access veteran benefits information
- **Facilities API**: Find VA facilities and services
- **Forms API**: Submit and track VA forms
- **Health API**: Access veteran health records (with authorization)

## Authentication

All API requests require authentication using OAuth 2.0...

EOF
```

**2.2 Install Docusaurus OpenAPI Plugin**

```bash
cd apps/docs-portal
yarn add docusaurus-plugin-openapi-docs docusaurus-theme-openapi-docs
```

**2.3 Configure OpenAPI Integration**

Update `apps/docs-portal/docusaurus.config.ts`:

```typescript
import type {Config} from '@docusaurus/types';

const config: Config = {
  // ... existing config

  plugins: [
    // ... existing plugins
    
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api-docs',
        docsPluginId: 'api', // Must match the docs plugin id
        config: {
          benefits: {
            specPath: '../../packages/api-specs/benefits-api.yaml',
            outputDir: '../../docs/api/reference/benefits',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
            },
          },
          facilities: {
            specPath: '../../packages/api-specs/facilities-api.yaml',
            outputDir: '../../docs/api/reference/facilities',
          },
        },
      },
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  // ... rest of config
};
```

**2.4 Create API Specification Files**

Create `packages/api-specs/benefits-api.yaml`:

```yaml
openapi: 3.0.0
info:
  title: VA Benefits API
  version: 1.0.0
  description: Access veteran benefits information

servers:
  - url: https://api.va.gov/services/benefits/v1
    description: Production

paths:
  /benefits:
    get:
      summary: List available benefits
      tags:
        - Benefits
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Benefit'

components:
  schemas:
    Benefit:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        description:
          type: string
        eligibility:
          type: array
          items:
            type: string

  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key

security:
  - ApiKeyAuth: []
```

**2.5 Generate API Documentation**

```bash
cd apps/docs-portal

# Generate docs from OpenAPI specs
yarn docusaurus gen-api-docs all

# Verify generated files
ls -la ../../docs/api/reference/

# Build to test
yarn build
```

**2.6 Create API Usage Examples**

Create `docs/api/guides/making-requests.md`:

```mdx
---
title: Making API Requests
sidebar_label: Making Requests
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Making API Requests

## Authentication

All requests require an API key in the header:

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  https://api.va.gov/services/benefits/v1/benefits
```

## Example Requests

<Tabs>
  <TabItem value="curl" label="cURL">
    ```bash
    curl -X GET \
      -H "X-API-Key: YOUR_API_KEY" \
      -H "Content-Type: application/json" \
      https://api.va.gov/services/benefits/v1/benefits
    ```
  </TabItem>
  
  <TabItem value="javascript" label="JavaScript">
    ```javascript
    const response = await fetch('https://api.va.gov/services/benefits/v1/benefits', {
      headers: {
        'X-API-Key': 'YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    ```
  </TabItem>
  
  <TabItem value="python" label="Python">
    ```python
    import requests
    
    headers = {
        'X-API-Key': 'YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(
        'https://api.va.gov/services/benefits/v1/benefits',
        headers=headers
    )
    print(response.json())
    ```
  </TabItem>
</Tabs>

## Response Format

```json
{
  "data": [
    {
      "id": "education",
      "name": "Education Benefits",
      "description": "Benefits for education and training",
      "eligibility": ["veteran", "dependent"]
    }
  ]
}
```
```

---

### Week 5-6: Performance Optimization with Turborepo

#### Goal: 3-5x faster builds, intelligent caching

**3.1 Install Turborepo**

```bash
cd ~/projects/component-library

# Install Turborepo
yarn add -D turbo

# Create Turborepo configuration
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**", ".next/**", "_site/**"],
      "env": ["NODE_ENV"]
    },
    "web-components#build": {
      "outputs": [
        "dist/**",
        "loader/**"
      ],
      "env": ["NODE_ENV"]
    },
    "docs-portal#build": {
      "dependsOn": ["^build"],
      "outputs": ["build/**"],
      "env": ["NODE_ENV", "ALGOLIA_APP_ID", "ALGOLIA_API_KEY"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts", "test/**/*.tsx"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
EOF
```

**3.2 Update Package Scripts**

Update root `package.json`:

```json
{
  "scripts": {
    "build": "turbo run build",
    "build:force": "turbo run build --force",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "dev": "turbo run dev --parallel",
    "clean": "turbo run clean && rm -rf node_modules"
  }
}
```

**3.3 Configure Caching Strategy**

Create `.turbo/config.json`:

```json
{
  "teamId": "team_va_design_system",
  "apiUrl": "https://vercel.com/api",
  "remoteCache": {
    "signature": true
  }
}
```

**3.4 Set Up Remote Caching (Optional)**

For remote caching across CI and team members:

```bash
# Link to Vercel (free for open source)
npx turbo login
npx turbo link

# Or configure custom remote cache
# See: https://turbo.build/repo/docs/core-concepts/remote-caching
```

**3.5 Optimize CI/CD with Turborepo**

Update `.github/workflows/deploy-docusaurus.yml`:

```yaml
name: Deploy Docusaurus Portal

on:
  push:
    branches: [main]
    paths:
      - 'apps/docs-portal/**'
      - 'teams/**/docs/**'
      - 'docs/api/**'
      - 'packages/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 2  # For Turborepo changed detection
      
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
      
      - name: Build with Turborepo
        run: yarn turbo run build --filter=docs-portal...
        env:
          NODE_ENV: production
          TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
          TURBO_TEAM: ${{ secrets.TURBO_TEAM }}
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: apps/docs-portal/build
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

**3.6 Measure Performance Improvements**

Create `scripts/benchmark.sh`:

```bash
#!/bin/bash

echo "🏃 Running build benchmarks..."

# Clean build (no cache)
echo "1. Clean build (no cache)..."
rm -rf .turbo
time yarn turbo run build --force > /dev/null 2>&1

# Cached build (everything cached)
echo "2. Cached build (everything cached)..."
time yarn turbo run build > /dev/null 2>&1

# Partial build (change one file)
echo "3. Partial build (one file changed)..."
touch apps/docs-portal/docs/intro.md
time yarn turbo run build > /dev/null 2>&1

echo "✅ Benchmark complete!"
```

Expected improvements:
- Clean build: ~60-90 seconds
- Cached build: ~3-5 seconds
- Partial build: ~10-15 seconds

---

### Week 7-8: Advanced Features

**4.1 Documentation Versioning**

Enable versioning in Docusaurus:

```bash
cd apps/docs-portal

# Create first version
yarn docusaurus docs:version 1.0

# This creates:
# - versioned_docs/version-1.0/
# - versions.json
```

Update `docusaurus.config.ts`:

```typescript
const config: Config = {
  presets: [
    [
      'classic',
      {
        docs: {
          // ... existing config
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Next',
              path: 'next',
            },
            '1.0': {
              label: '1.0.0',
              path: '',  // Default version at /docs
            },
          },
        },
      },
    ],
  ],
};
```

**4.2 Analytics Integration**

Add Google Analytics and custom events:

```typescript
// In docusaurus.config.ts
const config: Config = {
  // ... existing config
  
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-XXXXXXXXXX',
        anonymizeIP: true,
      },
    ],
  ],
};
```

Create custom analytics tracking:

```typescript
// apps/docs-portal/src/theme/DocItem/index.tsx
import React, {useEffect} from 'react';
import DocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props) {
  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: window.location.pathname,
        page_title: props.content.metadata.title,
      });
    }
  }, [props.content.metadata.title]);

  return <DocItem {...props} />;
}
```

**4.3 Uptime Monitoring**

Set up monitoring with Better Uptime or similar:

```yaml
# .github/workflows/monitor.yml
name: Monitor Documentation Site

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - name: Check site availability
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://design.va.gov)
          if [ $response -ne 200 ]; then
            echo "Site is down! Status code: $response"
            exit 1
          fi
          echo "Site is up! Status code: $response"
      
      - name: Check API docs
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://design.va.gov/api/getting-started)
          if [ $response -ne 200 ]; then
            echo "API docs are down! Status code: $response"
            exit 1
          fi
      
      - name: Notify on failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: '🚨 Documentation site is down!'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

**4.4 Search Improvements**

Configure Algolia DocSearch:

```typescript
// In docusaurus.config.ts
const config: Config = {
  themeConfig: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: 'va-design-system',
      
      // Optional: Advanced config
      contextualSearch: true,
      searchParameters: {
        facetFilters: ['language:en', ['team:benefits', 'team:claims']],
      },
      
      // Optional: Path to search config
      searchPagePath: 'search',
    },
  },
};
```

Create custom search page for multi-team filtering:

```tsx
// apps/docs-portal/src/pages/search.tsx
import React, {useState} from 'react';
import Layout from '@theme/Layout';
import {DocSearch} from '@docsearch/react';

export default function SearchPage() {
  const [teamFilter, setTeamFilter] = useState('all');

  return (
    <Layout title="Search" description="Search VA documentation">
      <div className="container margin-vert--lg">
        <h1>Search Documentation</h1>
        
        <div className="margin-vert--md">
          <label>Filter by team: </label>
          <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
            <option value="all">All Teams</option>
            <option value="benefits">Benefits</option>
            <option value="claims">Claims</option>
            <option value="health">Health</option>
          </select>
        </div>

        <DocSearch
          appId={process.env.ALGOLIA_APP_ID}
          apiKey={process.env.ALGOLIA_API_KEY}
          indexName="va-design-system"
          searchParameters={{
            facetFilters: teamFilter !== 'all' ? [`team:${teamFilter}`] : [],
          }}
        />
      </div>
    </Layout>
  );
}
```

---

## Confluence Migration Strategy

### Hybrid Approach (Recommended)

**Move to Git:**
- Technical runbooks
- Architecture documentation
- API references
- Deployment procedures
- Code standards

**Keep in Confluence:**
- Meeting notes
- Project planning
- Stakeholder communications
- Brainstorming sessions
- Non-technical team updates

### Migration Tools

**Option 1: Confluence Export Script**

Create `scripts/migrate-from-confluence.py`:

```python
#!/usr/bin/env python3
"""
Migrate Confluence pages to Markdown
Usage: python scripts/migrate-from-confluence.py <space-key> <output-dir>
"""

import os
import sys
import requests
from bs4 import BeautifulSoup
import markdownify

CONFLUENCE_URL = os.getenv('CONFLUENCE_URL', 'https://va.atlassian.net/wiki')
CONFLUENCE_USER = os.getenv('CONFLUENCE_USER')
CONFLUENCE_API_TOKEN = os.getenv('CONFLUENCE_API_TOKEN')

def get_space_pages(space_key):
    """Fetch all pages in a Confluence space"""
    url = f"{CONFLUENCE_URL}/rest/api/content"
    params = {
        'spaceKey': space_key,
        'expand': 'body.storage,version',
        'limit': 100
    }
    
    auth = (CONFLUENCE_USER, CONFLUENCE_API_TOKEN)
    response = requests.get(url, params=params, auth=auth)
    response.raise_for_status()
    
    return response.json()['results']

def convert_to_markdown(html_content):
    """Convert Confluence HTML to Markdown"""
    # Clean up Confluence-specific HTML
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove Confluence macros that don't translate well
    for macro in soup.find_all('ac:structured-macro'):
        macro.decompose()
    
    # Convert to markdown
    markdown = markdownify.markdownify(
        str(soup),
        heading_style='ATX',
        bullets='-'
    )
    
    return markdown

def save_page(page, output_dir):
    """Save page as markdown file"""
    title = page['title']
    content = page['body']['storage']['value']
    
    # Convert to markdown
    markdown = convert_to_markdown(content)
    
    # Create frontmatter
    frontmatter = f"""---
title: {title}
confluence_id: {page['id']}
last_updated: {page['version']['when']}
---

"""
    
    # Sanitize filename
    filename = title.lower().replace(' ', '-').replace('/', '-')
    filename = f"{filename}.md"
    
    # Write file
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w') as f:
        f.write(frontmatter + markdown)
    
    print(f"✅ Saved: {filepath}")

def main():
    if len(sys.argv) < 3:
        print("Usage: python migrate-from-confluence.py <space-key> <output-dir>")
        sys.exit(1)
    
    space_key = sys.argv[1]
    output_dir = sys.argv[2]
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"📥 Fetching pages from Confluence space: {space_key}")
    pages = get_space_pages(space_key)
    
    print(f"📝 Found {len(pages)} pages")
    for page in pages:
        save_page(page, output_dir)
    
    print(f"✅ Migration complete! {len(pages)} pages saved to {output_dir}")

if __name__ == '__main__':
    main()
```

**Usage:**

```bash
# Set credentials
export CONFLUENCE_URL="https://va.atlassian.net/wiki"
export CONFLUENCE_USER="your-email@va.gov"
export CONFLUENCE_API_TOKEN="your-token"

# Migrate a space
python scripts/migrate-from-confluence.py BENEFITS teams/benefits/docs

# Review and clean up the generated files
cd teams/benefits/docs
ls -la
```

**Option 2: Junction (Write in Git, Auto-publish to Confluence)**

If teams want to keep Confluence as a "view" layer:

```bash
# Install Junction
npm install -g @huridge/junction

# Configure
junction init

# Sync docs to Confluence
junction sync teams/benefits/docs --space BENEFITS
```

---

## Success Metrics Dashboard

Create `apps/docs-portal/src/pages/metrics.tsx`:

```tsx
import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';

interface Metrics {
  totalTeams: number;
  totalPages: number;
  weeklyEdits: number;
  searchQueries: number;
  avgBuildTime: number;
}

export default function MetricsDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    // Fetch metrics from API
    fetch('/api/metrics')
      .then(res => res.json())
      .then(data => setMetrics(data));
  }, []);

  if (!metrics) return <div>Loading...</div>;

  return (
    <Layout title="Metrics" description="Platform metrics">
      <div className="container margin-vert--lg">
        <h1>Documentation Platform Metrics</h1>

        <div className="row margin-vert--lg">
          <div className="col col--3">
            <div className="card">
              <div className="card__header">
                <h2>{metrics.totalTeams}</h2>
              </div>
              <div className="card__body">
                <p>Active Teams</p>
              </div>
            </div>
          </div>

          <div className="col col--3">
            <div className="card">
              <div className="card__header">
                <h2>{metrics.totalPages}</h2>
              </div>
              <div className="card__body">
                <p>Total Pages</p>
              </div>
            </div>
          </div>

          <div className="col col--3">
            <div className="card">
              <div className="card__header">
                <h2>{metrics.weeklyEdits}</h2>
              </div>
              <div className="card__body">
                <p>Edits This Week</p>
              </div>
            </div>
          </div>

          <div className="col col--3">
            <div className="card">
              <div className="card__header">
                <h2>{metrics.avgBuildTime}s</h2>
              </div>
              <div className="card__body">
                <p>Avg Build Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add charts here using recharts or similar */}
      </div>
    </Layout>
  );
}
```

---

## Rollback Plan

**If Major Issues in Phase 3:**

1. **Disable new team onboarding** - Stop onboarding until issues resolved
2. **Revert Turborepo** - Remove if causing build issues
3. **Rollback API docs** - Keep API docs in separate repo if integration issues
4. **Keep existing teams** - Don't force migration if not working well

---

## Training Program

### For New Teams

**Week 1: Kickoff**
- Overview presentation (30 min)
- Live demo of CMS (30 min)
- Q&A (15 min)

**Week 2: Hands-on**
- Create first page exercise
- Add images and formatting
- Review and publish workflow

**Week 3: Advanced**
- Using MDX components
- API documentation (if applicable)
- Git workflow (optional)

**Week 4: Go-Live**
- Migrate priority content
- Team becomes "live"
- Ongoing support

### Training Materials

1. **Video Series:**
   - "Welcome to VA Docs Platform" (5 min)
   - "Creating Your First Page" (10 min)
   - "Editorial Workflow" (8 min)
   - "Advanced Features" (15 min)

2. **Written Guides:**
   - Quick start guide (1 page)
   - CMS user manual (5 pages)
   - Git workflow guide (3 pages)
   - Troubleshooting guide (2 pages)

3. **Templates:**
   - Architecture doc template
   - Runbook template
   - API reference template
   - Team overview template

---

## Phase 4 Preview

After Phase 3, consider:

1. **Component Documentation Auto-generation**
   - Extract prop types from source
   - Auto-generate component docs
   - Link to Storybook examples

2. **Multi-language Support (i18n)**
   - Spanish documentation
   - Tagalog (if needed)
   - Language switcher

3. **Advanced Workflows**
   - Scheduled publishing
   - Content review cycles
   - Deprecation warnings

4. **Integration with Development Tools**
   - VS Code extension for editing
   - CLI for bulk operations
   - Webhook integrations

---

## Appendix: Week-by-Week Checklist

### Week 1-2: Team Onboarding
- [ ] Create onboarding scripts
- [ ] Test with 2-3 pilot teams
- [ ] Create self-service guide
- [ ] Set up team dashboard
- [ ] Document process

### Week 3-4: API Documentation
- [ ] Install OpenAPI plugin
- [ ] Create API spec files
- [ ] Generate API docs
- [ ] Create usage examples
- [ ] Test and iterate

### Week 5-6: Turborepo
- [ ] Install and configure Turborepo
- [ ] Update all build scripts
- [ ] Configure caching
- [ ] Update CI/CD
- [ ] Benchmark improvements

### Week 7-8: Advanced Features
- [ ] Set up versioning
- [ ] Configure analytics
- [ ] Set up monitoring
- [ ] Improve search
- [ ] Create metrics dashboard

---

## Success Criteria

Phase 3 is complete when:

✅ **Operational:**
- [ ] 10+ teams successfully onboarded
- [ ] Self-service onboarding works
- [ ] < 30 minutes to onboard a team
- [ ] Teams can operate independently

✅ **Technical:**
- [ ] Build times reduced 3-5x
- [ ] API docs integrated
- [ ] Turborepo caching working
- [ ] All tests passing

✅ **Content:**
- [ ] API documentation migrated
- [ ] Confluence migration playbook tested
- [ ] 50+ pages of team documentation
- [ ] Zero broken links

✅ **User Experience:**
- [ ] Team satisfaction > 4/5
- [ ] Documentation findable via search
- [ ] Page load times < 2 seconds
- [ ] Uptime > 99.9%

---

## Contact and Support

**Phase 3 Lead:** [Your Name]  
**Slack:** #platform-design-system  
**Office Hours:** Tuesdays 2-3pm ET, Thursdays 10-11am ET

---

**Document End**

*This is a living document. Update as Phase 3 progresses and share learnings with the team.*
