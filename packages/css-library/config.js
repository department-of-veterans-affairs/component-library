module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
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