# Docusaurus + Decap CMS vs MkDocs for VA Design System Monorepo

## TL;DR: Use Docusaurus + Decap CMS

**You should absolutely use your existing Docusaurus + Decap CMS prototype.** The combination of Docusaurus's multi-doc capabilities + Decap CMS's user-friendly interface makes it a **superior choice to MkDocs** for replacing Confluence, especially for non-technical team members.

The fact that you've already built a prototype means you're past the steepest learning curve, and Decap CMS solves the biggest weakness of git-based documentation: accessibility for non-developers.

---

## Why Docusaurus + Decap CMS is Better for Your Use Case

### 1. Decap CMS Solves the "Confluence Replacement" Problem

**This is the killer feature that MkDocs doesn't have out of the box.**

Decap CMS provides a **WYSIWYG web interface** (`/admin` route) where non-technical users can:
- Edit markdown files through a visual editor
- Create new documentation pages via forms
- Upload images through drag-and-drop
- Preview changes before publishing
- All without touching Git, command line, or markdown syntax

**Real-world impact:**
- Design team members can update design guidelines without developer help
- Technical writers can manage content independently
- Product managers can document requirements directly
- Each team can maintain their own docs without Git training

**MkDocs equivalent:** Doesn't exist. You'd need to build custom tooling or train everyone on Git + Markdown, which defeats the purpose of replacing Confluence.

### 2. Docusaurus Natively Supports Multiple Documentation Instances

Docusaurus has **built-in support** for multiple doc plugins - this is a core feature, not a hack. Here's how it works in a monorepo:

```javascript
// apps/docs-portal/docusaurus.config.js
module.exports = {
  plugins: [
    // Design System docs (default instance)
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'default',
        path: '../../packages/components/docs',
        routeBasePath: 'design-system',
        sidebarPath: require.resolve('./sidebars-design-system.js'),
      },
    ],
    
    // API documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: '../../apps/api-docs/docs',
        routeBasePath: 'api',
        sidebarPath: require.resolve('./sidebars-api.js'),
      },
    ],
    
    // Benefits team docs
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'benefits',
        path: '../../teams/benefits/docs',
        routeBasePath: 'teams/benefits',
        sidebarPath: require.resolve('./sidebars-benefits.js'),
      },
    ],
    
    // Claims team docs
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'claims',
        path: '../../teams/claims/docs',
        routeBasePath: 'teams/claims',
        sidebarPath: require.resolve('./sidebars-claims.js'),
      },
    ],
  ],
};
```

**Result:** 
- Single unified site: `https://developer.va.gov/`
  - `/design-system/` - Design system docs
  - `/api/` - API documentation
  - `/teams/benefits/` - Benefits team docs
  - `/teams/claims/` - Claims team docs
- Each team maintains their own sidebar navigation
- Unified search across all documentation
- Consistent header/footer navigation

### 3. Decap CMS Can Manage Multiple Documentation Sections

Each team can have their own Decap CMS configuration pointing to their folder:

```yaml
# static/admin/config.yml
collections:
  # Design system documentation
  - name: design-system
    label: "Design System"
    folder: "packages/components/docs"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
  
  # API documentation
  - name: api
    label: "API Documentation"
    folder: "apps/api-docs/docs"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
  
  # Team-specific docs (Benefits)
  - name: benefits
    label: "Benefits Team"
    folder: "teams/benefits/docs"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
```

**Each team can edit their own docs** through the `/admin` interface, and Decap CMS commits the changes to Git on their behalf.

### 4. You've Already Solved the Hard Parts

Since you have a working Docusaurus + Decap CMS prototype:
- ✅ You know how to configure Docusaurus
- ✅ Authentication is set up for Decap CMS
- ✅ Your team is familiar with the editing interface
- ✅ You've validated the workflow

**Switching to MkDocs now would mean:**
- ❌ Throwing away that work
- ❌ Re-learning a different configuration system
- ❌ Losing the WYSIWYG editor (or building your own)
- ❌ Training teams on a new system

---

## Docusaurus + Decap CMS Monorepo Structure

Here's exactly how you'd structure your monorepo:

