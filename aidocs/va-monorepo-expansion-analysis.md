# VA Design System Monorepo: Expanding to Multiple Sites and Team Documentation

## Executive Summary

**Yes, you can absolutely consolidate the component library, design system documentation, VA API site, and even team documentation into a single monorepo while maintaining team autonomy and component library accessibility.** This is not only technically feasible—it's the exact pattern that Spotify, Microsoft, Google, and other large organizations have successfully implemented.

The key insight: **a monorepo is a repository structure, not an organizational structure.** Teams can maintain independent ownership, deployment schedules, and documentation while sharing common infrastructure and the component library.

---

## The Expanded Vision: What You're Proposing

Based on your question, you're considering consolidating:

1. **Component library** (current: department-of-veterans-affairs/component-library)
2. **Design system documentation** (current: department-of-veterans-affairs/vets-design-system-documentation)
3. **VA API documentation site** (assuming a separate repo currently)
4. **Individual team documentation** (currently in Confluence)

All while ensuring that every application can continue using the component library.

**The short answer**: This structure is not only possible, it's increasingly common in large-scale development organizations.

---

## Real-World Example: Spotify's Monorepo Documentation Strategy

Spotify faced this exact challenge with their large-scale codebases and solved it with a pattern that's directly applicable to your scenario. They documented their approach in ["Solving documentation for monoliths and monorepos"](https://engineering.atspotify.com/2019/10/solving-documentation-for-monoliths-and-monorepos) (2019).

### Spotify's Solution: Multiple docs/ Folders with Team Ownership

**The Problem They Solved:**
- Large codebase with multiple teams
- Each team owns different parts of the monorepo
- Different teams need different documentation structures
- Documentation should live close to the code it describes

**Their Architectural Decisions:**
1. **Multiple `mkdocs.yml` files** - Each team/component gets its own MkDocs configuration
2. **Multiple `docs/` folders** - Documentation lives in the same directory as the code it describes
3. **GitHub Codeowners** - Each team maintains ownership of their documentation folder
4. **Single consolidated output** - All documentation merges into one documentation site
5. **Folder-level build capability** - Teams can run `mkdocs serve` on just their folder during development

