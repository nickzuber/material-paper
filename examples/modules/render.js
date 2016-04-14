/*
 *  This is the page that renders the React app and
 *  loads React onto the client. This is necessary for
 *  React functionality on the DOM load.
 *
 *  JSON _data is taken from the current page and parsed
 *  for routing to the proper page.
 *
 */

const React = require('react');
const ReactDOM = require('react-dom');

// Default Paths
const Index = require('./Index.jsx');

// Get page info from json object
// If this json isn't found, default to error_404 page
const __data = document.getElementById('_data').innerHTML;

// Attempting to grab mounting node
const mount = document.getElementById('app');

// If we can't find the mount node, we have to throw and exit
if(typeof mount === 'null'){
  throw new Error('Unable to find mounting node. Aborting render...');
}

// Parse the page info json
const router = JSON.parse(__data);

switch(router.view){
  case 'home':
    console.warn("Rendering home");
    ReactDOM.render(new React.createFactory(Index)({}), mount);
    break;
  default:
    console.warn("Rendering error");
    ReactDOM.render(new React.createFactory(Index)({}), mount);
}
