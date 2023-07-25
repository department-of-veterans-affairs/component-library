const { transform } = require('@divriots/style-dictionary-to-figma');
const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
  name: 'size/base-font-16',
  type: 'value',
  matcher: function(token) {
      return token.value.toString().includes('rem');
  },
  transformer: function(token) {
    return parseFloat(token.value) * 16;
  }
});

StyleDictionary.registerTransform({
  name: 'size/remove-px-unit',
  type: 'value',
  matcher: function(token) {
    return token.value.toString().includes('px');
  },
  transformer: function(token) {
    return token.value.replace('px', '');
  }
});

module.exports = {
  "source": ["tokens/**/*.json"],
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      const transformedTokens = transform(dictionary.tokens);
      return JSON.stringify(transformedTokens, null, 2);
    },
  },
  platforms: {
    figma: {
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
    "react-native-json": {
      transforms: ["size/base-font-16", "size/remove-px-unit"],
      buildPath: 'dist/react-native/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        }
      ]
    },
    "react-native-js": {
      transforms: ["name/cti/camel", "size/object", "color/css", "size/base-font-16", "size/remove-px-unit"],
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
