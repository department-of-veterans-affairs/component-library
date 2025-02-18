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
  },
  icon: {
    description: 'The icon associated with the service',
  },
  serviceName: {
    description: 'The name of the service',
  },
  serviceLink: {
    description: 'The link to the service page',
  },
  serviceStatus: {
    description: 'The status of the service',
  },
  action: {
    description: 'Action associated with the service',
    control: { type: 'object' },
    type: { name: 'object', required: false },
  },
  optionalLink: {
    description: 'An optional link related to the service',
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