```
va-design-system-monorepo/
├── apps/
│   ├── docs-portal/                 # Main Docusaurus site
│   │   ├── docusaurus.config.js     # Multi-instance config
│   │   ├── static/
│   │   │   └── admin/               # Decap CMS admin interface
│   │   │       ├── index.html
│   │   │       └── config.yml       # CMS configuration
│   │   ├── sidebars-design-system.js
│   │   ├── sidebars-api.js
│   │   └── sidebars-benefits.js
│   │
│   ├── storybook/                   # Storybook for component examples
│   │   └── package.json
│   │
│   └── api-backend/                 # VA API (if you consolidate)
│       └── package.json
│
├── packages/
│   ├── components/                  # Component library
│   │   ├── src/                     # Component source code
│   │   ├── docs/                    # Component technical docs
│   │   │   ├── button.md
│   │   │   ├── alert.md
│   │   │   └── card.md
│   │   └── package.json
│   │
│   ├── design-tokens/
│   │   └── package.json
│   │
│   └── themes/
│       └── package.json
│
├── teams/                           # Team-owned documentation
│   ├── benefits/
│   │   ├── docs/
│   │   │   ├── architecture.md
│   │   │   ├── runbook.md
│   │   │   └── team-guidelines.md
│   │   └── CODEOWNERS              # @va/benefits-team
│   │
│   ├── claims/
│   │   ├── docs/
│   │   └── CODEOWNERS
│   │
│   └── healthcare/
│       ├── docs/
│       └── CODEOWNERS
│
├── docs/                            # API documentation (for API docs plugin)
│   ├── authentication.md
│   ├── endpoints/
│   └── guides/
│
├── turbo.json                       # Turborepo configuration
├── pnpm-workspace.yaml              # Workspace configuration
└── package.json                     # Root package.json
```

### Navigation Configuration

```javascript
// apps/docs-portal/docusaurus.config.js
module.exports = {
  themeConfig: {
    navbar: {
      title: 'VA Developer Portal',
      items: [
        {
          to: '/design-system/intro',
          label: 'Design System',
          position: 'left',
        },
        {
          to: '/api/getting-started',
          label: 'API',
          position: 'left',
        },
        {
          label: 'Teams',
          position: 'left',
          items: [
            {
              label: 'Benefits',
              to: '/teams/benefits/architecture',
            },
            {
              label: 'Claims',
              to: '/teams/claims/overview',
            },
            {
              label: 'Healthcare',
              to: '/teams/healthcare/systems',
            },
          ],
        },
        {
          href: 'https://storybook.va.gov',
          label: 'Storybook',
          position: 'right',
        },
      ],
    },
  },
};
```

**Result:** One unified navigation bar across all documentation, with each team's docs accessible as separate sections.

---

## When to Use Docusaurus vs MkDocs

Here's the decision matrix:

| Factor | Docusaurus + Decap CMS | MkDocs + mkdocs-monorepo-plugin |
|--------|----------------------|--------------------------------|
| **Non-technical user editing** | ✅ Excellent (WYSIWYG CMS) | ❌ Requires Git + Markdown knowledge |
| **Interactive components** | ✅ Can embed React components | ⚠️ Limited to static HTML |
| **Multiple doc instances** | ✅ Built-in plugin system | ✅ Via mkdocs-monorepo-plugin |
| **Setup complexity** | ⚠️ More complex (React ecosystem) | ✅ Simpler (Python, single config file) |
| **Your existing investment** | ✅ Already have prototype | ❌ Would need to rebuild from scratch |
| **Community/plugins** | ✅ Large ecosystem (Meta-backed) | ✅ Strong Python community |
| **Search** | ✅ Built-in Algolia integration | ⚠️ Requires plugin configuration |
| **Versioning** | ✅ Built-in versioning | ⚠️ Manual configuration |
| **Component library integration** | ✅ Can import and demo React components live | ⚠️ Requires custom tooling |
| **Team comfort** | ✅ Your team already knows it | ❌ New learning curve |
| **Confluence replacement** | ✅ Decap CMS provides similar UX | ❌ Git/markdown barrier to entry |

**Verdict:** Docusaurus + Decap CMS is the clear winner for your specific situation because:
1. You need to replace Confluence (requires non-technical user access)
2. You already have a working prototype
3. You want to show live component examples (React ecosystem advantage)

