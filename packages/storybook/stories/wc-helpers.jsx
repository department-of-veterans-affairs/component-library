import React from 'react';
import PropTypes from 'prop-types';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  //ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import webComponentDocs from '@department-of-veterans-affairs/web-components/component-docs.json';
import { additionalDocs } from './additional-docs';
import { category, level } from './maturity-scale';

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
    propObj[prop.attr || prop.name] = {
      description: prop.docs,
      required: prop.required,
      defaultValue: {
        value: prop.default,
      }, // Used in subcomponents
      type: {
        name: prop.type, // Used in subcomponents
        required: prop.required,
      },
      // Assigns the argType to the Properties category
      table: {
        category: 'Properties',
        defaultValue: {
          summary: prop.default,
        },
        type: { summary: prop.type },
      },
      control: {
        type: prop.values[0].type === 'string' ? 'text' : prop.values[0].type,
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
        className="vads-c-action-link--green"
        href={`https://design.va.gov/components/${href}`}
      >
        View guidance for the {name} component in the Design System
      </a>
    </div>
  );
}

const getDocsTagValue = (tagName, docsTags = []) => {
  return docsTags
    .filter(item => item.name === tagName)
    .map(item => item.text)
}

export const getMaturityScale = (docsTags = []) => {
  const maturityCategory = getDocsTagValue('maturityCategory', docsTags).toString();
  const maturityLevel = getDocsTagValue('maturityLevel', docsTags).toString();
  return {
    category: category[maturityCategory.toUpperCase()],
    level: level[maturityLevel.toUpperCase()],
  };
}

export function MaturityScale({ category, level }) {
  if (!category || !level) return null;

  let colors;
  switch (category) {
    case 'USE':
      colors = 'vads-u-background-color--green-darker';
      break;
    case 'USE WITH CAUTION':
      colors = 'storybook-background-color-orange vads-u-color--base';
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
  if (!data?.events || (data?.events?.length === 0 && data?.listeners?.length === 0)) {
    return null;
  }

  let events = [];
  if (data.events) events = [...data.events];
  if (data.listeners) events = [...events, ...data.listeners];
  const eventNames = events.map(event => event.event).join(', ');

  return (
    <div className="vads-u-margin-top--2">
      This component has {events.length} custom{' '}
      {events.length > 1 ? 'events' : 'event'}: <strong>{eventNames}</strong>.
      Please see our documentation on{' '}
      <a href="https://design.va.gov/about/developers/using-web-components#custom-events">
        how to use web component custom events
      </a>
      .
    </div>
  );
}

/**
 * Capitalizes the first character.
 * (There's probably a better way of doing this)
 */
function capitalize(text) {
  return text ? `${text[0].toUpperCase()}${text.slice(1)}` : null;
}

/**
 * This function looks for the `@nativeHandler` doc tag and renders
 * them in a list. Documentation:
 * - https://stenciljs.com/docs/docs-json#custom-jsdocs-tags
 */
function NativeHandlers({ docsTags = [] }) {
  const handlers = getDocsTagValue('nativeHandler', docsTags);

  if (!handlers.length) return null;

  const nativeEvents = handlers.join(', ');

  return (
    <div className="vads-u-margin-top--2">
      This component uses the following native handlers:{' '}
      <strong>{nativeEvents}</strong>. Please see our documentation on{' '}
      <a href="https://design.va.gov/about/developers/using-web-components#native-events">
        how to use web component native events
      </a>
      .
    </div>
  );
}

function CanvasLink() {
  // We're inside an iframe on the Docs page, so we need to get the parent
  const canvasLink = window.parent.location.href.replace('docs', 'story');
  return (
    <p>
      Information on this component's accessibility, html output, and how it is
      used within Storybook can be <a href={canvasLink}>viewed on the Canvas</a>
      .
    </p>
  );
}

/**
 * Return a component with Storybook docs blocks in a standard order.
 * Accepts a JSON object as a prop representing component information
 */
export function StoryDocs({ componentName, data, children }) {
  const component = componentName || data?.tag;
  const componentDocs = additionalDocs?.[component];
  const componentData = data || componentDocs ? { ...data, ...componentDocs } : null;

  const maturityScale = componentDocs?.maturityCategory ? componentDocs : getMaturityScale(data.docsTags);

  const maturityCategory = maturityScale.category ?? componentDocs?.maturityCategory;
  const maturityLevel = maturityScale.level ?? componentDocs?.maturityLevel;
  // This feels a bit awkward, but I didn't want to use a magic number
  const _componentName = data?.tag?.slice('va-'.length);
  // Default the guidance values to be based on the web component's
  // tag name where possible
  const guidanceHref = getDocsTagValue('guidanceHref', data?.docsTags)[0] ?? (componentDocs?.guidanceHref ?? _componentName);
  const guidanceName = componentDocs?.guidanceName ?? capitalize(_componentName)?.replaceAll('-', ' ');


  return (
    <>
      <Title />
      <Subtitle />
      <MaturityScale category={maturityCategory} level={maturityLevel} />
      <Guidance href={guidanceHref} name={guidanceName} />
      <CanvasLink />
      <CustomEventsDescription data={componentData} />
      <Description markdown={data?.docs} />
      <NativeHandlers docsTags={data?.docsTags} />
      <Primary />
      
      <>{children}</>
      <Stories />
    </>
  );
}
StoryDocs.propTypes = {
  componentName: PropTypes.string,
  data: PropTypes.object,
};

/**
 * This utility function will help us focus on an element in a web component for Storybook examples.
 * A similar utility is used in vets-website.
 * 
 * https://github.com/department-of-veterans-affairs/vets-website/pull/23416
 */
export function applyFocus(el) {
  if (el) {
    // Use getAttribute to grab the "tabindex" attribute (returns string), not
    // the "tabIndex" property (returns number). Focusable elements will
    // automatically have a tabIndex of zero, otherwise it's -1.
    const tabindex = el.getAttribute('tabindex');
    // No need to add, or remove a tabindex="0"
    if (el.tabIndex !== 0) {
      el.setAttribute('tabindex', '-1');
      if (typeof tabindex === 'undefined' || tabindex === null) {
        // Remove tabindex on blur. If a web-component is focused using a -1
        // tabindex and is not removed on blur, the shadow elements inside will
        // not be focusable
        el.addEventListener(
          'blur',
          () => {
            el.removeAttribute('tabindex');
          },
          { once: true },
        );
      }
    }

    el.focus();
  }
}