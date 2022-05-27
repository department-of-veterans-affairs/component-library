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
import { additionalDocs } from './additional-docs';

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
export function Guidance({ href, name }) {
  if (!href || !name) return null;

  return (
    <div className="vads-u-margin-bottom--5">
      <a
        className="vads-c-action-link--blue"
        href={`https://design.va.gov/components/${href}`}
      >
        View guidance for the {name} component in the Design System
      </a>
    </div>
  );
}

export function MaturityScale({ category, level }) {
  if (!category || !level) return null;

  let colors;
  switch (category) {
    case 'USE':
      colors = 'vads-u-background-color--green-darker';
      break;
    case 'USE WITH CAUTION':
      colors = 'vads-u-background-color--orange vads-u-color--base';
      break;
    case "DON'T USE":
      colors = 'vads-u-background-color--secondary-darkest';
      break;
  }

  if (!colors) return null;

  return (
    <div className="vads-u-margin-bottom--3">
      <span className={`usa-label ${colors}`}>
        {category}: {level}
      </span>
    </div>
  );
}

export function CustomEventsDescription({ data }) {
  if (!data || (data?.events?.length === 0 && data?.listeners?.length === 0)) {
    return null;
  }

  let events = [];
  if (data.events) events = [...data.events];
  if (data.listeners) events = [...events, ...data.listeners];
  const eventNames = events.map(event => event.event).join(', ');

  return (
    <div className="vads-u-margin-top--2">
      This component has {events.length} custom{' '}
      {events.length > 1 ? 'events' : 'event'}: {eventNames}. Please see our
      documentation on{' '}
      <a href="https://design.va.gov/about/developers#custom-events">
        how to use web component events
      </a>
      .
    </div>
  );
}

export function ComponentDescription({ data }) {
  if (!data) return null;

  return <div className="vads-u-margin-top--2">{data}</div>;
}

/**
 * Return a component with Storybook docs blocks in a standard order.
 * Accepts a JSON object as a prop representing component information
 */
export function StoryDocs({ componentName, data }) {
  let componentData = data;

  const component = componentName || data?.tag;
  const componentDocs = additionalDocs?.[component];

  if (componentData && componentDocs) {
    componentData = { ...data, ...componentDocs };
  }

  const maturityCategory = componentDocs?.maturityCategory;
  const maturityLevel = componentDocs?.maturityLevel;
  const guidanceName = componentDocs?.guidanceName || componentName;
  const guidanceHref = componentDocs?.guidanceHref;
  const description = componentDocs?.description;

  return (
    <>
      <Title />
      <Subtitle />
      <MaturityScale category={maturityCategory} level={maturityLevel} />
      <Guidance href={guidanceHref} name={guidanceName} />
      <ComponentDescription data={description} />
      <CustomEventsDescription description={componentData} />
      <Description markdown={data?.docs} />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      <Stories />
    </>
  );
}
StoryDocs.propTypes = {
  componentName: PropTypes.string,
  data: PropTypes.object,
};
