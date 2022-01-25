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

import webComponentDocs from '@department-of-veterans-affairs/web-components/component-docs.json';

/**
 * Return the JSON object matching a specific component tag
 */
export const getWebComponentDocs = tag =>
  webComponentDocs.components.filter(comp => comp.tag === tag)[0];

/**
 * Construct an object appropriate for Storybook subcomponent documentation based
 * on the return object from `getWebComponentDocs`
 */
export const componentStructure = comp => {
  const props = propStructure(comp);
  return {
    [comp.tag]: {
      // For the React version of storybook, the loader looks for a `__docgenInfo` object
      // with some metadata:
      // https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/multiframework.md#arg-tables
      __docgenInfo: {
        props,
      },
    },
  };
};

const getEventObj = array => {
  return array.reduce((eventObj, event) => {
    eventObj[event.event] = {
      description: event.docs,
      type: {
        name: 'Event',
      },
    };

    return eventObj;
  }, {});
};

/**
 * Expects an object returned by `getWebComponentDocs`.
 * Returns an object that matches the structure in:
 *   https://github.com/reactjs/react-docgen#result-data-structure
 * Used to generate some docs for web components in Storybook
 */
export const propStructure = comp => {
  const props = comp.props.reduce((propObj, prop) => {
    propObj[prop.attr] = {
      description: prop.docs,
      required: prop.required,
      defaultValue: { value: prop.default },
      type: {
        name: prop.type,
      },
    };
    return propObj;
  }, {});

  const events = getEventObj(comp.events);
  const listeners = getEventObj(comp.listeners);

  return { ...props, ...events, ...listeners };
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
