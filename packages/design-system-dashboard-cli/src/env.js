const fs = require('fs');
const path = require('path');

// Read the .env.json file to get the path to vets-website
const envContents = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../.env.json'))
);

module.exports = {
  repos: {
    'vets-website': path.resolve(envContents.repos['vets-website']),
    'content-build': path.resolve(envContents.repos['content-build']),
  },
};
