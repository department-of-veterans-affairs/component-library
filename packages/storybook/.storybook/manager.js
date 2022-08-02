import { addons } from '@storybook/addons';
import React from 'react';
import webComponentDocs from '@department-of-veterans-affairs/web-components/component-docs.json';
import { additionalDocs } from '../stories/additional-docs';
import { category } from '../stories/maturity-scale';

const getMaturityCategory = (componentName) => {
  // find the docs object for the component
  const componentDocs = webComponentDocs.components.filter(item => (
    item.docsTags.some(tag => tag.text === componentName)
  ));
  
  // get the maturity category for the component
  const maturityCategory = componentDocs[0]?.docsTags
    .filter(item => item.name === 'maturityCategory')
    .map(item => item.text)
    .toString()
    .toUpperCase();
  
  return category[maturityCategory];
}

addons.setConfig({
  enableShortcuts: false,
  sidebar: {
    renderLabel: item => {
      const maturityCategoryFromDocs = getMaturityCategory(item.name);
      if (
        item.parent === 'components' ||
        item.parent === 'components-banners' ||
        item.parent === 'components-buttons' ||
        item.parent === 'components-icons' ||
        item.parent === 'deprecated'
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
