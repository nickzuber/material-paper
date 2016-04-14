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
          title='Some Header'
              description='Just some somewhat brief description of what this is.'
              backgroundColor='rgb(222, 79, 79)'
              style={{
                'margin': '50px auto 50px',
                'display': 'block'
              }}
              target='' ></Paper>
      </div>
    );
  }

});

module.exports = app;