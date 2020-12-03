module.exports = {
  stories: ['../@(src|stories)/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@whitespace/storybook-addon-html/register',
  ],
};
