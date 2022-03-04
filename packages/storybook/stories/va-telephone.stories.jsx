import React from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';

import { getWebComponentDocs, propStructure } from './wc-helpers';

const telephoneDocs = getWebComponentDocs('va-telephone');

const columns = ['Property name (CONTACTS.x)', 'Phone number', 'Description'];
const rows = [
  ['222_VETS', '8772228387', 'VA Help Line'],
  ['4AID_VET', '8774243838', 'National Call Center for Homeless Veterans'],
  ['711', '711', 'Telecommunications Relay Service'],
  ['911', '911', '911'],
  ['CAREGIVER', '8552603274', 'VA National Caregiver Support Line'],
  ['CRISIS_LINE', '8002738255', 'Veterans Crisis hotline'],
  ['CRISIS_TTY', '8007994889', 'Veterans Crisis hotline TTY'],
  ['DMC', '8008270648', 'Debt Management Center'],
  ['DMC_OVERSEAS', '6127136415', 'Debt Management Center (Overseas)'],
  [
    'DMDC_DEERS',
    '8663632883',
    'Defense Manpower Data Center (DMDC) | Defense Enrollment Eligibility Reporting System (DEERS) Support Office',
  ],
  ['DS_LOGON', '8005389552', 'Defense Manpower Data Center'],
  ['DS_LOGON_TTY', '8663632883', 'Defense Manpower Data Center TTY'],
  ['FEDERAL_RELAY_SERVICE', '8008778339', 'Federal Relay Service'],
  ['GI_BILL', '8884424551', 'Education Call Center (1-888-GI-BILL-1)'],
  ['GO_DIRECT', '8003331795', 'Go Direct/Direct Express (Treasury)'],
  ['HELP_DESK', '8006982411', 'VA Help desk'],
  [
    'HEALTHCARE_ELIGIBILITY_CENTER',
    '8554888440',
    'VA Healthcare Eligibility Center (Eligibility Division)',
  ],
  ['HELP_TTY', '8008778339', 'VA Help Desk TTY'],
  ['MY_HEALTHEVET', '8773270022', 'My HealtheVet help desk'],
  ['NCA', '8005351117', 'National Cemetery Scheduling Office'],
  ['SUICIDE_PREVENTION_LIFELINE', '8007994889', 'Suicide Prevention Line'],
  ['TESC', '8882242950', 'U.S. Treasury Electronic Payment Solution Center'],
  [
    'TREASURY_DMS',
    '8888263127',
    'U.S. Department of the Treasury (Debt Management Services)',
  ],
  ['VA_311', '8006982411', 'VA Help desk (VA411)'],
  ['VA_411', '8006982411', 'VA Help desk (VA411)'],
  ['VA_BENEFITS', '8008271000', 'Veterans Benefits Assistance'],
];
const Contacts = () => (
  <va-table>
    <va-table-row slot="headers">
      {columns.map((col, i) => (
        <span key={i}>{col}</span>
      ))}
    </va-table-row>
    {rows.map((row, i) => (
      <va-table-row key={i}>
        {row.map((item, i) => {
          if (i === 1) {
            return <va-telephone contact={item} key={i}/>;
          } else {
            return <span key={i}>{item}</span>;
          }
        })}
      </va-table-row>
    ))}
  </va-table>
);

const Page = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Contacts />
    <br />
    <Stories />
  </>
);

export default {
  title: 'Components/va-telephone',
  parameters: {
    actions: {
      handles: ['component-library-analytics'],
    },
    docs: {
      page: Page,
    },
  },
};

const Template = ({
  contact,
  extension,
  'not-clickable': notClickable,
  international,
  ariaDescribedby,
}) => {
  return (
    <div>
      {ariaDescribedby && (
        <span id={ariaDescribedby}>Phone number title: </span>
      )}
      <va-telephone
        contact={contact}
        extension={extension}
        not-clickable={notClickable}
        international={international}
        aria-describedby={ariaDescribedby}
      ></va-telephone>
    </div>
  );
};

const defaultArgs = {
  'contact': '8773459876',
  'extension': undefined,
  'not-clickable': false,
  'international': false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(telephoneDocs);

export const ThreeDigitNumber = Template.bind({});
ThreeDigitNumber.args = {
  ...defaultArgs,
  contact: '711',
};

export const Extension = Template.bind({});
Extension.args = {
  ...defaultArgs,
  extension: '123',
};

export const NotClickable = Template.bind({});
NotClickable.args = {
  ...defaultArgs,
  'not-clickable': true,
};

export const International = Template.bind({});
International.args = {
  ...defaultArgs,
  international: true,
};

export const AriaDescribedBy = Template.bind({});
AriaDescribedBy.args = {
  ...defaultArgs,
  ariaDescribedby: 'numberDescription',
};

export const VanityNumber = Template.bind({});
VanityNumber.args = {
  ...defaultArgs,
  contact: '877222VETS',
};