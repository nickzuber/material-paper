
/** Core Dependencies */
const React = require('react');

/** Styles */
const Styles     = require('./styles/paper.stl');
const UtilStyles = require('./styles/utils.stl');

/** Classes */
const createBurst       = require('./classes/createburst');
const onMouseUp         = require('./classes/onmouseup');
const onMouseOver       = require('./classes/onmouseover');
const onMouseOut        = require('./classes/onmouseout');
const handleClick       = require('./classes/handleclick');
const burst             = require('./classes/burst');
const flagChildren      = require('./classes/flagchildren');
const animate           = require('./classes/animate');
const liftDown          = require('./classes/liftdown');
const liftUp            = require('./classes/liftup');
const setEventHandler   = require('./classes/seteventhandler');
const componentDidMount = require('./classes/componentdidmount');

/** Utility Methods */
const UtilityMethods = require('./utils/methods');

/** Class Declaration */
const materialPaperClasses = {};

/** Base JSX Related Classes */
const baseClasses = {
  getDefaultProps: function() {
    return {
      settings: {}
    };
  },
  getInitialState: function(){
    return {
      token         : undefined,
      defaultZDepth : undefined,
      raisedZDepth  : undefined
    }
  },
  render: function(){
    if(!Object.keys(this.props.settings).length && typeof this.state.token !== 'undefined'){
      console.warn('Warning: Paper element initialized without any settings.\n         Unresolved paper token: '+this.state.token);
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

    if(this.props.settings.background){
      backgroundProperties.background = this.props.settings.background;
    }
    if(this.props.settings.overlayColor){
      overlayColor.background = this.props.settings.overlayColor;
    }
    if(this.props.settings.style){
      UtilityMethods.__extend(baseStyles, this.props.settings.style);
    }
    if(this.props.settings.clickable){
      topLevelStyles.cursor = 'pointer';
    }
    if(!!this.props.settings.circular){
      baseStyles.borderRadius = '100%';
      backgroundProperties.borderRadius = '100%';
    }
    if(!!this.props.settings.noBoundaries){
      baseStyles.overflow = 'visible';
    }

    // Set a local variable for zDepth incase undefined
    var _zDepth = 'none';
    typeof this.props.settings.zDepth !== 'undefined' ? _zDepth = this.props.settings.zDepth : 0;

    // Set the zDepth value for paper
    switch(_zDepth){
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
    return(
      <div data-token={this.state.token} style={baseStyles} className={coreClassList}>
        <div data-token={this.state.token} className="panel-mid-bottom-level panel-background" style={backgroundProperties}></div>
        <div data-token={this.state.token} className="panel-mid-upper-level panel-gradient" style={overlayColor}></div>
        <span onMouseDown={this._createBurst} 
           onMouseUp={this._onMouseUp}
           onMouseOver={this._onMouseOver}
           onMouseOut={this._onMouseOut}
           className="panel-link -panel-item" 
           data-token={this.state.token}
           style={Styles.link}>
          <div
            onClick={this._handleOnClick}
            data-token={this.state.token}
            className="panel-top-level -panel-item"
            style={topLevelStyles}>
            {this.props.children}
          </div>
        </span>
      </div>
    );
  }
}

UtilityMethods.__weakExtend(materialPaperClasses, baseClasses);
UtilityMethods.__weakExtend(materialPaperClasses, createBurst);
UtilityMethods.__weakExtend(materialPaperClasses, handleClick);
UtilityMethods.__weakExtend(materialPaperClasses, burst);
UtilityMethods.__weakExtend(materialPaperClasses, flagChildren);
UtilityMethods.__weakExtend(materialPaperClasses, animate);
UtilityMethods.__weakExtend(materialPaperClasses, liftUp);
UtilityMethods.__weakExtend(materialPaperClasses, liftDown);
UtilityMethods.__weakExtend(materialPaperClasses, onMouseUp);
UtilityMethods.__weakExtend(materialPaperClasses, onMouseOut);
UtilityMethods.__weakExtend(materialPaperClasses, onMouseOver);
UtilityMethods.__weakExtend(materialPaperClasses, setEventHandler);
UtilityMethods.__weakExtend(materialPaperClasses, componentDidMount);

const MaterialPaper = React.createClass(materialPaperClasses);

module.exports = MaterialPaper;