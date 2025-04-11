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
      label: "Facet 1",
      category: [
        { label: "Category 1" },
        { label: "Category 2"} 
      ]
    },
    { 
      label:"Facet 2",
      category: [
        { label: "Category 3"},
        { label: "Category 4"}
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
