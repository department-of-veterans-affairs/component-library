import React from 'react';
import PropTypes from 'prop-types';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';

import componentDocs from 'web-components/component-docs.json';

/**
 * Return the JSON object matching a specific component tag
 */
export const getWebComponentDocs = tag =>
  componentDocs.components.filter(comp => comp.tag === tag)[0];

/**
 * Construct an object appropriate for Storybook subcomponent documentation based
 * on the return object from `getWebComponentDocs`
 */
export const componentStructure = comp => {
  const props = propStructure(comp);
  return {
    [comp.tag]: {
      __docgenInfo: {
        props,
      },
    },
  };
};

export const propStructure = comp => {
  return comp.props.reduce((propObj, prop) => {
    propObj[prop.name] = {
      description: prop.docs,
      required: prop.required,
      type: {
        name: prop.type,
      },
    };
    return propObj;
  }, {});
};

/**
 * Return a component with Storybook docs blocks in a standard order.
 * Accepts a markdown string as a prop
 */
export function StoryDocs({ docs }) {
  return (
    <>
      <Title />
      <Subtitle />
      <Description markdown={docs} />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </>
  );
}
StoryDocs.propTypes = {
  docs: PropTypes.string.isRequired,
};
