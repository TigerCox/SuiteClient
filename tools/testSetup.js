// Tests are placed alongside files under test.
// This file does the following:
// 1. Registers babel for transpiling our code for testing
// 2. Disables Webpack-specific features that Mocha doesn't understand.
// 3. Requires jsdom so we can test via an in-memory DOM in Node
// 4. Sets up global vars that mimic a browser.

/*eslint-disable no-var*/

process.env.NODE_ENV = 'production'; // this assures the .babelrc dev config doesn't apply.

require('babel-register')();
var glob = require('glob');

// Warn if no test files are found. Mocha will present a crypic message otherwise.
glob("src/**/*.spec.js", {}, function(err, files) {
  if (files.length === 0) {
    console.warn(`No tests found in the src directory. Create at least one test file in the src directory ending in .spec.js. Or, disable tests.`); // eslint-disable-line no-console
    process.exit(1); // Return 1 to signify failure and stop additional processing
  }
});

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
require.extensions['.css'] = function(){ return null; };
require.extensions['.png'] = function(){ return null; };
require.extensions['.jpg'] = function(){ return null; };

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document; //eslint-disable-line no-undef