**MkDocs would be better if:**
- You only had technical users (no Confluence replacement needed)
- You were starting from scratch
- Your team prefers Python over JavaScript/React
- You want the simplest possible setup

---

## Addressing Potential Concerns

### "Is Docusaurus overkill for documentation?"

**No.** The React foundation enables powerful features:
- **Live component demos** - Import your actual components and render them in docs
- **Interactive examples** - Users can edit code and see results
- **MDX support** - Embed React components in markdown

Example from your design system docs:

```mdx
import { Button } from '@va/components';

# Button Component

Here's a live example you can interact with:

<Button variant="primary" onClick={() => alert('Clicked!')}>
  Click me
</Button>

```

**MkDocs can't do this** without significant custom tooling.

### "Will Decap CMS scale for many teams?"

**Yes.** The configuration above shows multiple collections, each pointing to different team folders. You can configure role-based access through:
- **GitHub CODEOWNERS** - Controls who can merge PRs
- **Netlify Identity** - Controls who can access `/admin`
- **Editorial workflow** - Enables approval process before publishing

### "What about the Storybook iframe issue?"

With Docusaurus, you have several options:

**Option 1: Embed Storybook iframes** (solve the X-Frame-Options issue as discussed in the original research)

**Option 2: Use Storybook's static build + MDX**

```mdx
import { Story } from '@storybook/react';
import { Button } from '@va/components';

<Story name="Primary">
  <Button variant="primary">Primary Button</Button>
</Story>
```

**Option 3: Direct component imports** (most flexible)

```mdx
import { Button } from '@va/components';

<div style={{display: 'flex', gap: '1rem'}}>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="tertiary">Tertiary</Button>
</div>
```

You can use all three approaches simultaneously - embed Storybook for complex examples, import components for simple ones.

---

## Migration Path: Expanding Your Prototype

### Phase 1: Expand Existing Prototype (Week 1-2)

