import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  errorToggleArgTypes,
} from './wc-helpers';

const selectDocs = getWebComponentDocs('va-sort');

export default {
  title: 'Components/Sort USWDS',
  id: 'uswds/va-sort',
  parameters: {
    componentSubtitle: 'va-sort web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={selectDocs} />,
    },
    storyType: 'form',
  },
  argTypes: {
    ...propStructure(selectDocs),
    ...errorToggleArgTypes(['#error-demo-wrapper','#input-error-message']),
    'hide-required-text': {
      table: {
        disable: true,
      },
    },
  },
};

const defaultArgs = {
  'name': 'options',
  'value': '',
  'aria-describedby-message': 'Optional description text for screen readers',
  'width': 'lg',
};

const Template = ({
  name,
  value,
  'aria-describedby-message': ariaDescribedbyMessage,
  width,
}) => {
  return (
    <>
      <va-sort
        name={name}
        value={value}
        message-aria-describedby={ariaDescribedbyMessage}
        width={width}
      >
        <option value="relevance">Relevance</option>
        <option value="atoz">A to Z</option>
        <option value="ztoa">Z to A</option>
        <option value="newestoldest">Newest to oldest</option>
        <option value="oldestnewest">Oldest to newest</option>
      </va-sort>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(selectDocs);
