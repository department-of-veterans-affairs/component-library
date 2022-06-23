import React from 'react';
import IconBase from '../../react-components/src/components/IconBase/IconBase';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Icons/React Component/Icon Base',
  id: 'Components/Icons/IconBase',
  component: IconBase,
  parameters: {
    docs: {
      page: () => <StoryDocs componentName="Icons" />,
    },
  },
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
      <a href="https://design.va.gov/foundation/icons">
        icon documentation
      </a>
      .
    </p>
  </div>
);
