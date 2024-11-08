# Component library

![Publishing workflow](https://github.com/department-of-veterans-affairs/component-library/actions/workflows/publish.yml/badge.svg)
![Latest version](https://img.shields.io/npm/v/@department-of-veterans-affairs/component-library)

This is a monorepo containing two main packages:

- `web-components`
- `react-components`

The `core` package is for bundling the two main packages into one for publishing. The `storybook` package is for the combined story files from each `*-components` package.
The `design-system-dashboard-cli` package is used to gather metrics on design system usage.

## Contributing

### Branch naming

This repo uses [`Chromatic`](https://www.chromatic.com/) to streamline reviews by publishing your changes online. A link containing your changes is automatically added to pull requests to aid others when reviewing your code. In order for this link to work, please follow these rules when naming your branch:

- Your branch must contain only lowercase letters, numbers and dashes
- Your branch must not exceed 37 characters

### Content language

Our web components have linting which checks for hard-coded user-facing strings. At the moment this linting isn't integrated into CI - so you will only see it if you run `yarn lint` or if your editor has ESLint integration through a plugin.

### Local testing with Verdaccio
Contributors are encouraged to test their design system changes in `vets-website` using [Verdaccio](https://verdaccio.org/). From the website:

> Verdaccio is a simple, zero-config-required local private NPM registry&hellip;

Verdaccio allows contributors to publish a new version of the VA Design System on their local machine, and rebuild `vets-website` with their changes.

#### Installing Verdaccio
1. Verdaccio requires [Python3](https://www.python.org/downloads/). Ensure you have Python3 installed by opening a terminal window and typing the following command:

   ```shell
   which python3 # Should see output like /usr/bin/python3
   ```
   
   You should see an execution path if Python3 is installed. If not, install it and type `which python3` again in a new terminal window.
1. Install Verdaccio using NPM or Yarn:

   ```shell
   # Install this version of Verdaccio for compatibility with Node v14.15.0.
   # NPM
   npm install --location=global verdaccio@5.5.0

   # Yarn
   yarn global add verdaccio@5.5.0
   ```
1. Verify Verdaccio was installed correctly.

   ```shell
   verdaccio --version # Should see output like v5.5.0
   ```
1. Start Verdaccio on your local machine. The server should be running at `localhost:4873`.

   ```shell
   verdaccio
   ```
1. Create a new Verdaccio user by entering this command and following the prompts.

   ```shell
   npm adduser --registry http://localhost:4873/
   ```

#### Publish your component-library changes to Verdaccio
The next step is to update the `core` and `web-component` versions in their respective `package.json` files.

1. Navigate to `packages/web-components` and change the version. For instance, if the current version is `10.1.1` and [your change is a patch](https://github.com/department-of-veterans-affairs/component-library?tab=readme-ov-file#how-to-choose-a-version-number), your version might be `10.1.2-rc1`.

   ```diff
   ! packages/web-components/package.json

   - "version": "10.1.1"
   + "version": "10.1.2-rc1"
   ```
2. Navigate to `packages/core` and update the version using the same logic

   ```diff
   ! packages/core/package.json
      
   - "version": "15.0.1"
   + "version": "15.0.2-rc1"
   ```
3. Still in the `packages/core` package.json file, update the VADS dependency entry

   ```diff
   ! packages/core/package.json

   dependencies: {
   -   "@department-of-veterans-affairs/web-components": "workspace:*"
   +   "@department-of-veterans-affairs/web-components": "^10.2.2-rc1"
   }
   ```
4. Build the components using the [Running Build via Storybook](https://github.com/department-of-veterans-affairs/component-library?tab=readme-ov-file#running-build-via-storybook) instructions. Ignore the last step to start Storybook; you won't need it for this process.
5. Publish the `core` package to Verdaccio

   ```shell
   cd ../packages/core
   npm publish --registry http://localhost:4873
   ```
6. Publish the `web-component` pacakge to Veraccio

   ```shell
   cd ../packages/web-components
   npm publish --registry http://localhost:4873
   ```
7. You're now ready to switch to your local `vets-website` directory and update the VADS dependency.


## Publishing

### Updating the version

To publish changes from the `react-components` subpackage, make sure the version number in `packages/react-components/package.json` _and_ the version number in `packages/core/package.json` have been updated to be one ahead of the published versions.

To publish changes from the `web-components` subpackage, make sure the version number in `packages/web-components/package.json` _and_ the version number in `packages/core/package.json` have been updated to be one ahead of the published versions.

[`yarn version`](https://yarnpkg.com/cli/version) is available to use to make changes in the CLI. To change the version of the package you are working on run one of the following commands: `yarn version major`, `yarn version minor`, or `yarn version patch`. For guidance on which command to use please see below.

### How to choose a version number

This repo follows [semantic versioning](https://semver.org/). Here are some examples of which changes correspond to which version (MAJOR, MINOR, or PATCH) increase.

#### Major

- Component is removed
- Component API is changed and it causes a breaking change

#### Minor

- New component is added
- New variant is added for a component
- Non-breaking or backwards compatible component API change

#### Patch

- Accessibility fix
- Styling fix
- Functionality fix

### Releasing

Releases will occur no less often than at the beginning of each sprint (every other Wednesday), and may additionally be performed as-needed when critical bug fixes need to go out. Please reach out to us via #vfs-platform-support or #platform-design-system if you have a need for an unscheduled release.

**For Design System Team only:**

1. If you are unsure if a new release should be created, check with the Release Manager and/or the rest of the team first, to make sure it's worth the effort at this time.
2. Get the version number from [`packages/core/package.json`](https://github.com/department-of-veterans-affairs/component-library/blob/main/packages/core/package.json#L4), ensuring it's up-to-date and new. If the core, web-components, and/or react-components packages versions haven't been updated yet, submit a PR to update them prior to performing the release, or things won't work correctly with the automation.
3. From the [repo's homepage](https://github.com/department-of-veterans-affairs/component-library) click on "Releases" in the right-hand sidebar.
4. Click on the "Draft a new release" button near the top of the page.
5. Click on the 'Choose a tag' drop-down and type the letter `v` followed by the new "core" version number (should look like `v16.1.0`). The target should remain `main`.
6. For the release title, type the same thing you entered for the tag (`v{versionNumber}`).
7. Click on the "Generate release notes" button. If the button is disabled, double-check that the tag/version number is correct and hasn't been released before.
8. Review the release notes for any typos and/or unneeded notes. Remember that these release notes are intended for public use, so they should be professional in their tone and appearance.
9. Take a screenshot of the release notes and post in the `#platform-design-system-team` channel on slack; ask for others to double-check that everything looks good and that there aren't any last-minute additions to the release that need to be included.
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

To run unit tests for all components, the commands are:

```bash
yarn test
```

and

```bash
yarn test.watch
```

To test a single file, run:

```bash
npx stencil test --e2e -- src/components/[component-name]/test/[component-name].e2e.ts
```

Replace `[component-name]` with the name of the component you want to test. Optionally, you can add `--watchAll` after `--e2e` to watch the file for changes. For example:

```bash
npx stencil test --e2e --watchAll -- src/components/[component-name]/test/[component-name].e2e.ts
```

Another option is to use wildcards to query for certain tests. For example, to run all tests for the `va-accordion` component, you can run:

```bash
npx stencil test --e2e  -- src/components/va-accordion/test/va-accordion-*
```
