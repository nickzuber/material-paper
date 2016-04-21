
/** @description
 * Handles the behavior for the event of a mouse coming back up on the paper from
 * a mousedown state.
 * @param      {void}         void
 * @return     {void}         void
 * @dependency {React.method} _burst
 * @dependency {React.method} _liftDown
 * @dependency {React.prop}   settings
 */
const onMouseUp = {
  _onMouseUp: function(){
    if(!this.props.settings.clickable) return;

    // Lift back down
    this.props.settings.liftOnClick ? this._liftDown() : 0;

    // Burst
    this._burst(this.props.settings.burstSpeed);
  }
}

module.exports = onMouseUp;