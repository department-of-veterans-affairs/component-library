module.exports = function(api) {

  const plugins = [
    // Stage 2
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    // Stage 3
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',
    [
      'transform-react-remove-prop-types',
      {
        removeImport: true,
      },
    ],
    'lodash',
  ];

  if (api.env('test')) {
    api.cache.using(() => process.env.NODE_ENV === 'test');
    return {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/react',
      ],
      plugins: ['dynamic-import-node'].concat(plugins)
    }
  }

  api.cache.using(() => process.env.NODE_ENV !== 'test');
  return {
    // Javascript settings.
    presets: [
      [
        '@babel/env',
        {
          forceAllTransforms: true,
          targets: {
            browsers: [
              'Chrome 60',
              'Firefox 57',
              'iOS 9',
              'Edge 14',
              'ChromeAndroid 64',
              'Safari 10',
              'ie 11',
            ],
          },
          useBuiltIns: 'entry',
          debug: false,
        },
      ],
      '@babel/react',
    ],
    plugins,
  };
};
