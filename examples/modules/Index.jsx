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
    margin      : '0 auto',
    display     : 'block',
    height      : '100vh',
    width       : '250px',
    position    : 'absolute',
    left        : 0,
    marginLeft  : '-250px' // For animation purposes, we start the menu out of view
  },
  overlayColor  : undefined,
  burstSpeed    : undefined,
  burstColor    : undefined,
  clickable     : false,
  liftOnHover   : false,
  liftOnClick   : false,
  zDepth        : 2
}

var paperButtonSettings = {
  background: '#fff',
  style: {
    margin     : '10px auto',
    display    : 'block',
    height     : '50px',
    width      : '150px'
  },
  overlayColor : undefined,
  burstSpeed   : undefined,
  burstColor   : undefined,
  clickable    : true,
  liftOnHover  : false,
  liftOnClick  : true,
  zoom         : false,
  zDepth       : 0
}

var menuButtonSettings = {
  background: '#fff',
  style: {
    margin     : '0 auto',
    display    : 'block',
    height     : '50px',
    width      : '250px'
  },
  overlayColor : undefined,
  burstSpeed   : undefined,
  burstColor   : undefined,
  clickable    : true,
  liftOnHover  : false,
  liftOnClick  : false,
  zoom         : false
}

var buttonLabel = {
  textAlign: 'center',
  fontWeight: 500
}

// Construct React component
const app = React.createClass({

  componentDidMount: function(){
    if(typeof document !== 'undefined'){
      setTimeout(function(){
        document.querySelector('.sideBar').style.marginLeft = '0px';
      }, 100)
    }
  },

  render: function(){
    return(
      <div>
        <Paper className='sideBar' settings={paperSettings}>
            <Paper settings={menuButtonSettings}>
              <p style={buttonLabel}>Button One</p>
            </Paper>
            <Paper settings={menuButtonSettings}>
              <p style={buttonLabel}>Button Two</p>
            </Paper>
            <Paper settings={menuButtonSettings}>
              <p style={buttonLabel}>Button Three</p>
            </Paper>
            <Paper settings={paperButtonSettings}>
              <p style={buttonLabel}>Raised Button</p>
            </Paper>
          </Paper>
      </div>
    );
  }

});

module.exports = app;