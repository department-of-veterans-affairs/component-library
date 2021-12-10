This module contains reusable React and Web components for the VA.gov [design system](https://design.va.gov) published as an [NPM package](https://www.npmjs.com/package/@department-of-veterans-affairs/component-library) for use in the [vets-website](https://github.com/department-of-veterans-affairs/vets-website) frontend codebase.

## Quick start

`npm install @department-of-veterans-affairs/component-library`

`import { COMPONENTNAME } from '@department-of-veterans-affairs/component-library'`

See [design system](https://design.va.gov/components/) or [Storybook](https://design.va.gov/storybook/?path=/story/about-introduction--page) for a full list of available components.

## Contributing

The issue tracker is disabled on this repo. To request a new component or a feature enhancement, please [open an issue here](https://github.com/department-of-veterans-affairs/vets-design-system-documentation/issues/new?assignees=&labels=vsp-design-system-team&template=feature_request.md)

## Running Storybook locally

From the `packages/storybook` directory, run the following commands:

1. `yarn install`
1. `yarn storybook`

## Web Components

The Design System team is working on replacing the React components in this library with Web Component versions. This isn't _just_ a React replacement however - part of the goal is to have true components that can be used outside of React in plain HTML pages.

### Usage

To use these Web Components in your own project, follow the [installation steps](https://design.va.gov/documentation/developers#load-the-web-component-library). This will allow the components to be used in JSX or HTML.

## Making a release

Include a list of changes when you create a new release. Each bullet point should be one or two clear sentences. We have been using [Keep a changelog](https://keepachangelog.com/en/1.0.0/) informally and have had good success with it.

## Publishing Module to NPM

After you've tested and previewed your changes locally it's time to publish a new version of the package to NPM.

> Prerequisite: you must be [registered](https://docs.npmjs.com/getting-started/publishing-npm-packages) with NPM, be a member of the "department-of-veterans-affairs" organization, and have the appropriate organization role to publish an update to the module. Verify that you are logged in correctly by running `npm whoami`. If you are unable to publish an update, confirm you are a member of the "department-of-veterans-affairs" organization by going to your Profile page on [npmjs.com](https://www.npmjs.com).

### 1. Submit your PR

Submit a PR that includes all of your code changes. This should include the bump in versions you need, which you can change directly in the `package.json` files for the modules that are changing. Modules like `component-library` depend on `formation` via a peer dependency, so you may need to update that as well. We try to keep the peer dependency loose and only update it for breaking changes.

Please add a clear list of changes to your PR description. We have been using [Keep a changelog](https://keepachangelog.com/en/1.0.0/) informally and have had good success with it.

You'll need to choose what type of version update to make:

- `patch` - for bug fixes and minor changes
- `minor` - for new features that don't break current features or require changes in consuming applications
- `major` - for backwards breaking changes

> If you are unsure of what to pick, do a major version update on modules that are changing.

### 2. Merge your PR to master

Once your changes are approved, squash merge them to master. Also, if your change is a breaking change, please prefix your commit message with `BREAKING CHANGE:`. Also keep in mind that your commit messages will be in a changelog that people use to figure out what has changed between releases, so make sure it accurately describes your changes.

### 3. Build and publish

- Checkout the master branch
- Run `yarn build`
- Run `npm publish`

<!--

### 4. Create a release

You will need a github [personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).
This should be set as **GITHUB_API_KEY** in your environment variable.

- Navigate to the package folder
- Run the release script
  ```
  $ yarn release
  ```
- Once the script has succeeded, go to the link provided in the console
- Edit the release and add any relevant information.

-->

### 4. Update consuming apps

The last step is to update the `package.json` files of consuming apps to use the latest version of `@department-of-veterans-affairs/formation` (or `component-library`). For example, if you are working with the `vets-website` project, open the `vets-website`'s `package.json` to update the version number of the `@department-of-veterans-affairs/formation` entry listed in the `dependencies` section. The version number should match what you just published to NPM.
