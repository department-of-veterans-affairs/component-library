# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **VA Design System Component Library**, a monorepo containing reusable components, design tokens, and development tools for VA.gov and VA applications. The repository is maintained by the VA Design System Team and serves as the foundation for maintaining consistency across all VA digital properties.

### Monorepo Structure

- **`packages/web-components/`** - Stencil-based web components (primary, framework-agnostic)
- **`packages/react-components/`** - **DEPRECATED** - React-specific components (use web-components instead)
- **`packages/css-library/`** - Design tokens, utility classes, and SCSS foundations
- **`packages/core/`** - Bundle package for publishing (required for releases)
- **`packages/storybook/`** - Component documentation and visual testing
- **`packages/design-system-dashboard-cli/`** - Analytics and usage tracking tools
- **`packages/integration-examples/`** - Framework integration examples

## Essential Commands

### Development Setup

Start the full development environment with Storybook:
```bash
npm run dev
```
This runs `setup.sh` which installs dependencies, builds all packages, and starts Storybook.

### Building Packages

For manual builds, navigate to the specific package and run:
```bash
# Web Components
cd packages/web-components
yarn build                 # Build Stencil components
yarn build-bindings        # Build React bindings
yarn watch:stencil         # Watch mode for development

# CSS Library
cd packages/css-library
yarn build                 # Build tokens and stylesheets

# Core Package (for publishing)
cd packages/core
yarn build
```

### Running Tests

**Web Components Tests:**
```bash
cd packages/web-components

# Run all tests
yarn test

# Watch mode for all tests
yarn test.watch

# Run single component test
npx stencil test --e2e -- src/components/va-accordion/test/va-accordion.e2e.ts

# Watch mode for single component
npx stencil test --e2e --watchAll -- src/components/va-accordion/test/va-accordion.e2e.ts

# Run tests with wildcard pattern
npx stencil test --e2e -- src/components/va-accordion/test/va-accordion-*
```

### Linting

```bash
cd packages/web-components
yarn lint
```

**Important:** The web-components package has ESLint rules that check for hard-coded user-facing strings. This linting isn't integrated into CI, so run it locally or use an ESLint editor plugin.

## Architecture and Key Concepts

### Component Architecture

**Web Components (Primary):**
- Built with Stencil.js (TypeScript + JSX)
- Output vanilla Web Components (standards-based, framework-agnostic)
- React bindings auto-generated via `@stencil/react-output-target`
- All components prefixed with `va-*` (e.g., `va-button`, `va-accordion`)
- Use Stencil decorators: `@Component`, `@Prop`, `@State`, `@Event`, `@Listen`

**React Components (DEPRECATED):**
- DO NOT create new React components
- Use web-components package instead (it includes React bindings)
- Existing React components maintained for backward compatibility only

### Component Maturity Levels

Components are classified by maturity:
- **Use**: Production-ready, fully supported
- **Caution**: Limited use cases, may have known issues
- **Don't Use**: Deprecated or problematic

Maturity is documented in component JSDoc comments:
```typescript
/**
 * @componentName Button pair
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref button/button-pair
 */
```

### Design System Integration

**Primary Consumers:**
- **vets-website** - Main VA.gov application
- **content-build** - Static site generator for VA.gov
- **vets-design-system-documentation** - Design system docs at design.va.gov

**Testing Changes in vets-website:**
Use Verdaccio (local NPM registry) to test component-library changes in vets-website before publishing. See README.md "Local testing in vets-website with Verdaccio" section for detailed instructions.

### Stencil Configuration

Key points from `packages/web-components/stencil.config.ts`:
- Namespace: `component-library`
- React bindings output to `./react-bindings/index.ts`
- Global styles loaded from `src/global/main.css`
- SASS with USWDS path included
- IE11 support enabled (`buildEs5: 'prod'`)
- Output targets: dist, www, dist-custom-elements

### Testing Strategy

- **Unit Tests**: Jest for component rendering and logic
- **E2E Tests**: Stencil's Puppeteer integration for browser testing
- **Visual Regression**: Chromatic for visual testing (runs on PRs)
- **Accessibility**: `@axe-core/puppeteer` for automated a11y testing

Test files located at: `src/components/va-[component-name]/test/va-[component-name].e2e.ts`

## Version Management and Publishing

### Semantic Versioning

