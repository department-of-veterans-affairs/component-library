<!-- 
ℹ️ PR title naming convention:
[component-name]: brief summary suitable for the release notes
-->

<!-- 
🏷️ PR Setup - Add a label
Label Guidelines:
    - Review the [version change examples](https://github.com/department-of-veterans-affairs/component-library?tab=readme-ov-file#how-to-choose-a-version-number) in the README.
    - Use `major`, `minor`, `patch` for changes to the `web-components` or `react-components` packages.
    - Use `css-library` if a file has been changed in the `css-library` package.
    - Use `ignore-for-release` if a file has not been changed in one of the following packages: 
        - `css-library`
        - `web-components`
        - `react-components`
        - `core`
-->

## Chromatic
<!-- DO NOT REMOVE - This `{{head.ref}}` is a placeholder for a CI job - it will be updated automatically -->
https://{{head.ref}}--65a6e2ed2314f7b8f98609d8.chromatic.com\

## Description

<!-- 
Describe the change and context.
Consider:
    - What is relevant to code reviewer(s)?
    - What context may be relevant to a future dev or you in 6 months about this PR?
    - Did the course of work lead to notable dead ends? If so, why didn't they pan out?
 -->

## Related Tickets and Links

<!-- 
Link to any related issues, PRs, Slack conversations, or anything else relevant to documenting the changes.
-->

Closes <ticket>

## Screenshots

<!-- 
If there are any visual changes, screenshots should be added here. 
-->

## Testing and review

<!--
Provide any testing instructions or review steps as needed.

For example: 
- [ ] When you type "+1", the component returns filtered all options with the "+1" country code.
- [ ] When you type "123", the component returns filtered all options with the "123" area code.
-->

## Approvals
See the QA Checklists section below for suggested approvals. Use your best judgment if additional reviews are needed. When in doubt, request a review.

**Approval Groups**

Add approval groups to the PR as needed:

- Engineering: [platform-design-system-fe](https://github.com/orgs/department-of-veterans-affairs/teams/platform-design-system-fe)
- Accessibility: [platform-design-system-a11y](https://github.com/orgs/department-of-veterans-affairs/teams/platform-design-system-a11y)
- Design: [platform-design-system-designer](https://github.com/orgs/department-of-veterans-affairs/teams/platform-design-system-designers)

## QA Checklists

Use the QA checklists below as guides, not rules. Not all checklists will apply to every PR but there could be some overlap.

In all scenarios, changes should be fully tested by the author and verified by the reviewer(s); functionality, responsiveness, etc.

<details>
  <summary>✨ New Component Added</summary>

- [ ] The PR has the `minor` label
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

- [ ] The PR has the `minor` label
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

- [ ] The PR has the `patch` label
- [ ] Any new properties, custom events, or utility functions have e2e and/or unit tests
- [ ] Any markup changes are evaluated for impact on vets-website.
    - Will any vets-website tests fail from the change?
- [ ] Any Chromatic UI snapshot changes have been reviewed and approved by a designer if necessary
- [ ] **Engineering** has approved the PR
</details>

<details>
  <summary>♿️ Component Fix - Accessibility</summary>

- [ ] The PR has the `patch` label
- [ ] Any new properties, custom events, or utility functions have e2e and/or unit tests
- [ ] Any Chromatic UI snapshot changes have been reviewed and approved by a designer if necessary
- [ ] **Engineering** has approved the PR
- [ ] **Accessibility** has approved the PR
</details>

<details>
  <summary>🚨 Component Fix - Breaking API Change</summary>

- [ ] The PR has the `major` label
- [ ] vets-website and content-build have been evaluated to determine the impact of the breaking change
- [ ] Any new properties, custom events, or utility functions have e2e and/or unit tests
- [ ] Any Chromatic UI snapshot changes have been reviewed and approved by a designer if necessary
- [ ] Tested in vets-website using [Verdaccio](https://github.com/department-of-veterans-affairs/component-library?tab=readme-ov-file#local-testing-in-vets-website-with-verdaccio)
- [ ] **Engineering** has approved the PR
</details>

<details>
  <summary>🔧 Component Update - Non-Breaking API Change</summary>

- [ ] The PR has the `minor` label
- [ ] Any new properties, custom events, or utility functions have e2e and/or unit tests
- [ ] Any Chromatic UI snapshot changes have been reviewed and approved by a designer if necessary
- [ ] **Engineering** has approved the PR
</details>

<details>
  <summary>📖 Storybook Update</summary>

- [ ] The PR has the `ignore-for-release` label
- [ ] Any Chromatic UI snapshot changes have been reviewed and approved by a designer if necessary
- [ ] **Engineering** has approved the PR
</details>

<details>
  <summary>🎨 CSS-Library Update</summary>

- [ ] The PR has the `css-library` label
- [ ] vets-website and content-build have been checked to determine the impact of any breaking changes
- [ ] **Engineering** has approved the PR
</details>
