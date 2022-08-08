# Component library
![Publishing workflow](https://github.com/department-of-veterans-affairs/component-library/actions/workflows/publish.yml/badge.svg)
![Latest version](https://img.shields.io/npm/v/@department-of-veterans-affairs/component-library)

This is a monorepo containing two main packages:

- `react-components`
- `web-components`

The `core` package is for bundling the two main packages into one for publishing. The `storybook` package is for the combined story files from each `*-components` package.
The `design-system-dashboard-cli` package is used to gather metrics on design system usage.

## Contributing

### Branch naming
This repo uses [`Chromatic`](https://www.chromatic.com/) to streamline reviews by publishing your changes online. A link containing your changes is automatically added to pull requests to aid others when reviewing your code. In order for this link to work, please follow these rules when naming your branch:
- Your branch must contain only lowercase letters, numbers and dashes
- Your branch must not exceed 37 characters

### Content language

Our web components have linting which checks for hard-coded user-facing strings. At the moment this linting isn't integrated into CI - so you will only see it if you run `yarn lint` or if your editor has ESLint integration through a plugin.

## Publishing

### Updating the version

To publish changes from the `react-components` subpackage, make sure the version number in `packages/react-components/package.json` _and_ the version number in `packages/core/package.json` have been updated to be one ahead of the published versions.

To publish changes from the `web-components` subpackage, make sure the version number in `packages/web-components/package.json` _and_ the version number in `packages/core/package.json` have been updated to be one ahead of the published versions.

[`yarn version`](https://yarnpkg.com/cli/version) is available to use to make changes in the CLI. To change the version of the package you are working on run one of the following commands: `yarn version major`, `yarn version minor`, or `yarn version patch`. For guidance on which command to use please see below.

### How to choose a version number

This repo follows [semantic versioning](https://semver.org/). Here are some examples of which changes correspond to which version (MAJOR, MINOR, or PATCH) increase.

#### Major
- Component is removed
- Component API is changed

#### Minor
- New component is added
- New variant is added for a component

### Patch
- Accessibility fix
- Styling fix

### Releasing
If the version numbers have been updated in `main` and you're ready to publish, [draft a new release](https://github.com/department-of-veterans-affairs/component-library/releases) where the tag follows the [`vX.Y.Z` semantic versioning structure](https://semver.org/). This tag should match the version found in `packages/core/package.json`. Be sure to include good release notes describing the changes - GitHub's autogenerated release notes can be helpful.

Once a release is created, an attempt will be made to automatically publish the package(s) to npm using a GitHub action.

# Running Build via Storybook

1. `cd packages/web-components/`
    1. `yarn install`
    2. `yarn build`
    3. `yarn build-bindings` (build React bindings)
2. `cd ../react-components/`
    1. `yarn install`
    2. `yarn build`
3. `cd ../core/`
    1. `yarn install`
    2. `yarn build`
4. `cd ../storybook/`
    1. `yarn install`
    2. `yarn storybook`

This will allow you to run Storybook locally to view all components

# Stencil Dev Server for Testing IE11

1. Update `stencil.config.ts` line 16 to `buildEs5: true,`
    1. [More information on buildEs5 in Stencil](https://stenciljs.com/docs/config#buildes5)
    2. Stencil Dev Server is run in `dev` mode
2. Within `component-library/packages/web-components/src/index.html` Web Components can be added inside of the `<body>` tag for testing
    1. Example:
    ```
    <body>
        <va-progress-bar label="Add a label here" percent={35}></va-progress-bar>
        <va-segmented-progress-bar current={2} total={6}></va-segmented-progress-bar>
    </body>
    ```
3. Run `yarn serve` inside `packages/web-components/` to start the Stencil Dev Server
