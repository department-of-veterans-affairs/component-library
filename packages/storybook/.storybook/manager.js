import { addons } from '@storybook/addons';
import React from 'react';
import webComponentDocs from '@department-of-veterans-affairs/web-components/component-docs.json';
import { additionalDocs } from '../stories/additional-docs';
import { category } from '../stories/maturity-scale';
import { getMaturityScale } from '../stories/wc-helpers';

/**
 * Return the maturity category matching a specific component name
 */
const getMaturityCategory = (componentName) => {
  const componentDocs = webComponentDocs.components.filter(comp => 
    comp.docsTags.some(tag => tag.text === componentName))[0];
  
  const maturityScale = getMaturityScale(componentDocs?.docsTags);
  return maturityScale['category'];
}

addons.setConfig({
  enableShortcuts: false,
  sidebar: {
    renderLabel: item => {
      const maturityCategoryFromDocs = getMaturityCategory(item.name);
      if (
        item.parent === 'components' ||
        item.parent === 'components-icons' ||
        item.parent === 'deprecated' ||
        item.parent === 'under-development'
      ) {
        const maturityCategory = 
          maturityCategoryFromDocs ?? 
          additionalDocs[item.name]?.maturityCategory;

        let backgroundColor;
        switch (maturityCategory) {
          case category.USE:
            backgroundColor = '#195c27';
            break;
          case category.CAUTION:
            backgroundColor = '#eb7f29';
            break;
          case category.DONT_USE:
            backgroundColor = '#981b1e';
            break;
        }

        if (!backgroundColor) return item.name;

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                height: '10px',
                width: '10px',
                backgroundColor,
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '4px',
              }}
            ></div>
            {item.name}
          </div>
        );
      }

      return item.name;
    },
  },
});
