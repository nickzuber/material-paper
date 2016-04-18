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
const MP = require('../../src/index');
const Paper = MP.Paper;

// Construct React component
const app = React.createClass({

  render: function(){
    return(
      <div>
        <Paper
          backgroundColor='#fff'
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