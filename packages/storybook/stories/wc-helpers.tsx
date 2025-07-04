import * as PropTypes from 'prop-types';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Controls,
} from '@storybook/addon-docs';

import webComponentDocs from '../../web-components/component-docs.json';
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
export const propStructure = (comp, subcomp = undefined) => {
  const props = comp.props.reduce((propObj, prop) => {
    propObj[prop.attr || prop.name] = {
      name: subcomp ? `${subcomp}: ${prop.attr}` : prop.attr,
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
        category: subcomp ? subcomp : 'Properties',
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
 * Generates default prop values that can be used to define Storybook args
 * Also can be fed into getDefaultPropValue() to the value of a specific prop
 * @param {Object} comp - The component object returned by `getWebComponentDocs([componentTag])`
 * @return {Object} - An object with default prop values
 */
export const propDefaults = (comp) => {
  const props = propStructure(comp);
  return Object.entries(props).reduce((argObj, [propName, propData]: [string, any]) => {
    if (propData.defaultValue) {
      try {
        argObj[propName] = JSON.parse(propData.defaultValue.value);
      } catch (e) {
        argObj[propName] = propData.defaultValue.value;
      }
    }
    return argObj;
  }, {});
};

/**
 * Returns a single value from the component's default props
 * @param {number} defaults Object
 * @param {number} key Name of the prop to return
 */

export const getDefaultPropValue = (componentName, key) => {
  const defaults = propDefaults(getWebComponentDocs(componentName));
  return defaults && key in defaults
    ? JSON.parse(defaults[key])
    : undefined;
};

/**
 * Renders an Action link to the Design System
 */
export function Guidance({ href, name }) {
  if (!href || !name) return null;

  return (
    <div className="vads-u-margin-bottom--5">
      <va-link-action
        href={`https://design.va.gov/components/${href}`}
        text={`View guidance for the ${name} component in the Design System`}
      />
    </div>
  );
}

const getDocsTagValue = (tagName, docsTags = []) => {
  return docsTags.filter(item => item.name === tagName).map(item => item.text);
};

export const getMaturityScale = (docsTags = []) => {
  const maturityCategory = getDocsTagValue(
    'maturityCategory',
    docsTags,
  ).toString();
  const maturityLevel = getDocsTagValue('maturityLevel', docsTags).toString();
  return {
    category: category[maturityCategory.toUpperCase()],
    level: level[maturityLevel.toUpperCase()],
  };
};

export function MaturityScale({ category, level }) {
  if (!category || !level) return null;

  let colors;
  let backgroundColor;
  switch (category) {
    case 'USE':
      colors = 'vads-u-background-color--green-darker';
      backgroundColor = null;
      break;
    case 'USE WITH CAUTION':
      colors = 'vads-u-color--base';
      backgroundColor = 'vads-color-orange';
      break;
    case "DON'T USE":
      colors = 'vads-u-background-color--secondary-darkest';
      backgroundColor = null;
      break;
  }

  if (!colors) return null;

  return (
    <div className="vads-u-margin-bottom--3">
      <span
        className={`usa-label ${colors}`}
        {...(backgroundColor && {
          style: { backgroundColor: `var(--${backgroundColor})` },
        })}
      >
        {category}: {level}
      </span>
    </div>
  );
}

export function CustomEventsDescription({ data }) {
  if (
    !data?.events ||
    (data?.events?.length === 0 && data?.listeners?.length === 0)
  ) {
    return null;
  }

  let events = [];
  if (data.events) events = [...data.events];
  if (data.listeners) events = [...events, ...data.listeners];
  const eventNames = events.map(event => event.event).join(', ');

  return (
    <p className="component-details vads-u-margin-top--2">
      This component has {events.length} custom{' '}
      {events.length > 1 ? 'events' : 'event'}: <strong>{eventNames}</strong>.
      Please see our documentation on{' '}
      <a href="https://design.va.gov/about/developers/using-web-components#custom-events">
        how to use web component custom events
      </a>
      .
    </p>
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
    <p className="component-details vads-u-margin-top--2">
      This component uses the following native handlers:{' '}
      <strong>{nativeEvents}</strong>. Please see our documentation on{' '}
      <a href="https://design.va.gov/about/developers/using-web-components#native-events">
        how to use web component native events
      </a>
      .
    </p>
  );
}

function CanvasLink() {
  // We're inside an iframe on the Docs page, so we need to get the parent
  // @ts-ignore ignoring "window not found" error
  let canvasLink = window.parent.location.href.replace('docs', 'story');
  canvasLink = canvasLink.replace('docs', 'default');
  return (
    <p className="component-details">
      Information on this component's accessibility, html output, and how it is
      used within Storybook can be <a href={canvasLink}>viewed on the Canvas</a>
      .
    </p>
  );
}

/**
 * Return a component with Storybook docs blocks in a standard order.
 * Accepts a JSON object as a prop representing component information
 * @param {{storyDefault: any, componentName?: string, data: any, children?: any}} arg
 */
export function StoryDocs({
  storyDefault,
  componentName,
  data,
  children,
}: {
  storyDefault: any;
  componentName?: string;
  data: any;
  children?: any;
}) {
  const component = componentName || data?.tag;
  const componentDocs = additionalDocs?.[component];
  const componentData =
    data || componentDocs ? { ...data, ...componentDocs } : null;

  const maturityScale = componentDocs?.maturityCategory
    ? componentDocs
    : getMaturityScale(data.docsTags);

  const maturityCategory =
    maturityScale.category ?? componentDocs?.maturityCategory;
  const maturityLevel = maturityScale.level ?? componentDocs?.maturityLevel;
  // This feels a bit awkward, but I didn't want to use a magic number
  const _componentName = data?.tag?.slice('va-'.length);
  // Default the guidance values to be based on the web component's
  // tag name where possible
  const guidanceHref =
    getDocsTagValue('guidanceHref', data?.docsTags)[0] ??
    componentDocs?.guidanceHref ??
    _componentName;
  const guidanceName =
    componentDocs?.guidanceName ??
    capitalize(_componentName)?.replaceAll('-', ' ');

  return (
    <>
      <Title />
      <Subtitle />
      <MaturityScale category={maturityCategory} level={maturityLevel} />
      <Guidance href={guidanceHref} name={guidanceName} />
      <CanvasLink />
      <CustomEventsDescription data={componentData} />
      <Description of={storyDefault} />
      <NativeHandlers docsTags={data?.docsTags} />
      <Primary />
      <Controls of={storyDefault} />
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

/**
 * This utility will expand the vertical space of the viewport when a web
 * component is active or expanded (e.g. modal, accordion, etc.)
 * @param wrap
 * @param isVisible
 * @returns
 */
export function resizeViewPorts(wrap, isVisible) {
  if (!wrap) return;
  const story = wrap.closest('.sb-anchor');
  story?.classList.toggle('expand', isVisible);
}
