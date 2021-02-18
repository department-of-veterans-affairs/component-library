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
  const props = comp.props.reduce((propObj, prop) => {
    propObj[prop.name] = {
      description: prop.docs,
      required: prop.required,
      type: {
        name: prop.type,
      },
    };
    return propObj;
  }, {});

  return {
    [comp.tag]: {
      __docgenInfo: {
        props,
      },
    },
  };
};
