import { addons } from '@storybook/addons';
import React from 'react';
import { additionalDocs } from '../stories/additional-docs';
import { category } from '../stories/maturity-scale';
import { getMaturityScale, getWebComponentDocs } from '../stories/wc-helpers';

const getMaturityCategory = (componentName) => {
  const componentDocs = getWebComponentDocs(componentName)
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
