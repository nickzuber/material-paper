# [material-paper](https://github.com/nickzuber/material-paper)

>React Component of paper material inspired by Google's Material Design.

Material-Paper is designed to be a malleable, versatile, and responsive component for any web application. It acts as a general container that provides responsive and material-like behavior.

## Installation 

Material-Paper is available as an [npm package](https://www.npmjs.com/package/material-paper).

```
$ npm install --save material-paper
```

## Usage

Material-Paper is simply a React component, so you should be fairly familiar with the [React](https://facebook.github.io/react/) framework before using Material-Paper.

##### Settings Attribute

While most React components are comprised of an assortment of attributes used for configuration, this can easily make the code feel cluttered messy very quickly. In an attempt to avoid this issue, Material-Paper is configured with a single `settings` attribute, which takes in a parameters of a basic JavaScript object that contains any configuration you choose. 

Here is a simple example of Material-Paper using the `settings` attribute to configure any settings:

```javascript
const React = require('react');
const Paper = require('material-paper');

var paperSettings = {
  background: '#fff',
  style: {
    margin      : '0 auto',
    display     : 'block',
    height      : '150px',
    width       : '200px'
  },
  overlayColor  : undefined,
  burstSpeed    : 2000,
  burstColor    : undefined,
  clickable     : true,
  liftOnHover   : false,
  liftOnClick   : true,
  zDepth        : 1
}

const MyAwesomeReactApp = React.createClass({
  render: function(){
    return(
      <div>
        <Paper settings={paperSettings}>
          Hello World!
        </Paper>
      </div>
    );
  }
});
```

##### Configuration Options

There are an array of possible settings that you can configure within the `settings` attribute. Here is a list of what they are and what kinds of parameters they expect:

 - **background** - *string* - The background of the paper component; expects some color, image link, etc. If you're trying to set the background to an image, just using the format `url('path/to/image.png')`.

 - **style** - *object* - Defines any custom styles to the paper component. The contents of this object is that of any other traditional style object.

 - **overlayColor** - *string* - An overlay color to the paper component. This is exactly what it sounds like; an optional overlay color to the current paper component background.

 - **burstSpeed** - *number* - The speed in which a burst element will perform its bursting animation (ms).

 - **burstColor** - *string* - Defines the color of the burst element. The burst element is a light, translucent gray.

 - **clickable** - *boolean* - Whether or not the paper component can be clicked, or has click related properties. 

 - **liftOnHover** - *boolean* - Whether or not the paper component will change zDepth when it's hovered over.

 - **liftOnClick** - *boolean* - Whether or not the paper component will change zDepth when it's clicked.

 - **zDepth** - *number* - Defines the zDepth of the paper component. The zDepth is the distance the paper component is from the ground of the application.

 - **zoom** - *boolean* - Whether or not the paper component background will slightly zoom when it's hovered over.

 - **noBoundaries** - *boolean* - Whether or not a burst emitted from the paper component can leave the boundaries of the paper component itself and spread into its surroundings.

 - **circular** - *boolean* - Whether or not the paper component will be rounded or rectangular.


## Examples

If you want to see Material-Paper in action, feel free to check out one of the examples in the [`/examples`](https://github.com/nickzuber/material-paper/tree/master/examples) directory. To get the example up and running, all you need to do is build the `jsx` source files and then build/run the example application to test it out.

The following commands should do the trick:

```
$ git clone https://github.com/nickzuber/material-paper.git
$ cd material-paper
$ npm run serve
```

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2016 Nick Zuber