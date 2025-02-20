import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const serviceListItemDocs = getWebComponentDocs('va-service-list-item');

export default {
  title: 'Components/Service list item',
  id: 'components/va-service-list-item',
  parameters: {
    componentSubtitle: 'va-service-list-item web component',
    docs: {
      page: () => (
        <StoryDocs storyDefault={MaximalBase} data={serviceListItemDocs} />
      ),
    },
  },
};

const Template = args => {
  const ref = React.useRef(null);
  const {
    serviceDetails,
    icon,
    serviceName,
    serviceLink,
    serviceStatus,
    action,
    optionalLink,
  } = args;

  React.useEffect(() => {
    if (ref.current) {
      Object.entries(args).forEach(([key, value]) => {
        ref.current[key] = value;
      });
    }
  }, [args]);

  return (
    <va-service-list-item
      ref={ref}
      key={JSON.stringify(args)}
      serviceDetails={JSON.stringify(serviceDetails)}
      icon={icon}
      serviceName={serviceName}
      serviceLink={serviceLink}
      serviceStatus={serviceStatus}
      action={JSON.stringify(action)}
      optionalLink={JSON.stringify(optionalLink)}
    />
  );
};

export const MaximalBase = Template.bind({});
MaximalBase.args = {
  serviceDetails: {
    'Approved on': 'May 5, 2011',
    'Program': 'Post-9/11 GI Bill',
    'Eligibility': '70%',
  },
  icon: 'school',
  serviceName: 'Education',
  serviceLink: 'https://www.va.gov/education',
  serviceStatus: 'Eligible',
  action: {
    href: 'https://www.va.gov/education',
    text: 'Take some urgent action',
  },
  optionalLink: {
    href: 'https://www.va.gov',
    text: 'Optional link (to a page other than the detail page)',
  },
};

MaximalBase.argTypes = {
  ...propStructure(serviceListItemDocs),
  serviceDetails: {
    description: 'Details about the service',
    control: { type: 'object' },
    table: { category: 'Properties', type: { summary: 'ServiceDetails | string' } },
  },
  icon: {
    description: 'The icon associated with the service',
    control: { type: 'text' },
    table: { category: 'Properties', type: { summary: 'string' } },
  },
  serviceName: {
    description: 'The name of the service',
    control: { type: 'text' },
    table: { category: 'Properties', type: { summary: 'string' } },
  },
  serviceNameHeadingLevel: {
    description: 'The heading level for the service name (defaults to h3)',
    control: { type: 'number', min:2, max:6, },
    table: { category: 'Properties', type: { summary: 'number' }, defaultValue: { summary: 3 } },
  },
  serviceLink: {
    description: 'The link to the service page',
    control: { type: 'text' },
    table: { category: 'Properties', type: { summary: 'string' } },
  },
  serviceStatus: {
    description: 'The status of the service',
    control: { type: 'text' },
    table: { category: 'Properties', type: { summary: 'string' } },
  },
  action: {
    description: 'Action associated with the service',
    control: { type: 'object' },
    type: { name: 'object', required: false },
    table: { category: 'Properties', type: { summary: 'ServiceAction | string' } },
  },
  optionalLink: {
    description: 'An optional link related to the service',
    control: { type: 'object' },
    table: { category: 'Properties', type: { summary: 'OptionalLink | string' } },
  },
  'service-details': {
    table: { disable: true },
  },
  'service-name': {
    table: { disable: true },
  },
  'service-link': {
    table: { disable: true },
  },
  'optional-link': {
    table: { disable: true },
  },
  'service-status': {
    table: { disable: true },
  },
  'service-name-heading-level': {
    table: { disable: true },
  },
};

export const MinimalBase = Template.bind({});
MinimalBase.args = {
  serviceDetails: {
    'Approved on': 'May 5, 2011',
    'Program': 'Post-9/11 GI Bill',
  },
  icon: 'school',
  serviceName: 'Education',
  serviceLink: 'https://www.va.gov/education',
  serviceStatus: 'Eligible',
};

