# [material-paper](https://github.com/nickzuber/material-paper)

>React Components inspired by Google's Material Design.

Material-Paper is designed to be a malleable, versatile, and responsive component for any web application. 

## Installation 

Material-Paper is available as an [npm package](https://www.npmjs.com/package/material-paper).

```
$ npm install --save material-paper
```

## Usage

Material-Paper is simply a React component, so you should be fairly familiar with the [React](https://facebook.github.io/react/) framework before using Material-Paper.

#### Settings

While most React components are comprised of an assortment of attributes used for configuration, this can easily make the code feel cluttered messy very quickly. In an attempt to avoid this issue, Material-Paper is configured with a single `settings` attribute, which takes in a parameters of a basic JavaScript object that contains any configuration you choose.

Here is a simple example of Material-Paper using the `settings` attribute to configure any settings:

```
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

## API Reference


## Examples

If you want to see Material-Paper in action, feel free to check out one of the examples in the [`/examples`](https://github.com/nickzuber/needle/tree/master/examples) directory. To get the example up and running, all you need to do is build the `jsx` source files and then build/run the example application to test it out.

The following commands should do the trick:

```
$ git clone https://github.com/nickzuber/material-paper.git
$ cd material-paper
$ npm run serve
```

## Contributing


## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2015 Nick Zuber
