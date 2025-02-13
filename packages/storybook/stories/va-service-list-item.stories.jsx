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
  action: {
    control: { type: 'object' },
    type: { name: 'object', required: false },
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
        icon="description"
      />
      <BaseWithOptionalLink
        {...BaseWithOptionalLink.args}
        serviceDetails={{ 'Application submission date': 'September 14, 2012' }}
        serviceName="Pension"
        icon="handshake"
        serviceStatus="In Progress"
      />
      <BaseWithCriticalInformation
        {...BaseWithCriticalInformation.args}
        serviceDetails={{
          'Enrolled on:': 'February 9, 2010',
          'Policy': 'FSGLI',
          'Accelerated payments': 'Approved',
        }}
        serviceName="Life insurance"
        icon="shield"
        serviceStatus="Active"
      />
    </div>
  );
};