This repo follows [semantic versioning](https://semver.org/):

- **Major**: Breaking changes (component removed, breaking API change)
- **Minor**: New features (new component, new variant, backwards-compatible API change)
- **Patch**: Bug fixes (accessibility fix, styling fix, functionality fix)

### PR Labels

PRs must be labeled for release notes:
- `major` - Breaking changes
- `minor` - New features
- `patch` - Bug fixes
- `css-library` - CSS-Library specific changes
- `ignore-for-release` - Not included in release notes

### Version Update Process

When publishing changes:
1. Update version in affected package(s):
   - `packages/core/package.json` (required)
   - `packages/web-components/package.json` (if web components changed)
   - `packages/css-library/package.json` (if the CSS Library changed)
   - `packages/react-components/package.json` (if React components changed)

2. Run `yarn install` in each updated package directory to update `yarn.lock`

3. Create PR with `ignore-for-release` label

4. After merge, Design System Team creates release via GitHub UI

5. GitHub Actions automatically publishes to NPM when release is created

**Publishing is managed by the VA Design System Team.** Releases occur at the beginning of each sprint (every other Thursday) and as-needed for critical fixes.

## Branch and PR Requirements

### Branch Naming

Branches must follow these rules for Chromatic preview links to work:
- Only lowercase letters, numbers, and dashes
- Maximum 37 characters
- Example: `fix-button-accessibility` ✅
- Example: `Fix_Button_Accessibility` ❌ (uppercase/underscores)

### Branch Protection

- All changes must go through pull requests
- Direct pushes to `main` are not allowed
- PRs require review and approval

## Development Best Practices

### Accessibility Requirements (CRITICAL)

All components **must** meet WCAG 2.2 Level A and AA standards:
- Keyboard navigable
- Screen reader compatible with proper ARIA attributes
- Color contrast ratios meet WCAG standards
- Focus management and visual focus indicators
- Support for high contrast mode and reduced motion

Run accessibility tests in e2e tests using `@axe-core/puppeteer`.

### Component Development Workflow

When creating or updating web components:

1. **Component Location**: `packages/web-components/src/components/va-[name]/`

2. **Required Files**:
   - `va-[name].tsx` - Component implementation
   - `va-[name].scss` - Component styles
   - `test/va-[name].e2e.ts` - E2E tests
   - `readme.md` - Auto-generated from JSDoc

3. **JSDoc Requirements**:
   - Document all `@Prop` with descriptions and types
   - Document all `@Event` emitters
   - Include `@componentName`, `@maturityCategory`, `@maturityLevel`, `@guidanceHref`

4. **Build Process**:
   - Build web components: `yarn build`
   - Generate React bindings: `yarn build-bindings`
   - Update Storybook stories in `packages/storybook/`

5. **Testing**:
   - Write unit tests and e2e tests
   - Test keyboard navigation
   - Test screen reader compatibility
   - Run accessibility audits with axe-core

### Code Quality

- **TypeScript** for type safety
- **ESLint** and **Prettier** for consistent formatting
- Conventional commits for clear git history
- Code review required for all changes

### Content Language Linting

Web components have ESLint rules checking for hard-coded user-facing strings. This ensures internationalization support. Run `yarn lint` in packages/web-components to check.

## GitHub Actions Workflows

Key automated workflows:
- **publish.yml** - Publishes packages to NPM when a release is created
- **chromatic.yml** - Visual regression testing on PRs
- **chromatic-link.yml** - Adds Chromatic preview links to PRs
- **weekly-reports.yml** - Generates usage reports (Thursdays at 10 PM UTC)
- **node.js.yml** - CI tests on PRs

## Common Troubleshooting

### Build Issues

If builds fail:
1. Ensure correct Node version (v18.x or v22.x for component-library)
2. Clear node_modules and reinstall: `rm -rf node_modules && yarn install`
3. Check that dependencies are installed in all workspace packages
4. Verify USWDS paths are correct in stencil.config.ts

### Component Not Rendering

1. Check if component is properly imported
2. Verify Stencil build completed successfully
3. Check browser console for errors
4. Ensure proper HTML structure and required props

### Test Failures

1. Ensure Puppeteer is installed correctly
2. Check for timing issues (may need to add waits)
3. Verify test selectors match shadow DOM structure
4. Run tests individually to isolate issues

## External Resources

- **Design System Documentation**: https://design.va.gov
- **Component Library**: https://design.va.gov/components
- **Storybook**: https://design.va.gov/storybook/?path=/docs/about-introduction--docs
- **GitHub Repository**: https://github.com/department-of-veterans-affairs/component-library
- **Stencil.js Documentation**: https://stenciljs.com
- **USWDS (U.S. Web Design System)**: https://designsystem.digital.gov

## Support

For questions or issues:
- **Slack**: `#vfs-platform-support` or `#platform-design-system`
- **GitHub Issues**: Report bugs and feature requests via GitHub
- **Release Requests**: Contact Design System Team in Slack channels above
