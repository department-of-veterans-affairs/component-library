import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const bttDocs = getWebComponentDocs('va-back-to-top');

export default {
  title: 'Components/Back to top',
  parameters: {
    componentSubtitle: `va-back-to-top`,
    docs: {
      page: () => <StoryDocs data={bttDocs} />,
    },
  },
};

const Template = () => {
  return (
    <>
      <div className="usa-grid usa-grid-full">
        <div className="usa-width-three-fourths">
          <h1>The top</h1>
          {[...Array(10)].map(i => (
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
          background: '#112E51',
          color: 'white',
        }}
      >
        The footer
      </footer>
    </>
  );
};

export const Default = Template.bind(null);
Default.argTypes = propStructure(bttDocs);
