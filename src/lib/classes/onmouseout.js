
/** @description
 * Handles any updates to the paper material that involves the mouse moving outside of the element.
 * @param      {void}         void
 * @return     {void}         void
 * @dependency {React.method} _liftDown
 * @dependency {React.prop}   settings
 * @dependency {React.state}  token
 */
const onMouseOut = {
  _onMouseOut: function(){
    // Unzoom background if requested
    if(this.props.settings.zoom){
      var backgroundDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"] .panel-background');
      backgroundDOM.style.transform = 'scale(1)';
    }
    // Lift back down
    this.props.settings.liftOnHover ? this._liftDown() : 0;

    // Lift back down (onClick)
    this.props.settings.liftOnClick ? this._liftDown() : 0;
  }
}

module.exports = onMouseOut;