import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const selectDocs = getWebComponentDocs('va-sort');

export default {
  title: 'Components/Sort',
  id: 'components/va-sort',
  parameters: {
    componentSubtitle: 'va-sort web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={selectDocs} />,
    },
    storyType: 'form',
  },
  argTypes: {
    ...propStructure(selectDocs),
  },
};

const defaultArgs = {
  'name': 'options',
  'value': '',
  'message-aria-describedby': 'Optional description text for screen readers',
  'width': 'lg',
};

const Template = ({
  name,
  value,
  'message-aria-describedby': ariaDescribedbyMessage,
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

export const CustomValue = Template.bind(null);
CustomValue.args = {
  ...defaultArgs,
  value: 'newestoldest',
};

// custom widths
export const CustomWidth = () => {
  return (
    <>
      <h4>Medium width</h4>
      <va-sort
        name="options-md"
        width="md"
      >
        <option value="relevance">Relevance</option>
        <option value="atoz">A to Z</option>
        <option value="ztoa">Z to A</option>
      </va-sort>

      <h4>Large width</h4>
      <va-sort
        name="options-lg"
        width="lg"
      >
        <option value="relevance">Relevance</option>
        <option value="atoz">A to Z</option>
        <option value="ztoa">Z to A</option>
      </va-sort>

      <h4>Extra large width</h4>
      <va-sort
        name="options-xl"
        width="xl"
      >
        <option value="relevance">Relevance</option>
        <option value="atoz">A to Z</option>
        <option value="ztoa">Z to A</option>
      </va-sort>
    </>
  );
};
