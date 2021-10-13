# How to contribute

## Adding a new Web Component

Any new component should follow the established directory structure:

```
src/components/your-component/
```

The directory for your components should have `your-component.tsx`, `your-component.e2e.ts`, and optional CSS files for styling.

## Writing tests

When writing tests for a new component or feature, be sure to write them as [end-to-end tests](https://stenciljs.com/docs/end-to-end-testing).
Unit tests are reserved for components that have a public method (this will be rare), or for reusable library functions.
