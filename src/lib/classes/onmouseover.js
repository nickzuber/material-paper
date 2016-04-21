
/** @description
 * Handles any updates to the paper element that involves the mouse hovering over the element.
 * @param      {void}         void
 * @return     {void}         void
 * @dependency {React.method} _liftUp
 * @dependency {React.prop}   settings
 * @dependency {React.state}  token
 */
const onMouseOver = {
  _onMouseOver: function(){
    // Zoom background if requested
    if(this.props.settings.zoom){
      var backgroundDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"] .panel-background');
      backgroundDOM.style.transform = 'scale(1.05)';
    }

    // Lift up
    this.props.settings.liftOnHover ? this._liftUp() : 0;
  }
}

module.exports = onMouseOver;