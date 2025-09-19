import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import './styles/va-icon.scss';

const iconDocs = getWebComponentDocs('va-icon');

export default {
  title: 'Components/Icon USWDS',
  id: 'uswds/va-icon',
  parameters: {
    componentSubtitle: 'va-icon web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={iconDocs} />,
      description: {
        component: `
          ### Global Sprite Path Configuration

          You can globally set the SVG sprite path for all \`<va-icon>\` components in your application using the following methods:

          \`\`\`js
          // Import the setter from the package
          import { setVaIconSpriteLocation } from '@department-of-veterans-affairs/web-components';

          // Set the sprite path globally (do this before rendering any <va-icon>)
          setVaIconSpriteLocation('/img/sprite.svg');
          \`\`\`

          Or, if you are not using a module system, you can set it on \`window\` or \`globalThis\`:

          \`\`\`js
          window.setVaIconSpriteLocation && window.setVaIconSpriteLocation('/img/sprite.svg');
          \`\`\`

          To get the current sprite path:

          \`\`\`js
          const currentPath = window.getVaIconSpriteLocation && window.getVaIconSpriteLocation();
          \`\`\`

          **Note:** This must be set before any \`<va-icon>\` is rendered to ensure all icons use the correct sprite path.
        `
      },
    },
  },
};

const defaultArgs = {
  icon: 'alarm',
  size: 3,
  srtext: null,
};

const Template = ({ icon, size, srtext }) => {
  return <va-icon icon={icon} size={size} srtext={srtext} />;
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  srtext:
    "add some text for a screen reader to describe the icon's semantic meaning",
};
Default.argTypes = propStructure(iconDocs);

const IconsTemplate = ({ size }) => {
  const handleChange = event => {
    const search = event.target.value.toLowerCase();
    const iconExamples = document.querySelectorAll('.icon-example');

    iconExamples.forEach(row => {
      const text = row.getAttribute('data-icon') || ''; // Ensure text is not null or undefined
      const isVisible = text.toLowerCase().includes(search);
      row.classList.toggle('vads-u-display--none', !isVisible);
    });

    const iconCount = document.querySelectorAll(
      '.icon-example:not(.vads-u-display--none)',
    ).length;
    const word = iconCount === 1 ? 'icon' : 'icons';
    document.getElementById('icon-count').textContent = `${iconCount} ${word}.`;
  };

  return (
    <div className="container">
      <div className="filter">
        <va-text-input
          label="Type to filter icons"
          name="filter-term"
          onInput={handleChange}
        />
        <span id="icon-count">{icons.length} icons.</span>
      </div>

      <div className="icons">
        {icons.map(icon => (
          <div key={icon} className="icon-example" data-icon={icon}>
            <va-icon icon={icon} size={size} />
            <code className="icon__label">{icon}</code>
          </div>
        ))}
      </div>
    </div>
  );
};

const iconPathConfigurationDocs = () => {
  return (
    <div>
      <p>
        The icon sprite.svg file is bundled with the web components package and can be found at <code style={{ fontSize: '.75em', background: `var(--vads-color-gray-light-alt)`, padding: `5px` }}>@department-of-veterans-affairs/component-library/dist/img/sprite.svg</code>. If you are using a custom implementation other than on va.gov you will need to copy the sprite.svg file to your project and set the path accordingly.
      </p>
      <p>
        You can globally set the SVG sprite path for all <code style={{ fontSize: '.75em', background: `var(--vads-color-gray-light-alt)`, padding: `5px` }}>&lt;va-icon&gt;</code> components in your application using the following methods:
      </p>
      <pre style={{ fontSize: '.75em', background: `var(--vads-color-gray-light-alt)`, padding: `10px` }}>
        {`
// Import the the init function from the web-components package
import { initIconSpriteLocation } from '@department-of-veterans-affairs/web-components';

// Initialize the global sprite path configuration
initIconSpriteLocation();
// Set the sprite path globally (do this before rendering any icon)
globalThis.setVaIconSpriteLocation('[custom sprite path]');
        `}
      </pre>
      <p>
        To get the current sprite path:
      </p>
      <pre style={{ fontSize: '.75em', background: `var(--vads-color-gray-light-alt)`, padding: `10px` }}>
        {`let currentIconPath = globalThis.getVaIconSpriteLocation();`}
      </pre>
      <p>
        <strong>Note:</strong> This must be set before any <code style={{ fontSize: '.75em', background: `var(--vads-color-gray-light-alt)`, padding: `5px` }}>&lt;va-icon&gt;</code> is rendered to ensure all icons use the correct sprite path.
      </p>
      <i>* The sprite.svg path must be loaded from the same origin as you application, cannot traverse the file system using ".." and must be a ".svg" file.</i>
    </div>
  );
}
export const GlobalSpritePathConfiguration = iconPathConfigurationDocs.bind(null);
GlobalSpritePathConfiguration.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    canvas: {
      sourceState: 'none',
    },
  }
};

export const Icons = IconsTemplate.bind(null);
Icons.args = {
  ...defaultArgs,
};

// Dynamically generate the icon list from the sprite.svg file
// @ts-ignore
import spriteSvg from '../public/img/sprite.svg?raw';
const icons: string[] = Array.from((spriteSvg as string).matchAll(/<symbol\s+id="([^"]+)"/g)).map(match => match[1]).sort();


