/* eslint-disable no-console */
const rimraf = require('rimraf');
const glob = require('glob');
const fs = require('fs-extra');
const babel = require('@babel/core');
const recast = require('recast');
const path = require('path');

console.log('Starting formation-react build');
console.log('Cleaning old build');
rimraf.sync('./*.js');

// this comes from gulp-flatten-requires
// https://github.com/insin/gulp-flatten-requires/blob/master/index.js
// Flattens paths given to require
/* eslint-disable */
function flattenRequires(bufferString) {
  return new Buffer(
    recast.print(
      recast.visit(recast.parse(bufferString), {
        visitCallExpression: function (path) {
          this.traverse(path);
          var expr = path.node;
          if (expr.callee.name == 'require') {
            if (
              expr.arguments.length &&
              expr.arguments[0].value.charAt(0) == '.'
            ) {
              var arg = expr.arguments[0];
              expr.arguments[0] =
                arg.raw.charAt(0) +
                './' +
                arg.value.split('/').pop() +
                arg.raw.charAt(0);
            }
          } else {
            return false;
          }
        },
      }),
    ).code,
  );
}
/* eslint-enable */
/* eslint-disable no-console */

// get a flat array of file paths
const fileNames = [].concat.apply(
  [],
  [
    glob.sync('./src/components/**/*.jsx', {
      ignore: ['./**/*.unit.spec.jsx', './**/*.stories.jsx'],
    }),
    glob.sync('./src/helpers/*.js'),
  ],
);

fileNames.forEach((fileName) => {
  // read a file into a buffer
  const fileBuffer = fs.readFileSync(fileName);
  // transform the buffer with babel using babelrc
  const babelTransformedBuffer = babel.transform(fileBuffer, {
    configFile: '../../babel.config.js',
  }).code;
  // flatten paths given to all requires
  const requireFlattenedBuffer = flattenRequires(
    babelTransformedBuffer.toString(),
  );
  const newFileName = `${path.parse(fileName).name}.js`;

  // write file to main package folder
  fs.writeFileSync(`./${newFileName}`, requireFlattenedBuffer);
  console.log(`${newFileName} built`);
});
