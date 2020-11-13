import React from 'react';

import IconBase from './IconBase';

export default {
  title: 'Library/IconBase',
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
  </div>
);
