/*
 *  Index Page
 *
 *  Here is where the index/landing page is constructed
 *  and sent off to the app.bundle.js page to be processed
 *  and piped.
 *
 */

// Node components
const React = require('react');

// Module components
const MP = require('../../build/index');
const Paper = MP.Paper;

var paperSettings = {
  background: '#fff',
  style: {
    'margin'   : '0 auto',
    'display'  : 'block',
    'height'   : '100vh',
    'width'    : '250px',
    'position' : 'absolute',
    'left'     : 0
  },
  overlayColor : undefined,
  burstSpeed   : undefined,
  burstColor   : undefined,
  clickable    : false,
  liftOnHover  : false,
  liftOnClick  : false,
  zDepth       : 2
}

var paperButtonSettings = {
  background: '#fff',
  style: {
    'margin'   : '0 auto',
    'display'  : 'block',
    'height'   : '50px',
    'width'    : '250px'
  },
  overlayColor : undefined,
  burstSpeed   : undefined,
  burstColor   : undefined,
  clickable    : true,
  liftOnHover  : false,
  liftOnClick  : true,
}

// Construct React component
const app = React.createClass({

  render: function(){
    return(
      <div>
        <Paper settings={paperSettings}>
            <Paper settings={paperButtonSettings}>
              Home
            </Paper>
          </Paper>
      </div>
    );
  }

});

module.exports = app;