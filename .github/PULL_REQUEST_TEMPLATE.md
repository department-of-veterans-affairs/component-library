## Chromatic
<!-- DO NOT REMOVE - This `{{head.ref}}` is a placeholder for a CI job - it will be updated automatically -->
https://{{head.ref}}--65a6e2ed2314f7b8f98609d8.chromatic.com

## Configuring this pull request
- [ ] Add the appropriate [version patch label](https://github.com/department-of-veterans-affairs/component-library#how-to-choose-a-version-number) (`major`, `minor`, `patch`, or `ignore-for-release`).
    - Use `ignore-for-release` if a file has not been changed in one of the following packages: 
        - `css-library`
        - `web-components`
        - `react-components`
        - `core`
- [ ] Complete all sections below.
- [ ] Delete this section once complete

<!--
See also the Code Review Guiding Principles and Review guide for the component-library (internal link):
    https://vfs.atlassian.net/wiki/spaces/DST/pages/3509026855/Code+Review+Guiding+Principles+and+Review+guide+for+the+component-library
-->

## Description

<!-- 
Add a description even if it's just a short summary. Try not to make the reviewer figure out what the PR is trying to accomplish and don’t make assumptions about their understanding of the changes.
-->

## Related Tickets or Links

<!-- 
Link to any related tickets or links that are relevant to the PR.
-->

Closes <ticket>

## Screenshots

<!-- 
If there are any visual changes, screenshots should be added here.
-->

## Required Approvals Before Merging
- [ ] **Engineer** has approved the PR
- [ ] **Accessibility** has approved the PR 🔅
- [ ] **Designer** has approved the PR 🔅

## QA Checklist
- [ ] Design maintains 1:1 parity with [Figma](https://www.figma.com/files/1499394822283304153/project/105082786?fuid=1192586511403544015). 
- [ ] New features are covered by e2e and/or unit tests; updates to existing components are covered by existing test suite
- [ ] Chromatic has been run and any changes have been approved
- [ ] Component behaves as expected across breakpoints 🔅
- [ ] Tab order and focus state work as expected 🔅
- [ ] Changes have been tested against screen readers 🔅
- [ ] Changes have been tested in vets-website using Verdaccio 🔅

## Acceptance criteria
- [ ] QA checklist has been completed
- [ ] Screenshots have been attached that cover desktop and mobile screens

## Definition of done
- [ ] Documentation has been updated 🔅
- [ ] A link has been provided to the originating GitHub issue

🔅 If applicable to the changes. If not applicable, provide reason why.