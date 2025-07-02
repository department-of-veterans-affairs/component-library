# VA Design System Integration Examples

This directory contains examples of how to integrate the VA Design System into different frameworks and build tools outside of vets-website ([VA.gov](https://VA.gov)).

## Available Examples

- [Vite + React + TypeScript](./vite-react-typescript)
- [CodeSandbox](https://codesandbox.io/p/sandbox/suspicious-stonebraker-vzfzhw)
- [CodePen](https://codepen.io/jamigibbs-the-sans/pen/jEEdOmY)

## Icons Sprite Sheet

The icons sprite sheet must be loaded from the same origin as your application. By default, the icon sprite sheet is loaded inside of the components from the `/img/sprite.svg` path.

The sprite sheet is included in the `@department-of-veterans-affairs/component-library` package at `/dist/img/sprite.svg`. We recommend adding that file to your porject as part of your build process to ensure you're receiving the most recent version of the sprite sheet and that it's available at the correct path.

If you need to override the default sprite sheet path from `/img/sprite.svg` to a different path, you can do so by setting `initIconSpriteLocation` as part of the component library initialization:

```javascript
import { initIconSpriteLocation  } from '@department-of-veterans-affairs/web-components';
import {
  applyPolyfills,
  defineCustomElements,
} from '@department-of-veterans-affairs/component-library/src/main';

applyPolyfills().then(() => {
  defineCustomElements();
  initIconSpriteLocation();
  if (typeof (globalThis as any).setVaIconSpriteLocation === 'function') {
    (globalThis as any).setVaIconSpriteLocation('/your/path/to/sprite.svg');
  }
});
```

## Contributing

Do you have an example you'd like to add? Create a new directory in this directory, add a `README.md` file with instructions on how to use the example, and submit a pull request. Or link directly to your example above.
