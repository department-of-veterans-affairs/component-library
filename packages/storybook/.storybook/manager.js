import { addons } from '@storybook/addons';
import React from 'react';
import { additionalDocs } from '../stories/additional-docs';

addons.setConfig({
  enableShortcuts: false,
  sidebar: {
    renderLabel: item => {
      if (
        item.parent === 'components' ||
        item.parent === 'components-banners' ||
        item.parent === 'components-buttons'
      ) {
        const maturityCategory =
          additionalDocs[item.name] &&
          additionalDocs[item.name].maturityCategory;

        let backgroundColor;
        switch (maturityCategory) {
          case 'USE':
            backgroundColor = '#195c27';
            break;
          case 'USE WITH CAUTION':
            backgroundColor = '#eb7f29';
            break;
          case "DON'T USE":
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

      return <>{item.name}</>;
    },
  },
});
