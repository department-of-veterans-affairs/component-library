import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { VaSearchFilter } from '@department-of-veterans-affairs/web-components/react-bindings';

VaSearchFilter.displayName = 'VaSearchFilter';

const searchFilterDocs = getWebComponentDocs('va-search-filter');

export default {
  title: 'Components/Search Filter',
  id: 'components/va-search-filter',
  parameters: {
    componentSubtitle: 'va-search-filter web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={searchFilterDocs} />,
    },
  },
  argTypes: {
    resize: {
      table: {
        disable: true,
      },
    },
    'filter-options': {
      table: {
        disable: true,    
      },
    },
  },
}

const defaultArgs = {
  'header': 'Filters',
  'filter-options': [ 
    { 
      id: 1,
      label: "Benefits",
      category: [
        { label: "Health Care", id: 2 },
        { label: "Education", id: 3 },
        { label: "Housing", id: 4 }
      ]
    },
    { 
      label:"Service Status",
      id: 5,
      category: [
        { label: "Veteran", id: 6 },
        { label: "Active Duty", id: 7 },
        { label: "Reservist", id: 8 },
        { label: "National Guard", id: 9 },
        { label: "Retired", id: 10 },
        { label: "Disabled", id: 11 },
        { label: "Other", id: 12 }
      ]
    }
  ],
};

const styles = {
  width: '100%',
  maxWidth: '481px',
};

const Template = ({
  'header': header,
  'filter-options': filterOptions,
}) => (
  <VaSearchFilter 
    header={header}
    filterOptions={filterOptions}
    style={styles}
    onVaFilterChange={(e) => console.log('VaFilterChange', e.detail)}
    onVaFilterClearAll={(e) => console.log('VaFilterClearAll', e.detail)}
    onVaFilterApply={(e) => console.log('VaFilterApply', e.detail)}
  />
);

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

Default.argTypes = propStructure(searchFilterDocs);
