import React from 'react';

import {IconBase} from '@department-of-veterans-affairs/component-library';

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
      For more information, see the Design System{' '}
      <a href="https://github.com/department-of-veterans-affairs/vets-design-system-documentation/blob/master/src/_design/icons.md">
        icon documentation
      </a>
      .
    </p>
  </div>
);
