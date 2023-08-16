const { transform } = require('@divriots/style-dictionary-to-figma');

module.exports = {
  source: ['tokens/**/*.json'],
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      const transformedTokens = transform(dictionary.tokens, { defaultTokenset: false, cleanMeta: ['filePath', 'isSource', 'original', 'attributes', 'category', 'type', 'path'] });
      return JSON.stringify(transformedTokens, null, 2);
    },
  },
  platforms: {
    figma: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/figma/',
      files: [
        {
          destination: 'variables.json',
          format: 'figmaTokensPlugin',
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