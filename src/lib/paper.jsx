
// Node components
const React = require('react');

// Styles
const Styles = require('./styles/paper.stl');
const UtilStyles = require('./styles/utils.stl');

/**
 * Extends an object with the properties of another.
 * @param {Object} the object to inherit properties
 * @param {Object} the object to supply properties
 * @return void
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b){
      if(b.hasOwnProperty(p)){
        d[p] = b[p];
      }
    }
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

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
      title: 'Undefined'
    };
  },

  getInitialState: function(){
    return {
      token         : undefined,
      defaultZDepth : undefined,
      raisedZDepth  : undefined
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

    // Update children elements with -panel-item flag
    var childrenLength = document.querySelector('.panel-top-level').children.length;
    for(i=0; i<childrenLength; ++i){
      document.querySelector('.panel-top-level').children[i].classList.add('-panel-item');
    }

    // Set default zDepth
    switch(parseInt(this.props.settings.zDepth, 10)){
      case 0:
        this.setState({
          defaultZDepth: 'zero',
          raisedZDepth : 'one'
        });
        break;
      case 1:
        this.setState({
          defaultZDepth: 'one',
          raisedZDepth : 'two'
        });
        break;
      case 2:
        this.setState({
          defaultZDepth: 'two',
          raisedZDepth : 'three'
        });
        break;
      case 3:
        this.setState({
          defaultZDepth: 'three',
          raisedZDepth : 'four'
        });
        break;
      case 4:
        this.setState({
          defaultZDepth: 'four',
          raisedZDepth : 'four'
        });
        break;
      default:
        this.setState({
          defaultZDepth: 'zero',
          raisedZDepth : 'one'
        });
        break;
    }

    // Set event handler for un-bursting
    this._setEventHandler();
  },

  _setEventHandler: function(){
    if(!this.props.settings.clickable) return;

    if(typeof window !== 'undefined'){
      window.addEventListener('mouseup', function(e){
        // Note: if a element is unresolvable and we cannot get a token or id, we
        //       want to set the variable to NaN instead of undefined or null. This
        //       is because when we compare the id with the token, if they're both
        //       set to undefined or both set to null, they will resolve as true,
        //       while NaN and NaN resolve to false.

        // Active burst element
        var existingBurstDOM = document.querySelector('.panel-burst');
        if(existingBurstDOM){
          var existingBurstID = existingBurstDOM.getAttribute('data-burst-token');
          console.log('burstID: '+existingBurstID);
        }else{
          var existingBurstID = NaN;
          console.log('burstID: '+existingBurstID+' (does not exist)');
        }

        // Target element
        var targetElementDOM = e.target;
        if(e.target.className.indexOf('-panel-item') > -1){
          var targetElementToken = targetElementDOM.getAttribute('data-token');
          console.log('paperID: '+targetElementToken);
        }else{
          var targetElementToken = NaN;
          console.log('paperID: '+targetElementToken+' (not paper element)');
        }

        // If mouseup on any element that isn't the respective paper element, 
        // we want to unburst the current burst element (if exists)
        if(existingBurstDOM && existingBurstID !== targetElementToken){
          existingBurstDOM.style.transition = 'all 250ms ease';
          existingBurstDOM.style.transform = 'scale(0)';
          setTimeout(function(){
            existingBurstDOM.remove();
          }, 250);
        }
      });
    }
  },

  _onMouseOver: function(){
    if(!this.props.settings.clickable) return;
    var backgroundDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"] .panel-background');
    //backgroundDOM.style.transform = 'scale(1.05)';

    // Lift up
    this.props.settings.liftOnHover ? this._liftUp() : 0;
  },

  _onMouseOut: function(){
    if(!this.props.settings.clickable) return;
    var backgroundDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"] .panel-background');
    //backgroundDOM.style.transform = 'scale(1)';

    // Lift back down
    this.props.settings.liftOnHover ? this._liftDown() : 0;

    // Lift back down (onClick)
    this.props.settings.liftOnClick ? this._liftDown() : 0;
  },

  _liftUp: function(){
    var baseDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"]');
    baseDOM.style.boxShadow = UtilStyles.zDepth[this.state.raisedZDepth].boxShadow;
  },

  _liftDown: function(){
    var baseDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"]');
    baseDOM.style.boxShadow = UtilStyles.zDepth[this.state.defaultZDepth].boxShadow;
  },

  _onMouseDown: function(e){
    if(!this.props.settings.clickable) return;
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

    // Get dimensions to calculate burst size
    var largerDimension = (baseDOM.offsetHeight > baseDOM.offsetWidth) ? baseDOM.offsetHeight : baseDOM.offsetWidth;
    var burstSize = largerDimension / 6;
    burstDOM.style.height = burstDOM.style.width = burstSize+'px';

    // TODO: Static burst class styles
    burstDOM.style.background = 'rgba(0,0,0,.09)';
    burstDOM.style.borderRadius = '100%';
    burstDOM.style.position = 'absolute';
    burstDOM.style.zIndex = '1500';
    burstDOM.style.transform = 'scale(0)';

    this.props.settings.burstColor ? burstDOM.style.background = this.props.settings.burstColor : 0;

    // Attach to panel
    baseDOM.appendChild(burstDOM);

    // Set location
    var baseDOMCoords = getPosition(baseDOM);
    burstDOM.style.top = (e.clientY - baseDOMCoords.y - (burstSize/2))+'px';
    burstDOM.style.left = (e.clientX - baseDOMCoords.x - (burstSize/2))+'px';

    // Lift up
    this.props.settings.liftOnClick ? this._liftUp() : 0;

    this._animate(this.props.settings.burstSpeed);
  },

  _animate: function(timing){
    if(!this.props.settings.clickable) return;

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
    if(!this.props.settings.clickable) return;

    var burstDOM = document.querySelector('.panel-burst[data-burst-token="'+this.state.token+'"]');
    if(!burstDOM){
      return 0;
    }

    // Get base node
    var baseDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"]');
    var largerDimension = (baseDOM.offsetHeight > baseDOM.offsetWidth) ? baseDOM.offsetHeight : baseDOM.offsetWidth;
    var baseDimensions = (baseDOM.offsetHeight + baseDOM.offsetWidth) / 2;
    var burstDimensions = (burstDOM.offsetHeight + burstDOM.offsetWidth) / 2;
    var burstDistance = largerDimension / burstDimensions;
    burstDistance *= 1.5;

    var timing = timing || 1250;

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
    if(!this.props.settings.clickable) return;

    // Lift back down
    this.props.settings.liftOnClick ? this._liftDown() : 0;

    // Burst
    this._burst(this.props.settings.burstSpeed);
  },

  render: function(){

    // If settings was not declared, quickly define an empty object
    if(!this.props.settings){
      this.props.settings = {};
      console.warn('Warning: material-paper initialized without any settings.\nUnresolved paper token: '+this.state.token);
    }

    // TODO: __extends is causing a Uncaught RangeError: Maximum call stack size exceeded
    //       This is probably due to deep extending into extensive React prototypes somehow
    //       Consider editing this function to perform only shallow copies.
    // EDIT: Implemented shallow copying with Object.assign().
    //       Not sure how stable or widely support this function is, might
    //       make a custom version.

    // Outlines the possible settings for Paper
    //   overlayColor     : background color to middle section of the paper (overlay color on background)
    //   background       : the background of the paper
    //   style            : custom style attribute for base paper
    //   burstSpeed       : (ms) the speed at which the bursting animates
    //   burstColor       : the color of the burst
    //   clickable        : the ability to click paper like a button

    var overlayColor = {}; 
    var backgroundProperties = {};
    var topLevelStyles = {};
    var baseStyles = {};
    var burstColor = {};

    Object.assign(backgroundProperties, Styles.midBottomLevel);
    Object.assign(backgroundProperties, Styles.background);

    Object.assign(overlayColor, Styles.midUpperLevel);

    if(this.props.settings.background){
      backgroundProperties.background = this.props.settings.background;
    }
    if(this.props.settings.overlayColor){
      overlayColor.background = this.props.settings.overlayColor;
    }
    if(this.props.settings.style){
      baseStyles = Styles.bottomLevel;
      Object.assign(baseStyles, UtilStyles.zDepth.zero);
      Object.assign(baseStyles, this.props.settings.style);
    }
    if(this.props.settings.clickable){
      topLevelStyles = {'cursor':'pointer'};
      Object.assign(topLevelStyles, Styles.topLevel);
    }

    // Update: <a> was swapped for <span> (refering to the element with panel-link class)
    //         This was because React throwing errors when trying to nest <a> tags
    //         which would occur if the user tried to nest Paper components (which they should be able to do)

    return(
      <div data-token={this.state.token} style={baseStyles} className="panel-bottom-level panel-base">
        <div data-token={this.state.token} className="panel-mid-bottom-level panel-background" style={backgroundProperties}></div>
        <div data-token={this.state.token} className="panel-mid-upper-level panel-gradient" style={overlayColor}></div>
        <span onMouseDown={this._onMouseDown} 
           onMouseUp={this._onMouseUp}
           onMouseOver={this._onMouseOver}
           onMouseOut={this._onMouseOut}
           className="panel-link -panel-item" 
           data-token={this.state.token}
           style={Styles.link}>
          <div data-token={this.state.token} className="panel-top-level -panel-item" style={topLevelStyles}>
            {this.props.children}
          </div>
        </span>
      </div>
    );
  }

});

module.exports = Paper;