let transform  =  require('@divriots/style-dictionary-to-figma');
const fs = require('fs');
const colors = require('./tokens/color.json')
const figmaObj = transform.transform(colors)

//console.log(figmaObj.toString())

fs.writeFile('figmacolors.json', JSON.stringify(figmaObj), err => {
  if (err) {
    console.error(err);
  }
})