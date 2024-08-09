import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const bttDocs = getWebComponentDocs('va-back-to-top');

export default {
  title: 'Components/Back to top',
  id: 'components/va-back-to-top',
  displayAmount: 10,
  parameters: {
    componentSubtitle: 'va-back-to-top web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={bttDocs} />,
    },
  },
};

const defaultArgs = {};

const Template = ({
  displayAmount
}) => {
  return (
    <>
      <div className="usa-grid usa-grid-full">
        <div className="usa-width-three-fourths">
          <h1>The top</h1>
          {[...Array(displayAmount)].map(i => (
            <div
              key={i}
              style={{
                height: '300px',
                background: 'whitesmoke',
                margin: '2em 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <a href="">Link</a>
              Scroll down
            </div>
          ))}
          <va-back-to-top />
        </div>
      </div>
      <footer
        style={{
          height: '500px',
          display: 'flex',
          justifyContent: 'center',
          background: 'var(--vads-color-primary-darker)',
          color: 'white',
        }}
      >
        The footer
      </footer>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  displayAmount: 10
}
Default.argTypes = propStructure(bttDocs);

export const ShortExample = Template.bind(null);
ShortExample.args = {
  ...defaultArgs,
  displayAmount: 2
}
Default.argTypes = propStructure(bttDocs);
