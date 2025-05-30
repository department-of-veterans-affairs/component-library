<!-- PR title naming convention:
'[component-name]: Brief summary of issue suitable for the release notes',
-->

## Chromatic
<!-- DO NOT REMOVE - This `{{head.ref}}` is a placeholder for a CI job - it will be updated automatically -->
https://{{head.ref}}--65a6e2ed2314f7b8f98609d8.chromatic.com

## Configuring this pull request
- [ ] Add the appropriate [version label](https://github.com/department-of-veterans-affairs/component-library#how-to-choose-a-version-number) to the PR (`major`, `minor`, `patch`, `css-library`, or `ignore-for-release`).
    - Use `ignore-for-release` if a file has not been changed in one of the following packages: 
        - `css-library`
        - `web-components`
        - `react-components`
        - `core`
    - Use `css-library` if a file has been changed in the `css-library` package.
- [ ] Add additional review groups as needed:
    - Accessibility: [platform-design-system-a11y](https://github.com/orgs/department-of-veterans-affairs/teams/platform-design-system-a11y)
    - Designer: [platform-design-system-designer](https://github.com/orgs/department-of-veterans-affairs/teams/platform-design-system-designers)
- [ ] Complete all sections below.
- [ ] Delete this section once the above configuration steps have been completed.

## Description

<!-- Describe the change and context.

Consider:
    - What is relevant to code reviewer(s)?
    - What context may be relevant to a future dev or you in 6 months about this PR?
    - Did the course of work lead to notable dead ends? If so, why didn't they pan out?
 -->

## Related Tickets and Links

<!-- Link to any related issues, PRs, Slack conversations, or anything else relevant to documenting the changes.
-->

Closes <ticket>

## Screenshots

<!-- If there are any visual changes, screenshots should be added here. -->

## Required Approvals Before Merging
See [QA Checklists](#qa-checklists) for required approvals. Use your best judgment to determine if additional reviews are needed. When in doubt, request a review.

**Approval Teams**
- Engineering: [platform-design-system-fe](https://github.com/orgs/department-of-veterans-affairs/teams/platform-design-system-fe)
- Accessibility: [platform-design-system-a11y](https://github.com/orgs/department-of-veterans-affairs/teams/platform-design-system-a11y)
- Designer: [platform-design-system-designer](https://github.com/orgs/department-of-veterans-affairs/teams/platform-design-system-designers)

## QA Checklists

Use these checklists as guides, not rules. Not all checklists will apply to every PR but there could be some overlap.

<details>
  <summary>✨ New Component Added</summary>

- [ ] The component matches the [Figma](https://www.figma.com/files/1499394822283304153/project/105082786?fuid=1192586511403544015) designs.
- [ ] All properties, custom events, and utility functions have e2e and/or unit tests
- [ ] A new Storybook page has been added for the component
- [ ] Tested in all [VA breakpoints](https://design.va.gov/foundation/breakpoints).
- [ ] Chromatic UI Tests have run and snapshot changes have been accepted by the design reviewer
- [ ] Tested in vets-website using [Verdaccio](https://github.com/department-of-veterans-affairs/component-library?tab=readme-ov-file#local-testing-in-vets-website-with-verdaccio)
- [ ] **Engineering** has approved the PR
- [ ] **Design** has approved the PR
- [ ] **Accessibility** has approved the PR
</details>

<details>
  <summary>🌱 New Component Variation Added</summary>

- [ ] The variation matches its [Figma](https://www.figma.com/files/1499394822283304153/project/105082786?fuid=1192586511403544015) design.
- [ ] Any new properties, custom events, or utility functions have e2e and/or unit tests
- [ ] A new story has been added to the component's existing Storybook page
- [ ] Any Chromatic UI snapshot changes have been accepted by a design reviewer
- [ ] Tested in vets-website using [Verdaccio](https://github.com/department-of-veterans-affairs/component-library?tab=readme-ov-file#local-testing-in-vets-website-with-verdaccio)
- [ ] **Engineering** has approved the PR
- [ ] **Design** has approved the PR
</details>

<details>
  <summary>🐞 Component Fix</summary>

- [ ] Any new properties, custom events, or utility functions have e2e and/or unit tests
- [ ] Any markup changes are evaluated for impact on vets-website
- [ ] Any Chromatic UI snapshot changes have been reviewed and approved by a designer if necessary
- [ ] **Engineering** has approved the PR
</details>

<details>
  <summary>🚨 Component Fix - Breaking API Change</summary>

- [ ] vets-website has been checked to determine the impact of the breaking change
- [ ] Any new properties, custom events, or utility functions have e2e and/or unit tests
- [ ] Any Chromatic UI snapshot changes have been reviewed and approved by a designer if necessary
- [ ] Tested in vets-website using [Verdaccio](https://github.com/department-of-veterans-affairs/component-library?tab=readme-ov-file#local-testing-in-vets-website-with-verdaccio)
- [ ] **Engineering** has approved the PR
</details>

<details>
  <summary>♿️ Component Fix - Accessibility</summary>

- [ ] Any new properties, custom events, or utility functions have e2e and/or unit tests
- [ ] Any Chromatic UI snapshot changes have been reviewed and approved by a designer if necessary
- [ ] **Engineering** has approved the PR
- [ ] **Accessibility** has approved the PR
</details>

<details>
  <summary>📖 Storybook Update</summary>

- [ ] Any Chromatic UI snapshot changes have been reviewed and approved by a designer if necessary
- [ ] **Engineering** has approved the PR
</details>

<details>
  <summary>🎨 CSS-Library Update</summary>

- [ ] The PR has the `css-library` label
- [ ] **Engineering** has approved the PR
</details>
