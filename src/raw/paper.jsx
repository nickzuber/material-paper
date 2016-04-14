
// Node components
const React = require('react');

/** @private
 * Returns a hash of a given string
 * @param {string} string to hash
 * @return {string} hashed string
 */
function hash(string){
  var length = Math.floor(Math.random() * 10) + 10;
  var mask = '.abcdefghijklmnopqrstuvwxyz';
  mask += '.ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  mask += '.0123456789';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
  return result;
}

/** @private
 * @derivedSource: http://stackoverflow.com/questions/11805955/how-to-get-the-distance-from-the-top-for-an-element
 * @derivedAuthor: Shawn Whinnery
 *
 * Gets the absolute coords of a given DOM element.
 * @param {DOMElement} element to find coords
 * @return {object} object containing x and y coords
 */
function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;
  while(element){
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      yPosition += (element.offsetTop + element.clientTop);
      element = element.offsetParent;
  }
  // Account for distance scrolled from top of document
  yPosition -= window.scrollY;
  return {
    x: xPosition,
    y: yPosition
  };
}

const Paper = React.createClass({

  getDefaultProps: function() {
    return {
      title: 'Undefined',
      description: 'Undefined'
    };
  },

  getInitialState: function(){
    return {
      token: undefined
    }
  },

  componentDidMount: function(){
    // Attempt to create a token until we get a unique one
    do{
      var tokenAttempt = hash(Math.floor(Date.now()+(Math.random()*21)));
    }while(document.querySelector('.panel-base[data-token="'+tokenAttempt+'"]'));

    this.setState({
      token: tokenAttempt
    });
  },

  _onMouseOver: function(){
    var backgroundDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"] .panel-background');
    backgroundDOM.style.transform = 'scale(1.05)';
  },

  _onMouseOut: function(){
    var backgroundDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"] .panel-background');
    backgroundDOM.style.transform = 'scale(1)';
  },

  _onMouseDown: function(e){
    e.preventDefault();

    // Target base nodes
    var baseDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"]');
    var oldBurstDOM = document.querySelector('.panel-burst[data-burst-token="'+this.state.token+'"]');

    // If already exists, remove old and make new.
    if(oldBurstDOM){
      oldBurstDOM.remove();
    }

    // Create burst
    var burstDOM = document.createElement('span');
    burstDOM.className = 'panel-burst';
    burstDOM.setAttribute('data-burst-token', this.state.token);
    this.props.burstColor ? burstDOM.style.background = this.props.burstColor : 0;

    // Attach to panel
    baseDOM.appendChild(burstDOM);

    // Set location
    var baseDOMCoords = getPosition(baseDOM);
    burstDOM.style.top = (e.clientY - baseDOMCoords.y - 25)+'px';
    burstDOM.style.left = (e.clientX - baseDOMCoords.x - 25)+'px';


    this._animate(1500);

  },

  _animate: function(timing){
    var burstDOM = document.querySelector('.panel-burst[data-burst-token="'+this.state.token+'"]');
    if(!burstDOM){
      return 0;
    }

    var timing = timing || 1000;

    // Burst down animation
    burstDOM.style.transition = 'all '+timing+'ms cubic-bezier(0.23, 1, 0.32, 1) 0s';
    burstDOM.style.transform = 'scale(1.5)';

  },

  _burst:function(timing){
    var burstDOM = document.querySelector('.panel-burst[data-burst-token="'+this.state.token+'"]');
    if(!burstDOM){
      return 0;
    }

    // Get base node
    var baseDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"]');
    var baseDimensions = (baseDOM.offsetHeight + baseDOM.offsetWidth) / 2;
    var burstDimensions = (burstDOM.offsetHeight + burstDOM.offsetWidth) / 2;
    var burstDistance = baseDimensions / burstDimensions;
    burstDistance *= 1.5;

    var timing = timing || 500;

    // Burst animation
    burstDOM.style.transition = 'all '+timing+'ms cubic-bezier(0.23, 1, 0.32, 1) 0s';
    burstDOM.style.transform = 'scale('+burstDistance+')';
    burstDOM.style.opacity = '0';

    // Remove burst element when finished animating
    setTimeout(function(){
      burstDOM.remove();
    }, timing);
  },

  _onMouseUp: function(){
    this._burst(1250);
  },

  render: function(){

    var gradientColor = {};
    var backgroundProperties = {};
    var burstColor = {};

    if(this.props.background){
      backgroundProperties.backgroundImage = 'url('+this.props.background+')';
    }
    if(this.props.gradientColor){
      gradientColor.background = this.props.gradientColor;
    }

    return(
      <div data-token={this.state.token} className="panel-bottom-level panel-base">
        <div className="panel-mid-bottom-level panel-background" style={backgroundProperties}></div>
        <div className="panel-mid-upper-level panel-gradient" style={gradientColor}></div>
        <a onMouseDown={this._onMouseDown} 
           onMouseUp={this._onMouseUp}
           onMouseOver={this._onMouseOver}
           onMouseOut={this._onMouseOut}
           className="panel-link -panel-item" 
           href="javascript:void(0);">
          <div className="panel-top-level -panel-item">
            <h2 className="-panel-item">{this.props.title}</h2>
            <p className="-panel-item">{this.props.description}</p>
          </div>
        </a>
      </div>
    );
  }

});

module.exports = Paper;