const util = require('util');
const fs = require('fs');

const compileStylesheets = async () => {
    fs.copyFileSync(`${__dirname}/src/stylesheets/_mixins.scss`, `${__dirname}/dist/stylesheets/_mixins.scss`);
    fs.copyFileSync(`${__dirname}/src/stylesheets/formation-overrides/_variables.scss`, `${__dirname}/dist/stylesheets/formation-overrides/_variables.scss`);
}

compileStylesheets();