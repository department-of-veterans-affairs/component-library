# Component library

This is a monorepo containing two main packages:

- `react-components`
- `web-components`

The `core` package is for bundling the two main packages into one for publishing. The `storybook` package is for the combined story files from each `*-components` package.

# Running Build via Storybook

1. `cd packages/web-components/`
    1. `yarn build`
    2. `yarn install`
2. `cd ../react-components/`
    1. `yarn build`
    2. `yarn install`
3. `cd ../core/`
    1. `yarn build`
    2. `yarn install`
4. `cd ../storybook/`
    1. `yarn install`
    2. `yarn storybook`

This will allow you to run Storybook locally to view all components