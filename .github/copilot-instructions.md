# VA Design System Component Library - Copilot Instructions

## Project Overview

This is the **VA Design System Component Library**, a comprehensive monorepo containing reusable components, design tokens, and development tools for the VA.gov website and applications. The repository serves as the foundation for maintaining consistency across all VA digital properties.

### Repository Structure
- **`packages/web-components/`** - Stencil-based web components (standards-based, framework-agnostic)
- **`packages/react-components/`** - **DEPRECATED** - React bindings and React-specific components (use web-components instead)
- **`packages/css-library/`** - Design tokens, utility classes, and SCSS foundations (design tokens moving to new utilities repo)
- **`packages/storybook/`** - Component documentation and visual testing
- **`packages/design-system-dashboard-cli/`** - Analytics and usage tracking tools
- **`packages/core/`** - Bundle package for publishing web-components and react-components together
- **`packages/integration-examples/`** - Example implementations for different frameworks

## Development Context

### Technology Stack
- **Web Components**: Built with Stencil (TypeScript + JSX)
- **React Components**: TypeScript React with hooks and modern patterns
- **Build System**: Yarn workspaces with Lerna for publishing
- **Testing**: Jest for unit tests, Puppeteer for e2e testing
- **Documentation**: Storybook for component demos and documentation

### Component Architecture
- **Base Web Components**: Built with Stencil, output vanilla web components
- **React Bindings**: Auto-generated React wrappers for web components
- **Design System Maturity**: Components have maturity levels (use/caution/don't use)
- **Accessibility First**: All components must meet WCAG 2.2 Level A and AA standards

## Key Development Workflows

### Weekly Reports Automation
The repository includes automated weekly reporting via GitHub Actions:
- **Schedule**: Every Thursday at 10 PM UTC
- **Reports Generated**: Form apps, design system component usage, forms library usage
- **Output**: Creates pull requests with CSV/TXT reports for team review
- **Integration**: Data consumed by Metrics Dashboard on design.va.gov

### Component Development
1. **Web Components** (packages/web-components/):
   - Use Stencil decorators (`@Component`, `@Prop`, `@State`, `@Event`)
   - Follow VA naming conventions (`va-*`)
   - Include comprehensive JSDoc documentation
   - Write unit tests and e2e tests

2. **React Components** (packages/react-components/) - **DEPRECATED**:
   - **DO NOT** create new React components - use web-components instead
   - Existing React components are maintained for backward compatibility only
   - TypeScript with proper prop interfaces
   - Use React hooks for state management
   - Include accessibility attributes and ARIA support
   - Follow React patterns and best practices

### Testing Strategy
- **Unit Tests**: Jest with component rendering tests
- **E2E Tests**: Puppeteer for cross-browser compatibility
- **Visual Regression**: Chromatic for visual testing
- **Accessibility**: axe-core integration for automated a11y testing

## Design System Guidelines

### Component Maturity Levels
- **Use**: Production-ready, fully supported components
- **Caution**: Limited use cases, may have known issues
- **Don't Use**: Deprecated or problematic components

### Accessibility Requirements
- All components must be keyboard navigable
- Screen reader compatible with proper ARIA attributes
- Color contrast ratios meet WCAG 2.2 Level A and AA standards
- Focus management and visual focus indicators
- Support for high contrast mode and reduced motion

### VA-Specific Patterns
- **Forms**: Extensive form components with validation
- **Content Presentation**: Cards, alerts, banners for content display
- **Navigation**: Header, breadcrumbs, pagination components
- **Data Display**: Tables, lists, and data visualization components

## Common Development Tasks

### Adding New Components
1. Create component in `packages/web-components/src/components/`
2. Add Stencil component with proper decorators and JSDoc
3. Create comprehensive unit tests and e2e tests
4. Add Storybook stories for documentation
5. Generate React bindings automatically
6. Update component documentation and design guidance

### Updating Existing Components
1. Maintain backward compatibility when possible
2. Update unit tests and e2e tests
3. Check for breaking changes and document them
4. Update Storybook documentation
5. Consider impact on consuming applications

### Publishing Components
- Components are published via automated CI/CD
- Semantic versioning for release management  
- Release notes generated from conventional commits
- Multiple npm packages published from monorepo
- **Comprehensive publishing steps**: [See README.md](https://github.com/department-of-veterans-affairs/component-library?tab=readme-ov-file#publishing)

## Integration and Usage

### External Dependencies
- **vets-website**: Primary consumer application
- **content-build**: Static site generator for VA.gov
- **next-build**: Front-end templating, build, and deploy for VA.gov CMS content
- **design.va.gov**: Design system documentation site

### Analytics and Metrics
- **Dashboard CLI**: Tracks component usage across VA applications
- **BigQuery Integration**: Usage data stored for analysis
- **Weekly Reports**: Automated tracking of adoption and usage patterns

## Development Best Practices

### Code Quality
- TypeScript for type safety
- ESLint and Prettier for consistent formatting
- Conventional commits for clear git history
- Code review process for all changes
- **Branch Protection Rules**: The repository requires all changes to be made through pull requests - direct pushes to main are not allowed

### Documentation
- Comprehensive JSDoc for all public APIs
- Storybook stories with controls and examples
- README files with usage instructions
- Design guidance documentation

### Performance
- Lazy loading for web components
- Optimized bundle sizes
- Tree-shaking support
- Minimal external dependencies

## Troubleshooting Common Issues

### Component Not Rendering
- Check if component is properly imported
- Verify Stencil build has completed
- Check for JavaScript errors in console
- Ensure proper HTML structure

### Styling Issues
- Check CSS custom properties are defined
- Verify design token usage
- Check for CSS specificity conflicts
- Test in different browsers

### Accessibility Problems
- Run axe-core accessibility tests
- Test with keyboard navigation
- Verify screen reader compatibility
- Check color contrast ratios

## Resources and Links

- **Design System Documentation**: [design.va.gov](https://design.va.gov)
- **Component Library**: [design.va.gov/components](https://design.va.gov/components)
- **GitHub Repository**: [department-of-veterans-affairs/component-library](https://github.com/department-of-veterans-affairs/component-library)
- **Storybook Documentation**: [design.va.gov/storybook](https://design.va.gov/storybook/?path=/docs/about-introduction--docs)
- **VA Design System Team**: Primary maintainers and design guidance

---

This document provides comprehensive context for AI-powered development assistance within the VA Design System Component Library ecosystem. Use this information to provide accurate, contextual help with component development, testing, documentation, and maintenance tasks.
