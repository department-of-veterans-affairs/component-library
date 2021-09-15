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
    <h2>Accessibility</h2>
    <h3>
      When to use <code>{'role="img"'}</code>
    </h3>
    <p>
      If an icon is being used alone (without support text), it should have a{' '}
      <code>{'role="img"'}</code> AND appropriate ARIA markup OR screen reader
      only descriptive text.
    </p>
    <h3>
      When to use <code>{'role="presentation"'}</code>
    </h3>
    <p>
      If an icon is being used with visual (and assistive device) text, it
      should have <code>{'role="presentation"'}</code>.
    </p>
    <h3>Accessibility Examples</h3>
    <h4>Icon being used alone</h4>
    <code>{`
      <IconHelp color={'#000000'} cssClass={'a-class'} id={'icon-help'} role={'img'} ariaLabel={'Help'} />
    `}</code>
    <h4>Icon being used with supporting text</h4>
    <code>{`
    <IconHelp color={'#000000'} cssClass={'a-class'} id={'icon-help'} role={'presentation'} ariaLabel={'Help'} />
    `}</code>
    <code>{`
    Help
    `}</code>
    <h4>
      Icon being used alone inside an <code>{'<a>'}</code> tag
    </h4>
    <code>{`
      <a href="#>
        <IconHelp color={'#000000'} cssClass={'a-class'} id={'icon-help'} role={'img'} ariaLabel={'Help'} />
      </a>
    `}</code>
    <h4>
      Icon being used with supporting text inside an <code>{'<a>'}</code> tag
    </h4>
    <code>{`
      <a href="#>
        <IconHelp color={'#000000'} cssClass={'a-class'} id={'icon-help'} role={'presentation'} ariaLabel={'Help'} />
        Help
      </a>
    `}</code>
  </div>
);
