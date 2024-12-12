# Component library

![Publishing workflow](https://github.com/department-of-veterans-affairs/component-library/actions/workflows/publish.yml/badge.svg)
![Latest version](https://img.shields.io/npm/v/@department-of-veterans-affairs/component-library)

This is a monorepo containing the following packages:

- `web-components`
- `react-components`
- `css-library`
- `storybook`
- `design-system-dashboard-cli`

The `core` package is for bundling the `web-components` and `react-components` packages into one for publishing. 

The `storybook` package is for the combined story files from each `*-components` package.

The `design-system-dashboard-cli` package is used to gather metrics on design system usage.

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

## Running tests for web components

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

## Contributing

### Branch naming

This repo uses [`Chromatic`](https://www.chromatic.com/) to streamline reviews by publishing your changes online. A link containing your changes is automatically added to pull requests to aid others when reviewing your code. In order for this link to work, please follow these rules when naming your branch:

- Your branch must contain only lowercase letters, numbers and dashes
- Your branch must not exceed 37 characters

### Content language

Our web components have linting which checks for hard-coded user-facing strings. At the moment this linting isn't integrated into CI - so you will only see it if you run `yarn lint` or if your editor has ESLint integration through a plugin.

### Local development 

Local development can be done using Storybook by following the complete build steps outlined in [Running Build via Storybook](https://github.com/department-of-veterans-affairs/component-library?tab=readme-ov-file#running-build-via-storybook).

## Local testing in vets-website with Verdaccio
Contributors are encouraged to test their changes in `vets-website` using [Verdaccio](https://verdaccio.org/). What is Verdaccio? From the website:

> Verdaccio is a simple, zero-config-required local private NPM registry. No need for an entire database just to get started&hellip;

Verdaccio allows contributors to publish a new version of the VA Design System component library on their local machine, and preview `vets-website` with their changes.

#### Before you begin
1. VA Design System component library and vets-website require different versions of NodeJS. Be sure you have [NVM installed](https://github.com/nvm-sh/nvm#installing-and-updating) before you begin.
1. Download Node `v14.15.0` and a current Node `v18.x.x` or `v20.x.x`
1. Verdaccio also requires [Python3](https://www.python.org/downloads/). Ensure you have Python3 installed by opening a terminal window and typing the following command:

   ```shell
   which python3 # Should see output like /usr/bin/python3
   ```
   
   You should see an execution path if Python3 is installed. If not, install it and type `which python3` again in a new terminal window.

#### Installing Verdaccio
1. Install Verdaccio using NPM or Yarn:

   ```shell
   # Ensure Verdaccio compatibility with vets-website
   nvm use 14.15.0

   # If you're using NPM
   npm install --location=global verdaccio@5.5.0

   # If you're using Yarn
   yarn global add verdaccio@5.5.0
   ```
1. Verify Verdaccio was installed correctly.

   ```shell
   verdaccio --version # Should see output like v5.5.0
   ```
1. Start Verdaccio on your local machine. The server will be running at `localhost:4873`.

   ```shell
   verdaccio
   ```
1. Create a new Verdaccio user by entering this command and following the prompts.

   ```shell
   npm adduser --registry http://localhost:4873/
   ```

#### Publish your component-library changes to Verdaccio
The next step is to update the `core` and `web-component` package versions in their respective `package.json` files. _**Note:** You must use Node `v18.x.x` or `v20.x.x` for this step._

1. Navigate to `component-library` and switch to Node `[18, 20]`

   ```shell
   cd component-library/
   nvm use 18.x.x # Or version 20
   nvm use 20.x.x
   ```
1. Navigate to `packages/web-components` and update the package version. Assuming the current version is `10.1.1`, you could change the version to `10.1.2-rc1` or something similar.

   ```diff
   ! packages/web-components/package.json

   - "version": "10.1.1"
   + "version": "10.1.2-rc1"
   ```
2. Navigate to `packages/core` and update the package version using the same logic

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
   cd ../packages/core/
   npm publish --registry http://localhost:4873
   ```
6. Publish the `web-component` package to Veraccio

   ```shell
   cd ../packages/web-components/
   npm publish --registry http://localhost:4873
   ```

#### Link `vets-website` to local Verdaccio registry
You're now ready to switch to `vets-website` and update the VADS dependency. _**Note:** You must use Node `v14.15.0` for this step._

1. Run the following commands to point to your local Verdaccio registry

   ```shell
   cd vets-website/
   nvm use 14.15.0 # Ensure correct Node version
   yarn config set registry http://localhost:4873
   npm config set registry http://localhost:4873
   ```
2. Add the local `core` package to `vets-website` and start the server

   ```shell
   yarn add -W @department-of-veterans-affairs/component-library@vX.X.rc-1
   yarn watch
   ```

#### Reverting to the default registry
After you are finished testing, reset `vets-website` to use the standard registry. _**Note:** You must use Node `v14.15.0` for this step._

   ```shell
   # Using NPM
   nvm use 14.15.0 # Ensure correct Node version
   npm config set registry https://registry.yarnpkg.com/

   # Or using Yarn
   nvm use 14.15.0
   yarn config set registry https://registry.yarnpkg.com/
   yarn config set npmRegistryServer https://registry.yarnpkg.com/
   ```

#### Troubleshooting
1. If you encounter Webpack errors during the `yarn watch` step in `vets-website`, try deleting the `node_modules/` folder, then reinstalling dependencies.

   ```shell
   cd vets-website/
   rm -rf node_modules/ # Careful with this one
   yarn install
   yarn watch
   ```
2. If you encounter errors in the `component-library` or `vets-website` build or watch steps, try changing your Node version.

   ```shell
   nvm use 14.15.0
   nvm use 18.x.x OR nvm use 20.x.x
   ```

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

Releases will occur minimally at the beginning of each sprint (every other Thursday), and may additionally be performed as-needed when critical bug fixes need to go out. Reach out to via #vfs-platform-support or #platform-design-system if you have a need for an unscheduled release.

**For Design System Team only:**

1. If you are unsure if a new release should be created, check with the Release Manager and/or the team first.
   - The DST Release Manager is the engineer on duty for the weekly support rotation.
2. Create a new PR that updates the package.json version in the **packages that updates have been made**:
   - `core` (required) - [packages/core/package.json](https://github.com/department-of-veterans-affairs/component-library/blob/main/packages/core/package.json#L4) must be updated for the workflow
   - `web-components`
   - `css-library`
   - `react-components`
3. From the [repo's homepage](https://github.com/department-of-veterans-affairs/component-library) click on "Releases" in the right-hand sidebar.
4. Click on the "Draft a new release" button near the top of the page.
5. Click on the "Choose a tag" drop-down and type the letter `v` followed by the new "core" version number. The target should remain `main`.
   - Example: `v16.1.0`
6. For the release title, type the same thing you entered for the tag.
   - Example: `v16.1.0`
7. Click on the "Generate release notes" button. 
   - If the button is disabled, double-check that the tag/version number is correct and hasn't been released before.
8. Review the release notes for any typos and/or unneeded notes. 
   - The release notes are intended for public use so they should be professional in tone, easily understandable, and concise.
9. Ensure the "Set as the latest release" checkbox is checked.
10. Take a screenshot of the release notes and post in the `#platform-design-system-team` channel on Slack. 
    - This is to double-check that everything looks good and that there aren't any last-minute additions to the release that need to be included.
11. Click the "Publish release" button. GitHub Actions will take care of any necessary build and publishing steps.
    - You can watch to make sure the release is created successfully from the [Github Actions tab](https://github.com/department-of-veterans-affairs/component-library/actions).
12. Create a PR for the following repositories that updates the `component-library` dependency versions:
    - [vets-website](https://github.com/department-of-veterans-affairs/vets-website)
    - [content-build](https://github.com/department-of-veterans-affairs/content-build)
    - [vets-design-system-documentation](https://github.com/department-of-veterans-affairs/vets-design-system-documentation)

