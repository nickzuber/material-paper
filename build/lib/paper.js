
/** Core Dependencies */
const React = require('react');

/** Styles */
const Styles = require('./styles/paper.stl');
const UtilStyles = require('./styles/utils.stl');

/** Classes */
const createBurst = require('./classes/createburst');
const onMouseUp = require('./classes/onmouseup');
const handleClick = require('./classes/handleclick');
const burst = require('./classes/burst');

/** Utility Methods */
const UtilityMethods = require('./utils/methods');

const baseClasses = {

  getDefaultProps: function () {
    return {
      settings: {}
    };
  },

  getInitialState: function () {
    return {
      token: undefined,
      defaultZDepth: undefined,
      raisedZDepth: undefined
    };
  },

  componentDidMount: function () {
    // Attempt to create a token until we get a unique one
    do {
      var tokenAttempt = UtilityMethods.hash(Math.floor(Date.now() + Math.random() * 21));
    } while (document.querySelector('.panel-base[data-token="' + tokenAttempt + '"]'));
    this.setState({
      token: tokenAttempt
    }, this._flagChildrenNodes);

    // Set a local variable for zDepth incase undefined
    var _zDepth = 'none';
    typeof this.props.settings.zDepth !== 'undefined' ? _zDepth = this.props.settings.zDepth : 0;

    // Set default zDepth
    switch (_zDepth) {
      case '0':
      case 0:
        this.setState({
          defaultZDepth: 'zero',
          raisedZDepth: 'one'
        });
        break;
      case '1':
      case 1:
        this.setState({
          defaultZDepth: 'one',
          raisedZDepth: 'two'
        });
        break;
      case '2':
      case 2:
        this.setState({
          defaultZDepth: 'two',
          raisedZDepth: 'three'
        });
        break;
      case '3':
      case 3:
        this.setState({
          defaultZDepth: 'three',
          raisedZDepth: 'four'
        });
        break;
      case '4':
      case 4:
        this.setState({
          defaultZDepth: 'four',
          raisedZDepth: 'four'
        });
        break;
      default:
        this.setState({
          defaultZDepth: 'none',
          raisedZDepth: 'zero'
        });
        break;
    }

    // Set event handler for un-bursting
    this._setEventHandler();
  },

  _flagChildrenNodes: function () {
    // Assuming that the paper token has been set.
    // Update children elements with -panel-item flag and also assign it the respective token
    var childrenLength = document.querySelector('.panel-top-level[data-token="' + this.state.token + '"]').children.length;
    for (i = 0; i < childrenLength; ++i) {
      // If we encounter another paper element as a child, we want to exit
      // We do *not* want to recurse into another paper element and try to make flag it as a child element
      // Doing so would cause many conflicts
      if (document.querySelector('.panel-top-level[data-token="' + this.state.token + '"]').children[i].classList.contains('panel-base')) break;
      document.querySelector('.panel-top-level[data-token="' + this.state.token + '"]').children[i].classList.add('-panel-item');
      document.querySelector('.panel-top-level[data-token="' + this.state.token + '"]').children[i].setAttribute('data-token', this.state.token);
    }
  },

  _setEventHandler: function () {
    if (!this.props.settings.clickable) return;

    if (typeof window !== 'undefined' && document.body.getAttribute('data-mp-listener-set') === null) {
      // To avoid setting more than one event listener for material paper, we add a flag
      // to the body element to let us know that the event listner has been set
      document.body.setAttribute('data-mp-listener-set', true);

      window.addEventListener('mouseup', function (e) {
        // Note: if a element is unresolvable and we cannot get a token or id, we
        //       want to set the variable to null to ensure that they are still
        //       technically equal to each other, to make sure the if condition
        //       later down the road will resolve to false.

        // Active burst element
        var existingBurstDOM = document.querySelector('.panel-burst[data-native]');
        if (existingBurstDOM) {
          var existingBurstID = existingBurstDOM.getAttribute('data-burst-token');
          //console.log('burstID: '+existingBurstID);
        } else {
            var existingBurstID = null;
            //console.log('burstID: '+existingBurstID+' (does not exist)');
          }

        // Target element
        var targetElementDOM = e.target;
        if (e.target.className.indexOf('-panel-item') > -1) {
          var targetElementToken = targetElementDOM.getAttribute('data-token');
          //console.log('paperID: '+targetElementToken);
        } else {
            var targetElementToken = null;
            //console.log('paperID: '+targetElementToken+' (not paper element)');
          }

        // If mouseup on any element that isn't the respective paper element,
        // we want to unburst the current burst element (if exists)
        if (existingBurstDOM && existingBurstID !== targetElementToken) {
          existingBurstDOM.style.transition = 'all 250ms ease';
          existingBurstDOM.style.transform = 'scale(0)';
          setTimeout(function () {
            existingBurstDOM.remove();
          }, 250);
        }
      });
    }
  },

  _onMouseOver: function () {
    // Zoom background if requested
    if (this.props.settings.zoom) {
      var backgroundDOM = document.querySelector('.panel-base[data-token="' + this.state.token + '"] .panel-background');
      backgroundDOM.style.transform = 'scale(1.05)';
    }

    // Lift up
    this.props.settings.liftOnHover ? this._liftUp() : 0;
  },

  _onMouseOut: function () {
    // Unzoom background if requested
    if (this.props.settings.zoom) {
      var backgroundDOM = document.querySelector('.panel-base[data-token="' + this.state.token + '"] .panel-background');
      backgroundDOM.style.transform = 'scale(1)';
    }
    // Lift back down
    this.props.settings.liftOnHover ? this._liftDown() : 0;

    // Lift back down (onClick)
    this.props.settings.liftOnClick ? this._liftDown() : 0;
  },

  _liftUp: function () {
    var baseDOM = document.querySelector('.panel-base[data-token="' + this.state.token + '"]');
    baseDOM.style.boxShadow = UtilStyles.zDepth[this.state.raisedZDepth].boxShadow;
  },

  _liftDown: function () {
    var baseDOM = document.querySelector('.panel-base[data-token="' + this.state.token + '"]');
    baseDOM.style.boxShadow = UtilStyles.zDepth[this.state.defaultZDepth].boxShadow;
  },

  _animate: function (manual) {
    var burstDOM = document.querySelector('.panel-burst[data-burst-token="' + this.state.token + '"]');
    if (!burstDOM) {
      return 0;
    }
    var timing = 1000;

    // Burst down animation
    burstDOM.style.transition = 'all ' + timing + 'ms cubic-bezier(0.23, 1, 0.32, 1) 0s';
    burstDOM.style.transform = 'scale(1.5)';

    // If manual burst element, we want to burst it right away
    // and not wait for a mouseup event to trigger burst.
    manual ? this._burst(this.props.settings.burstSpeed) : 0;
  },

  render: function () {

    // If settings was not declared, quickly define an empty object
    if (!Object.keys(this.props.settings).length && typeof this.state.token !== 'undefined') {
      console.warn('Warning: Paper element initialized without any settings.\n         Unresolved paper token: ' + this.state.token);
    }

    // TODO: Add all of the possible settings to this comment, and then migrate to API
    // Outlines the possible settings for Paper
    //   overlayColor     : {string}  : background color to middle section of the paper (overlay color on background)
    //   background       : {string}  : the background of the paper
    //   style            : {object}  : custom style attribute for base paper
    //   burstSpeed       : {number}  : (ms) the speed at which the bursting animates
    //   burstColor       : {number}  : the color of the burst
    //   clickable        : {boolean} : the ability to click paper like a button
    //   liftOnHover      : {boolean} : raise the paper up a level when mouse hovers
    //   liftOnClick      : {boolean} : raise the paper up a level when mouse clicks
    //   zoom             : {boolean} : slightly zoom in on background when mouse hovers
    //   zDepth           : {number}  : set the zDepth to the paper element

    var overlayColor = {};
    var backgroundProperties = {};
    var topLevelStyles = {};
    var baseStyles = {};
    var burstColor = {};

    // Add custom class name(s) to base paper if requested
    var coreClassList = 'panel-bottom-level panel-base ' + this.props.className;

    UtilityMethods.__extend(backgroundProperties, Styles.midBottomLevel);
    UtilityMethods.__extend(backgroundProperties, Styles.background);
    UtilityMethods.__extend(overlayColor, Styles.midUpperLevel);
    UtilityMethods.__extend(topLevelStyles, Styles.topLevel);
    UtilityMethods.__extend(baseStyles, Styles.bottomLevel);

    if (this.props.settings.background) {
      backgroundProperties.background = this.props.settings.background;
    }
    if (this.props.settings.overlayColor) {
      overlayColor.background = this.props.settings.overlayColor;
    }
    if (this.props.settings.style) {
      UtilityMethods.__extend(baseStyles, this.props.settings.style);
    }
    if (this.props.settings.clickable) {
      topLevelStyles.cursor = 'pointer';
    }

    // Set a local variable for zDepth incase undefined
    var _zDepth = 'none';
    typeof this.props.settings.zDepth !== 'undefined' ? _zDepth = this.props.settings.zDepth : 0;

    // Set the zDepth value for paper
    switch (_zDepth) {
      case '0':
      case 0:
        UtilityMethods.__extend(baseStyles, UtilStyles.zDepth.zero);
        break;
      case '1':
      case 1:
        UtilityMethods.__extend(baseStyles, UtilStyles.zDepth.one);
        break;
      case '2':
      case 2:
        UtilityMethods.__extend(baseStyles, UtilStyles.zDepth.two);
        break;
      case '3':
      case 3:
        UtilityMethods.__extend(baseStyles, UtilStyles.zDepth.three);
        break;
      case '4':
      case 4:
        UtilityMethods.__extend(baseStyles, UtilStyles.zDepth.four);
        break;
      default:
        UtilityMethods.__extend(baseStyles, UtilStyles.zDepth.none);
        break;
    }

    // Update: <a> was swapped for <span> (refering to the element with panel-link class)
    //         This was because React throwing errors when trying to nest <a> tags
    //         which would occur if the user tried to nest Paper components (which they should be able to do)
    //         So this means any link-related paper has to redirect in a customly built way (not a big deal)

    return React.createElement(
      'div',
      { 'data-token': this.state.token, style: baseStyles, className: coreClassList },
      React.createElement('div', { 'data-token': this.state.token, className: 'panel-mid-bottom-level panel-background', style: backgroundProperties }),
      React.createElement('div', { 'data-token': this.state.token, className: 'panel-mid-upper-level panel-gradient', style: overlayColor }),
      React.createElement(
        'span',
        { onMouseDown: this._createBurst,
          onMouseUp: this._onMouseUp,
          onMouseOver: this._onMouseOver,
          onMouseOut: this._onMouseOut,
          className: 'panel-link -panel-item',
          'data-token': this.state.token,
          style: Styles.link },
        React.createElement(
          'div',
          {
            onClick: this._handleOnClick,
            'data-token': this.state.token,
            className: 'panel-top-level -panel-item',
            style: topLevelStyles },
          this.props.children
        )
      )
    );
  }

};

const materialPaperClasses = {};

UtilityMethods.__weakExtend(materialPaperClasses, baseClasses);
UtilityMethods.__weakExtend(materialPaperClasses, onMouseUp);
UtilityMethods.__weakExtend(materialPaperClasses, createBurst);
UtilityMethods.__weakExtend(materialPaperClasses, handleClick);
UtilityMethods.__weakExtend(materialPaperClasses, burst);

const MaterialPaper = React.createClass(materialPaperClasses);

module.exports = MaterialPaper;