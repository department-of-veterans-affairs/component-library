import { addons } from 'storybook/manager-api';
import React from 'react';
import webComponentDocs from '@department-of-veterans-affairs/web-components/component-docs.json';
import { additionalDocs } from '../stories/additional-docs';
import { category } from '../stories/maturity-scale';
import { getMaturityScale } from '../stories/wc-helpers';

/**
 * Return the maturity category matching a specific component name
 */
const getMaturityCategory = (componentName) => {
  // remove USWDS from the componentName for matching in component-docs.json
  componentName = componentName.replace(' USWDS', '');

  const componentDocs = webComponentDocs.components.filter(comp =>
    comp.docsTags.some(tag => tag.text === componentName))[0];

  const maturityScale = getMaturityScale(componentDocs?.docsTags);
  return maturityScale['category'];
}

const labelRenderer = (backgroundColor, itemName, itemType) => {
  let divStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  let indicatorStyle = {
    height: '10px',
    width: '10px',
    backgroundColor,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '4px',
  };

  if (itemType === 'story') {
    divStyle.flexDirection = 'row-reverse';
    indicatorStyle.marginRight = '0';
    indicatorStyle.marginLeft = '4px';
  }

  return (
    <div style={divStyle}>
      <div style={indicatorStyle}></div>
      {itemName}
    </div>
  );
}

addons.setConfig({
  enableShortcuts: false,
  sidebar: {
    renderLabel: item => {
      // For stories tagged with 'dst-testing' return custom label via renderer
      if (item.type === 'story' && item.tags.includes('dst-testing')) {
        return labelRenderer('#dd7533', item.name, item.type);
      }

      const maturityCategoryFromDocs = getMaturityCategory(item.name);
      if (
        item.parent === 'components' ||
        item.parent === 'components-icons' ||
        item.parent === 'deprecated' ||
        item.parent === 'under-development' ||
        item.parent === 'v1-components'
      ) {
        const maturityCategory =
          maturityCategoryFromDocs ??
          additionalDocs[item.name]?.maturityCategory;

        let backgroundColor;
        switch (maturityCategory) {
          case category.USE:
            backgroundColor = '#154c21';
            break;
          case category.CAUTION:
            backgroundColor = '#dd7533';
            break;
          case category.DONT_USE:
            backgroundColor = '#8b0a03';
            break;
        }

        if (!backgroundColor) return item.name;

        return labelRenderer(backgroundColor, item.name, item.type);
      }

      return item.name;
    },
  },
});
