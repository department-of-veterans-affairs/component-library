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

import { generateEventsDescription } from './events';

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

const getListenerDescriptions = (comp, listeners) => {
  return Object.keys(listeners).reduce((listenerObj, listener) => {
    const docsTag = comp.docsTags.find(docs => docs.name === listener);
    if (!docsTag) {
      listenerObj[listener] = { ...listeners[listener] };
    } else {
      listenerObj[listener] = {
        ...listeners[listener],
        description: docsTag.text,
      };
    }
    return listenerObj;
  }, {});
};

const getEventObj = array => {
  return array.reduce((eventObj, event) => {
    eventObj[event.event] = {
      description: event.docs,
      type: {
        name: 'Event',
      },
      // Assigns the argType to the Events category
      table: {
        category: 'Events',
        // Remove dash from default column
        defaultValue: {
          detail: undefined,
        },
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
      // Assigns the argType to the Properties category
      table: {
        category: 'Properties',
      },
    };
    return propObj;
  }, {});
  const events = getEventObj(comp.events);
  const listeners = getEventObj(comp.listeners);
  const listenersWithDescriptions = getListenerDescriptions(comp, listeners);
  return { ...props, ...events, ...listenersWithDescriptions };
};

/**
 * Renders an Action link to the Design System
 */
function Guidance({ componentHref, componentName }) {
  if (!componentName || !componentHref) return null;
  return (
    <a
      className="vads-c-action-link--blue"
      href={`https://design.va.gov/components/${componentHref}`}
    >
      View guidance for the {componentName} component in the Design System
    </a>
  );
}

/**
 * Capitalizes the first character.
 * (There's probably a better way of doing this)
 */
function capitalize(text) {
  return `${text[0].toUpperCase()}${text.slice(1)}`;
}

/**
 * Return a component with Storybook docs blocks in a standard order.
 * Accepts a JSON object as a prop representing component information
 */
export function StoryDocs({ data, children }) {
  const args = data?.props?.length > 0;
  const guidance = data?.guidance || {};
  const tagName = data.tag;
  // This feels a bit awkward, but I didn't want to use a magic number
  const componentName = tagName.slice('va-'.length);
  if (!guidance.componentName)
    guidance.componentName = capitalize(componentName);
  if (!guidance.componentHref) guidance.componentHref = componentName;
  const eventsDescription = generateEventsDescription(data);
  return (
    <>
      <Title />
      <Subtitle />
      <Guidance {...guidance} />
      <p>
        Information on this component's accessibility, html output, and how it
        is used within Storybook can be viewed by clicking the Canvas tab.
      </p>
      {eventsDescription && (
        <p>
          {eventsDescription} Please see our{' '}
          <a href="https://design.va.gov/about/developers#using-web-components">
            documentation on how to use web component events
          </a>
          .
        </p>
      )}
      <Description markdown={data.docs} />
      <Primary />
      {args && <ArgsTable story={PRIMARY_STORY} />}
      <>{children}</>
      <Stories />
    </>
  );
}
StoryDocs.propTypes = {
  data: PropTypes.object.isRequired,
};
