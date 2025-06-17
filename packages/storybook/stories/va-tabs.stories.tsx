import { VaTabs } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const tabsDocs = getWebComponentDocs('va-tabs');

export default {
  title: 'Components/Tabs',
  id: 'components/Tabs',
  parameters: {
    componentSubtitle: 'va-tabs web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={tabsDocs} />,
    },
  },
};

const defaultArgs = {
  label: 'Navigation',
  tabItems: [
    { label: 'Tab 1', url: '#tab1' },
    { label: 'Tab 2', url: '#tab2' },
    { label: 'Tab 3', url: '#tab3' },
  ],
};

const vaTabs = (args: any) => {
  const {
    label,
    tabItems,
    ...rest
  } = args;
  return (
    <VaTabs
      label={label}
      tabItems={tabItems}
      {...rest}
    />
  );
}

const Template = (args: any) => vaTabs(args);

/*
{
  defaultArgs.tabItems.map((item, index) => (
    <div id={`tab${index + 1}`} key={item.label}>
      <h2>{item.label}</h2>
      <p>Content for {item.label} goes here.</p>
    </div>
  ));
}
*/

export const Default = Template.bind(null);
Default.args = defaultArgs;
Default.argTypes = propStructure(tabsDocs);
