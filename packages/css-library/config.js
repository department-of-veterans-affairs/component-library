const { transform } = require('@divriots/style-dictionary-to-figma');

const filtersUswdsTokens = token => !token.name.includes('uswds');

module.exports = {
  source: ['tokens/**/*.json'],
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      // currently Figma only supports syncing colors, so only transform dictionary.tokens.color
      const transformedTokens = transform(dictionary.tokens.color, { cleanMeta: ['filePath', 'isSource', 'original', 'attributes', 'category', 'type', 'path'] });
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
          filter: filtersUswdsTokens
        },
      ],
    },
    css: {
      transformGroup: 'css',
      buildPath: 'dist/tokens/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          filter: filtersUswdsTokens
        }
      ]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/tokens/scss/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
          filter: filtersUswdsTokens
        }
      ]
    },
    json: {
      transformGroup: 'web',
      buildPath: 'dist/tokens/json/',
      files: [
        {
          destination: 'variables.json',
          format: 'json',
          filter: filtersUswdsTokens
        }
      ]
    },
  }
}