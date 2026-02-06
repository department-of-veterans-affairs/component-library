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
        <option value="atoz">Medication name (A to Z)</option>
        <option value="ztoa">Medication name (Z to A)</option>
        <option value="newestoldest">Fill date (newest to oldest)</option>
        <option value="oldestnewest">Fill date (oldest to newest)</option>
      </va-sort>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(selectDocs);

export const CustomDefaultValue = Template.bind(null);
CustomDefaultValue.args = {
  ...defaultArgs,
  value: 'newestoldest',
};

// custom widths
export const Widths = () => {
  return (
    <>
      <h4 className="vads-u-margin-bottom--0">Medium width</h4>
      <va-sort
        name="options-md"
        width="md"
      >
        <option value="relevance">Relevance</option>
        <option value="atoz">Medication name (A to Z)</option>
        <option value="ztoa">Medication name (Z to A)</option>
        <option value="newestoldest">Fill date (newest to oldest)</option>
        <option value="oldestnewest">Fill date (oldest to newest)</option>
      </va-sort>

      <h4 className="vads-u-margin-bottom--0">Large width</h4>
      <va-sort
        name="options-lg"
        width="lg"
      >
        <option value="relevance">Relevance</option>
        <option value="atoz">Medication name (A to Z)</option>
        <option value="ztoa">Medication name (Z to A)</option>
        <option value="newestoldest">Fill date (newest to oldest)</option>
        <option value="oldestnewest">Fill date (oldest to newest)</option>
      </va-sort>

      <h4 className="vads-u-margin-bottom--0">Extra large width</h4>
      <va-sort
        name="options-xl"
        width="xl"
      >
        <option value="relevance">Relevance</option>
        <option value="atoz">Medication name (A to Z)</option>
        <option value="ztoa">Medication name (Z to A)</option>
        <option value="newestoldest">Fill date (newest to oldest)</option>
        <option value="oldestnewest">Fill date (oldest to newest)</option>
      </va-sort>
    </>
  );
};