export const BaseWithOptionalLink = Template.bind({});
BaseWithOptionalLink.args = {
  serviceDetails: {
    'Approved on': 'May 5, 2011',
    'Program': 'Post-9/11 GI Bill',
  },
  icon: 'school',
  serviceName: 'Education',
  serviceLink: 'https://www.va.gov/education',
  serviceStatus: 'Eligible',
  optionalLink: {
    href: 'https://www.va.gov',
    text: 'Optional link (to a page other than the detail page)',
  },
};

export const BaseWithCriticalInformation = Template.bind({});
BaseWithCriticalInformation.args = {
  serviceDetails: {
    'Approved on': 'May 5, 2011',
    'Program': 'Post-9/11 GI Bill',
  },
  icon: 'school',
  serviceName: 'Education',
  serviceLink: 'https://www.va.gov/education',
  serviceStatus: 'Eligible',
  action: {
    href: 'https://www.va.gov/education',
    text: 'Take some urgent action',
  },
};

export const ServiceListWithMultipleServiceListItems = ({}) => {
  return (
    <div>
      <MaximalBase {...MaximalBase.args} />
      <MinimalBase
        {...MinimalBase.args}
        serviceDetails={{
          'Approved on': 'May 5, 2011',
          'Combined disability rating': '90%',
          'Monthly compensation': '$2,345.67',
          'Payment start date': 'November 1, 2011',
        }}
        serviceName="Disability compensation"
        serviceLink="https://www.va.gov/disability"
        icon="description"
      />
      <BaseWithOptionalLink
        {...BaseWithOptionalLink.args}
        serviceDetails={{ 'Application submission date': 'September 14, 2012' }}
        serviceName="Pension"
        serviceLink="https://www.va.gov/pension"
        icon="handshake"
        serviceStatus="In Progress"
      />
      <BaseWithCriticalInformation
        {...BaseWithCriticalInformation.args}
        serviceDetails={{
          'Enrolled on': 'February 9, 2010',
          'Policy': 'FSGLI',
          'Accelerated payments': 'Approved',
        }}
        serviceName="Life insurance"
        serviceLink="https://www.va.gov/life-insurance"
        icon="shield"
        serviceStatus="Active"
      />
    </div>
  );
};

ServiceListWithMultipleServiceListItems.parameters = {
  docs: {
    source: {
      code: `
<div>
  <va-service-list-item
    serviceDetails='{"Approved on": "May 5, 2011", "Program": "Post-9/11 GI Bill", "Eligibility": "70%"}'
    icon="school"
    serviceName="Education"
    serviceLink="https://www.va.gov/education"
    serviceStatus="Eligible"
    action='{"href": "https://www.va.gov/education", "text": "Take some urgent action"}'
    optionalLink='{"href": "https://www.va.gov", "text": "Optional link (to a page other than the detail page)"}'
  ></va-service-list-item>

  <va-service-list-item
    serviceDetails='{"Approved on": "May 5, 2011", "Combined disability rating": "90%", "Monthly compensation": "$2,345.67", "Payment start date": "November 1, 2011"}'
    icon="description"
    serviceName="Disability compensation"
    serviceLink="https://www.va.gov/disability"
    serviceStatus="Eligible"
  ></va-service-list-item>

  <va-service-list-item
    serviceDetails='{"Application submission date": "September 14, 2012"}'
    icon="handshake"
    serviceName="Pension"
    serviceLink="https://www.va.gov/pension"
    serviceStatus="In Progress"
    optionalLink='{"href": "https://www.va.gov", "text": "Optional link (to a page other than the detail page)"}'
  ></va-service-list-item>

  <va-service-list-item
    serviceDetails='{"Enrolled on": "February 9, 2010", "Policy": "FSGLI", "Accelerated payments": "Approved"}'
    icon="shield"
    serviceName="Life insurance"
    serviceLink="https://www.va.gov/life-insurance"
    serviceStatus="Active"
    action='{"href": "https://www.va.gov/education", "text": "Take some urgent action"}'
  ></va-service-list-item>
</div>
      `,
    },
  },
};