**Technical Implementation:**
They created the [mkdocs-monorepo-plugin](https://github.com/backstage/mkdocs-monorepo-plugin) which enables:
- Building multiple sets of documentation in a single MkDocs project
- Each subdirectory can have its own `mkdocs.yml` and `docs/` folder
- Navigation is merged automatically into a unified sidebar
- Teams maintain independence while contributing to a single site

### Example Structure from Spotify

```
monorepo/
├── mkdocs.yml                          # Root configuration
├── docs/
│   ├── index.md                        # Main landing page
│   └── getting-started.md
├── design-system/
│   ├── mkdocs.yml                      # Design system team owns this
│   ├── docs/
│   │   ├── components.md
│   │   └── guidelines.md
│   └── packages/
│       └── component-library/
├── api-platform/
│   ├── mkdocs.yml                      # API team owns this
│   ├── docs/
│   │   ├── authentication.md
│   │   └── endpoints.md
│   └── src/
└── benefits-team/
    ├── mkdocs.yml                      # Benefits team owns this
    ├── docs/
    │   ├── architecture.md
    │   └── runbook.md
    └── services/
```

Root `mkdocs.yml` uses the `!include` syntax:

```yaml
site_name: VA Documentation
nav:
  - Home: 'index.md'
  - Design System: '!include ./design-system/mkdocs.yml'
  - API Platform: '!include ./api-platform/mkdocs.yml'
  - Teams:
      - Benefits: '!include ./benefits-team/mkdocs.yml'
plugins:
  - monorepo
```

**The Result:** 
- Each team can develop and preview their docs independently
- The full site compiles all documentation into one unified portal
- Teams maintain full control over their navigation and structure
- All documentation is versioned with the code

---

## Recommended Monorepo Structure for VA

Here's how your VA monorepo could be structured to accommodate all these sites while maintaining team autonomy:

```
va-design-system-monorepo/
├── apps/
│   ├── design-system-docs/         # Main design system documentation site
│   │   ├── mkdocs.yml
│   │   ├── docs/
│   │   └── package.json
│   ├── api-docs/                    # VA API documentation site
│   │   ├── mkdocs.yml
│   │   ├── docs/
│   │   └── package.json
│   ├── storybook/                   # Shared Storybook for all components
│   │   └── package.json
│   └── developer-portal/            # Optional: Backstage-based portal
│       └── package.json
│
├── packages/
│   ├── components/                  # Web components/React components
│   │   ├── src/
│   │   ├── docs/                    # Component-specific technical docs
│   │   └── package.json
│   ├── design-tokens/               # Design tokens package
│   │   └── package.json
│   └── themes/                      # Theme configurations
│       └── package.json
│
├── teams/                           # Team-specific documentation
│   ├── benefits/
│   │   ├── mkdocs.yml
│   │   ├── docs/
│   │   │   ├── architecture.md
│   │   │   ├── runbooks.md
│   │   │   └── team-guidelines.md
│   │   └── CODEOWNERS              # Benefits team owns this folder
│   ├── claims/
│   │   ├── mkdocs.yml
│   │   ├── docs/
│   │   └── CODEOWNERS
│   └── healthcare/
│       ├── mkdocs.yml
│       ├── docs/
│       └── CODEOWNERS
│
├── docs/                            # Root-level org documentation
│   ├── index.md                     # Main landing page
│   ├── getting-started.md
│   └── contributing.md
│
├── mkdocs.yml                       # Root MkDocs config that includes all others
├── turbo.json                       # Turborepo configuration
├── pnpm-workspace.yaml              # Workspace configuration
└── package.json                     # Root package.json
```

### Key Architectural Principles

**1. Clear Separation of Concerns**
- `apps/` - Deployed applications (documentation sites, Storybook)
- `packages/` - Shared libraries (component library, tokens, themes)
- `teams/` - Team-owned documentation that isn't part of the main docs site

**2. Team Autonomy via CODEOWNERS**
Each team folder contains a `CODEOWNERS` file:

```
# teams/benefits/CODEOWNERS
* @va/benefits-team-leads
/docs/** @va/benefits-tech-writers
```

This ensures:
- Only the benefits team can approve changes to their documentation
- Pull requests automatically request review from the right people
- Team boundaries are enforced by GitHub

**3. Shared Component Library Accessibility**

All apps and team documentation can use the component library via workspace dependencies:

```json
// apps/api-docs/package.json
{
  "name": "@va/api-docs",
  "dependencies": {
    "@va/components": "workspace:*",
    "@va/design-tokens": "workspace:*"
  }
}
```

The `workspace:*` protocol (supported by pnpm, Yarn, and npm workspaces) means:
- Always uses the local version during development
- No need to publish to npm for internal consumption
- Changes to the component library are immediately available to all apps

---

## Component Library Usage Across the Monorepo

### How Each Application Consumes Components

**Design System Documentation Site:**
```javascript
// apps/design-system-docs/src/components/ComponentDemo.jsx
import { Button, Alert, Card } from '@va/components';

export function ComponentDemo() {
  return (
    <div>
      <Button variant="primary">Example Button</Button>
      <Alert type="info">This is a live component example</Alert>
    </div>
  );
}
```

**VA API Documentation Site:**
```javascript
// apps/api-docs/src/layouts/DocsLayout.jsx
import { Header, Navigation, Footer } from '@va/components';

export function DocsLayout({ children }) {
  return (
    <>
      <Header logo={vaLogo} />
      <Navigation items={apiNavItems} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

**Team Documentation (Benefits Team):**
```markdown
<!-- teams/benefits/docs/dashboard-screenshot.md -->
# Benefits Dashboard

Our dashboard uses the VADS card component:

<ComponentPreview component="Card" variant="bordered" />

## Implementation Details
...
```

**Independent Team Application:**
If a team maintains their own application *outside* the monorepo, they can still use the published component library:

```json
// separate-repo/benefits-application/package.json
{
  "dependencies": {
    "@department-of-veterans-affairs/component-library": "^2.4.0"
  }
}
```

### Build Strategy: Atomic Changes

The monorepo enables **atomic commits across components and documentation**:

1. Developer updates `Button` component to add a new variant
2. In the *same commit*:
   - Updates design system docs to document the new variant
   - Updates Storybook stories to show examples
   - Updates any consuming applications
3. Single PR, single review, single deploy

This eliminates the multi-repo coordination problem where:
- Component library ships v2.5.0 with new features
- Docs site is out of sync until someone manually updates it
- Teams discover features weeks later when they happen to upgrade

---

## Confluence vs. Git-Based Documentation: Decision Matrix

### Should You Migrate Team Docs from Confluence?

This is a nuanced decision that depends on your organization's needs. Here's a framework:

| Factor | Keep in Confluence | Migrate to Git/Monorepo |
|--------|-------------------|-------------------------|
| **Target audience** | Mixed technical/non-technical | Primarily developers/technical |
| **Update frequency** | Ad-hoc, irregular | Frequent, tied to code changes |
| **Collaboration model** | WYSIWYG editing, comments | PR-based reviews, diffs |
| **Discoverability** | Good for non-technical users | Better for developers (lives with code) |
| **Integration needs** | Standalone content | Needs to reference code/components |
| **Team comfort** | Team prefers Confluence UI | Team comfortable with markdown/Git |
| **Version control** | Version history exists but limited | Full Git history, blame, bisect |
| **Search** | Confluence search is quite good | Depends on docs platform |

### Hybrid Approach: Best of Both Worlds

You don't have to choose all-or-nothing. Consider:

**Migrate to Git:**
- Technical runbooks and incident response procedures
- Architecture decision records (ADRs)
- API documentation
- Component usage guidelines
- Deployment procedures
- Development environment setup

**Keep in Confluence:**
- Team meeting notes
- Project planning documents
- Stakeholder communications
- Design exploration/brainstorming
- Non-technical team documentation
- Cross-org policy documents

### Tooling for Confluence Integration

If you want to keep some content in Confluence but still have it accessible from your Git-based docs:

**1. Junction** ([GitHub](https://github.com/HUU/Junction))
- Lets you write documentation in Git (markdown) and automatically publish to Confluence
- Maintains bi-directional sync
- Use case: Write docs in the monorepo, publish to Confluence for broader visibility

```bash
# Write docs in Git
echo "# Benefits API" > teams/benefits/docs/api.md

# Automatically syncs to Confluence
junction sync --space BENEFITS
```

**2. Git for Confluence** (Atlassian Marketplace)
- Embeds Git repository content directly into Confluence pages
- Use case: Keep docs in Git but make them visible in Confluence for non-technical stakeholders

**3. Confluence Markdown Export Scripts**
- Various open-source tools can export Confluence spaces to markdown
- Use case: One-time migration from Confluence to Git
- Examples: [confluence-to-github](https://github.com/sjones4/confluence-to-github)

---

## Multiple Documentation Sites: Deployment Strategies

### Option 1: Unified Documentation Portal (Recommended)

**All documentation consolidated into one site with multiple sections:**

```
https://developer.va.gov/
├── /design-system/
│   ├── components/
│   └── guidelines/
├── /api/
│   ├── authentication/
│   └── endpoints/
└── /teams/
    ├── benefits/
    ├── claims/
    └── healthcare/
```

**Pros:**
- Single search experience across all documentation
- Consistent navigation and design
- Unified deployment pipeline
- Easier for developers to discover related content

**Cons:**
- All content under one domain (may have implications for access control)
- Requires coordination on site-level changes

**Implementation:** Use mkdocs-monorepo-plugin to merge all documentation.

---

### Option 2: Multiple Independent Sites

**Separate deployments with cross-linking:**

```
https://design.va.gov/         # Design system docs
https://developer.va.gov/      # API documentation
https://benefits.docs.va.gov/  # Benefits team docs (private)
https://claims.docs.va.gov/    # Claims team docs (private)
```

**Pros:**
- Teams maintain full independence
- Different access controls per site
- Can use different documentation frameworks if needed
- Independent deployment schedules

**Cons:**
- No unified search
- Developers must remember multiple URLs
- More infrastructure to maintain

**Implementation:** Each `apps/` folder deploys to its own subdomain.

---

### Option 3: Backstage Developer Portal (Advanced)

**Use Backstage as a unified portal that aggregates all documentation:**

[Backstage](https://backstage.io/) is an open-source developer portal created by Spotify (and used by Netflix, American Airlines, and others). It provides:

- **Software Catalog:** Centralized inventory of all services, libraries, and documentation
- **TechDocs:** Automatically generates and displays documentation from markdown
- **Plugin Ecosystem:** Integrates with GitHub, CI/CD, monitoring tools, etc.

**How it works for your scenario:**

```
va-design-system-monorepo/
├── apps/
│   └── backstage/                   # Backstage instance
│       └── catalog-info.yaml        # Defines what Backstage tracks
├── packages/
│   └── components/
│       ├── catalog-info.yaml        # Component library entity
│       └── docs/                    # TechDocs markdown
└── teams/
    └── benefits/
        ├── catalog-info.yaml        # Benefits team entity
        └── docs/                    # Team docs
```

Each `catalog-info.yaml` describes an entity in Backstage:

```yaml
# packages/components/catalog-info.yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: va-component-library
  description: VA Design System Component Library
  annotations:
    backstage.io/techdocs-ref: dir:.
spec:
  type: library
  owner: design-system-team
  lifecycle: production
```

**Backstage Benefits for Multi-Team Monorepo:**
- Automatic documentation rendering from markdown
- Each team maintains their own `catalog-info.yaml` and docs
- Search across all documentation
- Shows dependencies between components and teams
- Integrates with CI/CD to show build status
- Can display API specifications (OpenAPI/Swagger)

**Backstage with mkdocs-monorepo-plugin:**
Backstage's TechDocs includes the mkdocs-monorepo-plugin, so it natively supports the multi-docs pattern Spotify uses.

**When to Consider Backstage:**
- You have 10+ teams contributing to the monorepo
- You want a "single pane of glass" for all developer resources
- You need to track dependencies across services/components
- Your organization values discoverability and onboarding

**When to Skip Backstage:**
- Smaller team (< 5 teams)
- Documentation is the only need (Backstage is a full developer portal)
- Prefer simpler tooling

---

## Migration Path: From Multi-Repo to Consolidated Monorepo

### Phase 1: Foundation (Week 1-2)

**Goal:** Create the monorepo structure and migrate component library + design system docs

1. **Create the monorepo in the component-library repo**
   ```bash
   cd component-library/
   mkdir -p apps packages
   ```

2. **Migrate design system docs using `git subtree`**
   - Preserves full Git history
   - Commands documented [here](https://developers.netlify.com/guides/migrating-git-from-multirepo-to-monorepo-without-losing-history/)

3. **Configure workspace manager** (pnpm/Yarn/npm)
   ```yaml
   # pnpm-workspace.yaml
   packages:
     - 'apps/*'
     - 'packages/*'
     - 'teams/*'
   ```

4. **Set up Turborepo for build orchestration**
   ```json
   // turbo.json
   {
     "pipeline": {
       "build": {
         "dependsOn": ["^build"],
         "outputs": ["dist/**"]
       },
       "docs:build": {
         "dependsOn": ["^build"]
       }
     }
   }
   ```

5. **Consolidate CI/CD**
   - Migrate both repos' CI pipelines into one
   - Use path filters to only build/test changed apps

### Phase 2: Add API Documentation (Week 3)

1. **Migrate VA API documentation site into `apps/api-docs/`**
2. **Configure to use component library**
3. **Set up deployment pipeline for api-docs**

### Phase 3: Add Team Documentation (Week 4-8)

**Don't migrate everything at once.** Instead, run a pilot:

1. **Choose a pilot team** (ideally one that already uses Markdown in Confluence or is technical)
2. **Create `teams/pilot-team/` structure**
3. **Migrate their most critical documentation** (runbooks, architecture docs)
4. **Set up CODEOWNERS** for team ownership
5. **Gather feedback** and refine the structure
6. **Expand to other teams** gradually

### Phase 4: Unified Documentation Site (Optional, Week 9-10)

If you want a single unified docs portal:

1. **Install mkdocs-monorepo-plugin**
2. **Create root `mkdocs.yml` that includes all sub-docs**
3. **Configure navigation structure**
4. **Deploy unified site**

---

## Maintaining Team Autonomy in the Monorepo

### Governance Structure

**Central Platform Team Owns:**
- Root-level configuration (turbo.json, workspace config)
- Component library (packages/components)
- Design tokens and themes
- Build pipeline and deployment infrastructure
- Documentation platform (mkdocs/Backstage)

**Individual Teams Own:**
- Their folder in `teams/`
- Their documentation content and structure
- Their mkdocs.yml navigation
- Their deployment cadence (if separate sites)

### Enforcement Mechanisms

**1. GitHub CODEOWNERS**
```
# Root CODEOWNERS file
/packages/components/ @va/design-system-team
/apps/design-system-docs/ @va/design-system-team
/apps/api-docs/ @va/api-platform-team
/teams/benefits/ @va/benefits-team
/teams/claims/ @va/claims-team
```

**2. GitHub Branch Protection Rules**
- Require CODEOWNERS approval for PRs
- Require CI to pass before merge
- Prevent force pushes to main

**3. Separate Deployment Pipelines**
Each team can deploy their docs independently:

```yaml
# .github/workflows/deploy-benefits-docs.yml
name: Deploy Benefits Team Docs
on:
  push:
    branches: [main]
    paths:
      - 'teams/benefits/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build benefits docs
        run: |
          cd teams/benefits
          mkdocs build
      - name: Deploy to Netlify
        run: netlify deploy --prod --dir=teams/benefits/site
```

---

## Pros and Cons: Expanded Monorepo

### Advantages

**For the Design System Team:**
- Single source of truth for component library
- Atomic updates across components and documentation
- Easier to enforce design token usage
- Simplified version management

**For Product Teams:**
- Always have access to latest component library in development
- Can contribute improvements via PRs
- Clear visibility into component changes
- Documentation lives with the code

**For the Organization:**
- Unified developer experience across all documentation
- Easier onboarding (one repo to clone)
- Shared CI/CD infrastructure
- Cross-team discoverability
- Enables better search across all VA technical content

### Challenges

**Technical Challenges:**
- **Repository size** - Can grow large, but modern tooling (Git LFS, sparse checkout) mitigates this
- **Build times** - Mitigated by Turborepo's caching and affected-only builds
- **CI complexity** - Requires sophisticated path-based filtering

**Organizational Challenges:**
- **Change management** - Teams need to adapt to new workflows
- **Access control** - Everyone can see all code (but CODEOWNERS controls changes)
- **Cultural shift** - Some teams may resist moving from Confluence
- **Learning curve** - Teams need to learn Git/markdown if coming from Confluence

**Governance Challenges:**
- **Directory structure evolution** - How to reorganize as teams change
- **Naming conventions** - Need consistency across team folders
- **Documentation standards** - Who enforces quality standards?

### Mitigation Strategies

**For Technical Challenges:**
- Use Turborepo for build optimization
- Implement path filters in CI to only build what changed
- Use sparse checkout for developers who only need certain folders

**For Organizational Challenges:**
- Start with a pilot team before full migration
- Provide training and templates for markdown documentation
- Create a "docs-as-code" guide
- Maintain hybrid approach (some content can stay in Confluence)

**For Governance Challenges:**
- Establish a "design system council" with representatives from each team
- Document decision-making process for structural changes
- Create documentation standards and linting rules
- Regular retrospectives to adapt the structure

---

## Alternative: Polyrepo with Strategic Consolidation

If full monorepo consolidation feels too ambitious, consider **strategic consolidation** of related repos:

**Monorepo 1: Design System**
- Component library
- Design system documentation
- Storybook

**Monorepo 2: Developer Documentation**
- API documentation
- Developer guides
- Integration examples

**Separate Repos: Team Documentation**
- Each team maintains their own docs repo
- Published to a shared documentation platform (Backstage, Docusaurus, etc.)

This gives you:
- Most benefits of monorepo for design system
- Team independence for documentation
- Lower organizational disruption

---

## Recommended Path Forward

Based on the research and industry patterns, here's my recommendation:

### Immediate Action (Next 2 Weeks)

1. **Consolidate component library + design system docs** into a monorepo
2. **Solve the Storybook iframe issue** using one of the approaches from the original research
3. **Set up Turborepo** for build orchestration
4. **Create the `/teams` folder structure** but leave it empty for now

### Medium-Term (Next 1-3 Months)

1. **Migrate VA API documentation** into `apps/api-docs/`
2. **Run a pilot** with one team to migrate their technical documentation from Confluence to `teams/pilot-team/`
3. **Evaluate pilot results** - gather feedback, measure adoption, identify pain points

### Long-Term (3-6 Months)

1. **Gradually migrate other team docs** based on pilot learnings
2. **Consider Backstage** if the organization would benefit from a unified developer portal
3. **Establish documentation governance** - standards, review process, quality metrics

### DON'T Do All at Once

- Don't migrate all team docs immediately
- Don't force teams to leave Confluence if it's working for them
- Don't try to standardize everything in the first iteration

---

## Final Thoughts

**Yes, you can consolidate all these repos and make the component library available to all applications.** The monorepo structure is the mechanism, not the goal. The goal is:

- Easier maintenance
- Better developer experience
- Atomic changes across related code
- Shared infrastructure and tooling

The success of this consolidation depends more on organizational buy-in and change management than on technical feasibility. Start small, prove value with a pilot, and expand gradually based on what you learn.

The fact that Spotify, Microsoft, Google, and other large organizations have successfully implemented this pattern with thousands of engineers shows it's not just feasible—it can be transformative for large-scale engineering organizations.

**The component library question has a simple answer:** Yes, absolutely. Via workspace dependencies, every application in the monorepo (and applications outside it via npm publication) can consume the component library. This is one of the biggest advantages of the monorepo approach.
