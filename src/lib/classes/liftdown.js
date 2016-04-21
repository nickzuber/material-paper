
const UtilStyles = require('../styles/utils.stl');

/** @description
 * Lowers the paper element back down if invoked.
 * @param      {void}         void
 * @return     {void}         void
 * @dependency {React.state}  token
 * @dependency {React.state}  defaultZDepth
 */
const liftDown = {
  _liftDown: function(){
    var baseDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"]');
    baseDOM.style.boxShadow = UtilStyles.zDepth[this.state.defaultZDepth].boxShadow;
  }
}

module.exports = liftDown;