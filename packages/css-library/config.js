const { transform } = require('@divriots/style-dictionary-to-figma');

module.exports = {
  "source": ["tokens/**/*.json"],
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      const transformedTokens = transform(dictionary.tokens);
      return JSON.stringify(transformedTokens, null, 2);
    },
  },
  platforms: {
    json: {
      transformGroup: 'js',
      buildPath: 'dist/figma/',
      files: [
        {
          destination: 'tokens.json',
          format: 'figmaTokensPlugin',
        },
      ],
    },
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables'
        }
      ]
    },
    'scss': {
      transformGroup: "scss",
      buildPath: "dist/scss/",
      files: [
        {
          "destination": "tokens.scss",
          "format": "scss/variables"
        }
      ]
    },
    "react-native": {
      transformGroup: 'react-native',
      buildPath: 'dist/react-native/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        }
      ]
    },
  }
}
