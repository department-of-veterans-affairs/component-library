const { transform } = require('@divriots/style-dictionary-to-figma');

module.exports = {
  source: ['tokens/**/*.json'],
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      // currently Figma only supports syncing colors, so only transform dictionary.tokens.color
      const transformedTokens = transform(dictionary.tokens.color, { cleanMeta: ['filePath', 'isSource', 'original', 'attributes', 'category', 'type', 'path'] });
      return JSON.stringify(transformedTokens, null, 2);
    },
    figmaUSWDSColorsTokensPlugin: ({ dictionary }) => {
      
      const transformedTokens = transform(dictionary.tokens.uswds, { cleanMeta: ['filePath', 'isSource', 'original', 'attributes', 'category', 'type', 'path'] });
      return JSON.stringify(transformedTokens, null, 2);
    },
  },
  platforms: {
    figma: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/figma/colors/',
      files: [
        {
          destination: 'variables.json',
          format: 'figmaTokensPlugin',
        },
      ],
    },
    uswds: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/figma/colors/',
      files: [
        {
          destination: 'uswds.json',
          format: 'figmaUSWDSColorsTokensPlugin',
        },
      ],
    },
    css: {
      transformGroup: 'css',
      buildPath: 'dist/tokens/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables'
        }
      ]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/tokens/scss/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables'
        }
      ]
    },
    json: {
      transformGroup: 'web',
      buildPath: 'dist/tokens/json/',
      files: [
        {
          destination: 'variables.json',
          format: 'json'
        }
      ]
    },
  }
}