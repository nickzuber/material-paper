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
const Paper = require('../../build/index');

var paperNavSettings = {
  background: '#eee',
  style: {
    margin      : '0 auto',
    display     : 'block',
    height      : '100vh',
    width       : '100%',
    position    : 'absolute',
    zIndex      : 1000,
    left        : 0,
    top         : 0
  },
  overlayColor  : undefined,
  burstSpeed    : 3000,
  burstColor    : undefined,
  clickable     : false,
  liftOnHover   : false,
  liftOnClick   : false,
  zDepth        : 1
}

var paperSettings = {
  background: '#fff',
  style: {
    margin      : '0 auto',
    display     : 'block',
    height      : '100vh',
    width       : '250px',
    position    : 'absolute',
    left        : 0,
    zIndex      : 1500,
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

const app = React.createClass({

  componentDidMount: function(){
    // Just to animate the side bar menu back into view
    if(typeof document !== 'undefined'){
      setTimeout(function(){
        document.querySelector('.sideBar').style.marginLeft = '0px';
      }, 50);
    }
  },

  _handleClick: function(ref){
    var targetPaper = this.refs.navBar;
    setTimeout(function(){
      targetPaper.createBurst(0, 0);
    }, 200);
  },

  render: function(){
    return(
      <div>
        <Paper className='navBar' ref='navBar' settings={paperNavSettings}></Paper>

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

            <Paper onClick={this._handleClick} settings={paperButtonSettings}>
              <p style={buttonLabel}>Raised Button</p>
            </Paper>
          </Paper>
      </div>
    );
  }

});

module.exports = app;