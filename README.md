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

Releases will occur no less often than at the beginning of each sprint (every other Wednesday), and may additionally be performed as-needed when critical bug fixes need to go out. Please reach out to us via #vfs-platform-support or #platform-design-system if you have a need for an unscheduled release.

**For Design System Team only:**

1. If you are unsure if a new release should be created, check with the Release Manager and/or the rest of the team first, to make sure it's worth the effort at this time.
2. Get the version number from [`packages/core/package.json`](https://github.com/department-of-veterans-affairs/component-library/blob/main/packages/core/package.json#L4), ensuring it's up-to-date and new. If the core version hasn't been updated yet, submit a PR to update it prior to performing the release, or things won't work correctly with the automation.
3. From the [repo's homepage](https://github.com/department-of-veterans-affairs/component-library) click on "Releases" in the right-hand sidebar.
4. Click on the "Draft a new release" button near the top of the page.
5. Click on the 'Choose a tag' drop-down and type the letter `v` followed by the new "core" version number (should look like `v16.1.0`). The target should remain `main`.
6. For the release title, type the same thing you entered for the tag (`v{versionNumber}`).
7. Click on the "Generate release notes" button. If the button is disabled, double-check that the tag/version number is correct and hasn't been released before.
8. Review the release notes for any typos and/or unneeded notes. Remember that these release notes are intended for public use, so they should be professional in their tone and appearance.
9. Take a screenshot of the release notes and post in the `#vsp-design-system-team` channel on slack; ask for others to double-check that everything looks good and that there aren't any last-minute additions to the release that need to be included.
10. Back in GitHub, ensure the "Set as the latest release" checkbox is checked.
11. Press the "Publish release" button. GitHub Actions will take care of any necessary build and publishing steps.
12. If [vets-website](https://github.com/department-of-veterans-affairs/vets-website) will need to take advantage of the latest release sooner than later, open a PR to update the dependency version there (update your local copy and then submit a PR to merge the latest version bump).
13. Finally, go to your local copy of the [vets-design-system-documentation](https://github.com/department-of-veterans-affairs/vets-design-system-documentation) repo and update the version requirement, submitting a PR for that as well.

# Running Build via Storybook

1. `cd packages/web-components/`
    1. `yarn install`
    2. `yarn build`
    3. `yarn build-bindings` (build React bindings)
    4. `yarn watch:stencil` (optional)
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

## Testing

### Running tests for web components

To run units for the web-components project, the commands are:

```bash
yarn test
```

and

```bash
yarn test.watch
```

In order to a single file, you can run:

```bash
npx stencil test --e2e -- src/components/[component-name]/[component-name].e2e.ts
```

Replace `[component-name]` with the name of the component you want to test. Optionally, you can add `--watchAll` after `--e2e` to watch the file for changes. For example:

```bash
npx stencil test --e2e --watchAll -- src/components/[component-name]/[component-name].e2e.ts
```

Another option is to use wildcards to query for certain tests. For example, to run all tests for the `va-alert` component, you can run:

```bash
npx stencil test --e2e  -- src/components/va-accordion/va-accordion-*
```
