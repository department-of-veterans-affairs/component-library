import 'axe-core';

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const testsContext = require.context('..', true, /\.spec\.js[x]{0,1}$/);
testsContext.keys().forEach(testsContext);
