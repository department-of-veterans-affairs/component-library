import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const bttDocs = getWebComponentDocs('va-back-to-top');

export default {
  title: 'Components/va-back-to-top',
};

const Template = () => {
  return (
    <main className="vads-l-col--12 medium-screen:vads-l-col--8">
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
      <footer
        style={{
          height: '500px',
          display: 'flex',
          justifyContent: 'center',
          background: '#112E51',
        }}
      >
        The footer
      </footer>
    </main>
  );
};

export const Default = Template.bind({});
Default.argTypes = propStructure(bttDocs);
