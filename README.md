This module contains reusable react components from [vets-website](https://github.com/department-of-veterans-affairs/vets-website) housed in its design system [repo](https://github.com/department-of-veterans-affairs/design-system).

## Quick start

`npm install @department-of-veterans-affairs/formation-react`

`import COMPONENTNAME from '@department-of-veterans-affairs/formation-react/COMPONENTNAME'`

See [design
system](https://department-of-veterans-affairs.github.io/veteran-facing-services-tools/visual-design)
or
[Storybook](https://design.va.gov/storybook/?path=/story/about-introduction--page).

## Running Storybook locally
From the project root, run the following commands:
1. `yarn install`
1. `cd packages/formation-react`
1. `yarn install`
    - It's a Lerna thing. For some reason, it doesn't work without _both_
      installs. ¯\_(ツ)_/¯
1. `yarn storybook`

## Included components:

- AdditionalInfo.js
- AlertBox.js
- Breadcrumbs.js
- Checkbox.js
- Date.js
- FileInput.js
- MonthYear.js
- NumberInput.js
- RadioButtons.js
- Select.js
- TextArea.js
- TextInput.js
- ExpandingGroup.js
- IconBase.js
- IconHelp.js
- IconSearch.js
- IconUser.js
- LoadingIndicator.js
- Modal.js
- OMBInfo.js
- Pagination.js
- PrivacyAgreement.js
- ProgressBar.js
- ProgressButton.js
- SearchMenu.js
- SegmentedProgressBar.js
- SystemDownView.js
- Table.js
- Telephone.js
- Tooltip.js
