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
    'margin': '50px auto 50px',
    'display': 'block'
  },
  burstSpeed: 1500
}

// Construct React component
const app = React.createClass({

  render: function(){
    return(
      <div>
        <Paper
          settings={paperSettings}

          background='#fff'
          style={{
            'margin': '50px auto 50px',
            'display': 'block'
          }}
          >
            <h1>Header</h1>
            <p>Paragraph text and some more words and stuff.</p>
          </Paper>
      </div>
    );
  }

});

module.exports = app;