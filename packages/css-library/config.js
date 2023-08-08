module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
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
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/variables'
        }
      ]
    },
    json: {
      transformGroup: 'web',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json'
        }
      ]
    },
  }
}