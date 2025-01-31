import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const serviceListDocs = getWebComponentDocs('va-service-list');

export default {
  title: 'Components/Service list',
  id: 'components/va-service-list',
  parameters: {
    componentSubtitle: 'va-service-list web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={serviceListDocs} />,
    },
  },
};

const Template = (args) => {
    const ref = React.useRef(null);
    const { serviceDetails, icon, serviceName, serviceStatus, action, optionalLink } = args

    React.useEffect(() => {
        if (ref.current) {
            Object.entries(args).forEach(([key, value]) => {
                ref.current[key] = value; 
            });
        }
    }, [args]);
      
  return (
    <va-service-list
      ref={ref}
      key={JSON.stringify(args)}
      serviceDetails={JSON.stringify(serviceDetails)}
      icon={icon}
      serviceName={serviceName}
      serviceStatus={serviceStatus}
      action={JSON.stringify(action)}
      optionalLink={optionalLink}
    />
  );
};


export const Default = Template.bind({});
Default.args = {
  serviceDetails: {
    'Approved on': 'May 5, 2011',
    'Program': 'Post-9/11 GI Bill',
    'Eligibility': '70%',
  },
  icon: 'school',
  serviceName: 'Education',
  serviceStatus: 'Eligible',
  action: { href: 'https://www.va.gov/education', text: 'Verify income' },
  optionalLink: 'https://www.va.gov',
};
Default.argTypes = propStructure(serviceListDocs);