import React from 'react';

import IconBase from './IconBase';

export default {
  title: 'Components/Icons/IconBase',
  component: IconBase,
};

export const Description = () => (
  <div>
    <p>
      <code>IconBase</code> is just an <code>{'<svg>'}</code> wrapper for its
      children. All props are passed to the <code>{'<svg>'}</code> element.
    </p>
    <p>
      For examples of how this is used, see the other <code>Icon</code> stories.
    </p>
    <p>
      <strong>Icon being used alone</strong>
      <br />
      <code>{`
      <IconHelp color={'#000000'} cssClass={'a-class'} id={'favorite'} role={'img'} ariaLabel={'Favorite'} />
    `}</code>
    </p>
    <p>
      <strong>Icon being used with supporting text</strong>
      <br />
      Example goes here...
    </p>
    <p>
      <strong>
        Icon being used alone inside an <code>{'<a>'}</code> tag
      </strong>
      <br />
      Example goes here...
    </p>
    <p>
      <strong>
        icon being used with supporting text inside an <code>{'<a>'}</code> tag
      </strong>
      <br />
      Example goes here...
    </p>
  </div>
);
