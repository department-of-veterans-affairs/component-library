import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Eyebrow',
  id: 'components/eyebrow',
  parameters: {
    componentSubtitle: 'Eyebrow component class',
    docs: {
      page: () => (
        <StoryDocs storyDefault={Default} componentName="Eyebrow" />
      ),
    },
  }
};

const Template = ({}) => (
  <h1>
    <span className="vads-c-eyebrow">
      Eyebrow Title
    </span>
    Main Headline
  </h1>
);

export const Default = Template.bind(null);
