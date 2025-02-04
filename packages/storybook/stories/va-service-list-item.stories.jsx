import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const serviceListItemDocs = getWebComponentDocs('va-service-list-item');

export default {
  title: 'Components/Service List Item',
  id: 'components/va-service-list-item',
  parameters: {
    componentSubtitle: 'va-service-list-item web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={serviceListItemDocs} />,
    },
  },
};

const Template = (args) => {
    const ref = React.useRef(null);
    const { serviceDetails, icon, serviceName, serviceLink, serviceStatus, action, optionalLink } = args

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
  serviceLink: 'https://www.va.gov/education',
  serviceStatus: 'Eligible',
  action: { href: 'https://www.va.gov/education', text: 'Verify income' },
  optionalLink: { href: 'https://www.va.gov', text: 'Optional link (to a page other than the detail page)' },
};

Default.argTypes = propStructure(serviceListItemDocs);