1. **Add multi-instance support** to your existing Docusaurus config
2. **Configure Decap CMS** to manage multiple folders
3. **Test with a pilot team** (one team's docs)

```javascript
// Add to your existing docusaurus.config.js
plugins: [
  // Your existing design system docs
  '@docusaurus/plugin-content-docs',
  
  // Add pilot team docs
  [
    '@docusaurus/plugin-content-docs',
    {
      id: 'pilot-team',
      path: '../../teams/pilot-team/docs',
      routeBasePath: 'teams/pilot',
    },
  ],
],
```

### Phase 2: Add API Documentation (Week 3)

1. **Create API docs folder** in the monorepo
2. **Add API doc plugin** to Docusaurus config
3. **Configure Decap CMS** for API docs editing

### Phase 3: Expand to More Teams (Week 4-8)

Don't migrate all teams at once. Gradually:

1. **Choose 2-3 teams** willing to pilot
2. **Create their folder structure** in `teams/`
3. **Configure their Decap CMS collection**
4. **Add their doc plugin** to Docusaurus
5. **Gather feedback** and iterate

### Phase 4: Integrate with Component Library (Ongoing)

1. **Import components** into MDX docs
2. **Create live examples** in documentation
3. **Link Storybook** for complex component demos

---

## Addressing MkDocs' Advantages

**"But Spotify uses MkDocs!"**

True, and the mkdocs-monorepo-plugin is excellent. But:
- Spotify's engineers are comfortable with Git/Markdown
- They don't need a Confluence replacement
- They're primarily documenting backend Python services

Your needs are different:
- Mixed technical/non-technical users
- Replacing Confluence (requires friendly UX)
- Frontend component library (React ecosystem advantage)

**"MkDocs is simpler to set up"**

True for developers. But consider the total cost:
- Docusaurus setup: 1-2 days (you've already done this)
- Training non-technical users on Git: Weeks or never
- Decap CMS value: Priceless for non-developers

---

## Recommended Configuration

Here's the exact setup I recommend:

### 1. Docusaurus Multi-Instance Config

```javascript
// apps/docs-portal/docusaurus.config.js
const config = {
  title: 'VA Developer Portal',
  url: 'https://developer.va.gov',
  
  plugins: [
    // Design System (default)
    [
      '@docusaurus/plugin-content-docs',
      {
        routeBasePath: 'design-system',
        sidebarPath: require.resolve('./sidebars-design-system.js'),
        path: '../../packages/components/docs',
        editUrl: 'https://github.com/department-of-veterans-affairs/va-design-system/edit/main/',
      },
    ],
    
    // API Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        routeBasePath: 'api',
        sidebarPath: require.resolve('./sidebars-api.js'),
        path: '../../docs/api',
      },
    ],
    
    // Generate team docs plugins dynamically
    ...generateTeamPlugins([
      'benefits',
      'claims', 
      'healthcare',
      'education',
    ]),
  ],
  
  themeConfig: {
    navbar: {
      items: [
        {to: '/design-system/intro', label: 'Design System'},
        {to: '/api/getting-started', label: 'API'},
        {
          label: 'Teams',
          items: [
            {to: '/teams/benefits', label: 'Benefits'},
            {to: '/teams/claims', label: 'Claims'},
            {to: '/teams/healthcare', label: 'Healthcare'},
          ],
        },
      ],
    },
    
    // Algolia search (indexes all docs)
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'va-developer-portal',
    },
  },
};

// Helper function to generate team doc plugins
function generateTeamPlugins(teams) {
  return teams.map(team => [
    '@docusaurus/plugin-content-docs',
    {
      id: `team-${team}`,
      routeBasePath: `teams/${team}`,
      sidebarPath: require.resolve(`./sidebars-${team}.js`),
      path: `../../teams/${team}/docs`,
    },
  ]);
}

module.exports = config;
```

### 2. Decap CMS Configuration

```yaml
# apps/docs-portal/static/admin/config.yml
backend:
  name: github
  repo: department-of-veterans-affairs/va-design-system
  branch: main

publish_mode: editorial_workflow  # Enables approval workflow

media_folder: "static/img"
public_folder: "/img"

collections:
  # Design System
  - name: design-system
    label: "Design System"
    label_singular: "Design System Doc"
    folder: "packages/components/docs"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Sidebar Label", name: "sidebar_label", widget: "string", required: false}
      - {label: "Sidebar Position", name: "sidebar_position", widget: "number", required: false}
      - {label: "Description", name: "description", widget: "text", required: false}
      - {label: "Body", name: "body", widget: "markdown"}
  
  # API Documentation
  - name: api-docs
    label: "API Documentation"
    folder: "docs/api"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
  
  # Team Docs - Benefits
  - name: team-benefits
    label: "Benefits Team Docs"
    folder: "teams/benefits/docs"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
  
  # Team Docs - Claims
  - name: team-claims
    label: "Claims Team Docs"
    folder: "teams/claims/docs"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
```

### 3. Team Autonomy via CODEOWNERS

```
# Root CODEOWNERS file
/packages/components/ @va/design-system-team
/apps/docs-portal/ @va/design-system-team
/teams/benefits/ @va/benefits-team
/teams/claims/ @va/claims-team
/teams/healthcare/ @va/healthcare-team
```

**Result:**
- Each team controls who can approve changes to their docs
- Design system team controls the portal configuration
- Teams can't accidentally break each other's docs

---

## Final Recommendation

**Use Docusaurus + Decap CMS. Here's why:**

✅ **You've already built it** - The hardest work is done
✅ **Solves the Confluence problem** - Decap CMS gives non-technical users a friendly editing interface
✅ **Supports your use case** - Multiple doc instances, React component demos, unified search
✅ **Battle-tested** - Used by Meta (React, Jest), Ionic, Redux, and many others for multi-site documentation
✅ **Scales to your needs** - Can handle many teams, many docs, many components

**Don't switch to MkDocs** because:
❌ You'd throw away working code
❌ You'd lose the WYSIWYG editor
❌ You'd need to retrain your team
❌ You'd still need to solve the "non-technical user" problem

The only scenario where I'd recommend MkDocs is if you were starting from scratch AND everyone on your team was comfortable with Git + Markdown. But that's not your situation.

**Next steps:**
1. Take your existing Docusaurus + Decap CMS prototype
2. Add multi-instance support (copy the config above)
3. Pilot with one team's documentation
4. Gradually expand based on what you learn

You're in a great position - stick with what you've built and expand it rather than switching horses mid-stream.
