# Storybook Embedding Architecture Decision

**Date:** January 2026
**Status:** Implemented
**Authors:** Documentation Team

## Executive Summary

This document explains why the VA Design System documentation site hosts its own Storybook instance rather than embedding iframes from the external production Storybook at `design.va.gov/storybook`.

**Key Finding:** Browser security restrictions (`X-Frame-Options: SAMEORIGIN`) on the production Storybook prevent cross-origin iframe embedding, making it impossible to show the Storybook toolbar in documentation embeds.

## Objective

Enable documentation authors to embed interactive Storybook examples in Docusaurus pages with:
- Full Storybook toolbar (background, viewport, zoom controls)
- Live component rendering
- Consistent developer experience

## Approaches Evaluated

### Option 1: Embed External Production Storybook

**Approach:** Use iframes pointing to `https://design.va.gov/storybook`

**Result:** Not viable

**Technical Blockers:**
1. **X-Frame-Options Header** - The production Storybook returns `X-Frame-Options: SAMEORIGIN`, which instructs browsers to block the page from loading in iframes on different domains
2. **iframe.html Endpoint** - Storybook's `/iframe.html` URL (designed for embedding) also returns the same header, and doesn't include the toolbar
3. **No Server Access** - Modifying these headers would require changes to the VA.gov infrastructure

### Option 2: Embed from Component Library Repository Storybook

**Approach:** Run Storybook from the `component-library` repository locally and embed from `localhost:6006`

**Result:** Partially viable but unreliable

**Issues Encountered:**
1. **Component Rendering Failures** - Toolbar loaded but components showed indefinite loading states
2. **Console Errors** - "No existing state found for follower" errors indicating state management issues
3. **422 Network Errors** - API calls failing during component initialization
4. **react-docgen Parsing Failures** - Documentation generation errors affecting component metadata
5. **Chrome Localhost Issues** - Some development environments couldn't access `localhost` URLs

### Option 3: Local Storybook in Documentation App (Selected)

**Approach:** Install Storybook directly in `apps/docs` and import components from npm packages

**Result:** Fully functional

## Solution Architecture

```
apps/docs/
├── .storybook/
│   ├── main.ts      # Storybook configuration
│   └── preview.ts   # Global decorators and parameters
├── src/
│   ├── stories/     # Story files for each component
│   └── components/
│       └── StoryEmbed/  # Embedding component
```

### How It Works

1. **Storybook runs locally** on port 6006 during development
2. **Components are imported** from `@department-of-veterans-affairs/web-components` npm package
3. **StoryEmbed component** renders iframes pointing to local Storybook with toolbar enabled
4. **In production**, embeds fall back to iframe-only view from `design.va.gov/storybook`

### Key Configuration

**Static Asset Serving** - Fonts and icons are served from npm packages:
```typescript
staticDirs: [
  { from: '../node_modules/@department-of-veterans-affairs/css-library/dist/fonts', to: '/fonts' },
  { from: '../node_modules/@department-of-veterans-affairs/component-library/dist/img', to: '/img' },
]
```

**Dependency Optimization** - Vite excludes pre-bundled web components:
```typescript
optimizeDeps: {
  exclude: [
    '@department-of-veterans-affairs/component-library',
    '@department-of-veterans-affairs/web-components',
  ],
}
```

## Trade-offs

| Aspect | External Embedding | Local Storybook |
|--------|-------------------|-----------------|
| **Setup Complexity** | None | Moderate (one-time) |
| **Maintenance** | None | Update stories when components change |
| **Toolbar Support** | Not possible | Full support |
| **Component Sync** | Always current | Synced via npm versions |
| **Build Time** | No impact | Additional build step |
| **Dev Experience** | Limited | Full interactivity |

## Recommendations

1. **Keep npm packages updated** - Run `pnpm update @department-of-veterans-affairs/*` regularly to ensure component stories match production
2. **Add stories incrementally** - Create story files as needed for documentation rather than all at once
3. **Use `dev:all` script** - Run `pnpm run dev:all` to start both Docusaurus and Storybook concurrently

## Running Locally

```bash
# Start both Docusaurus and Storybook
cd apps/docs
pnpm run dev:all

# Or run separately
pnpm run dev        # Docusaurus on port 3000
pnpm run storybook  # Storybook on port 6006
```

## Files Reference

| File | Purpose |
|------|---------|
| `.storybook/main.ts` | Storybook build configuration |
| `.storybook/preview.ts` | Global styles and web component registration |
| `src/stories/*.stories.tsx` | Component story definitions |
| `src/components/StoryEmbed/` | Docusaurus embedding component |

## Conclusion

The local Storybook approach provides the best developer experience for documentation while maintaining separation between the component library source code and documentation content. Components are still managed in the separate `component-library` repository and consumed via npm packages, preserving the intended architecture.
