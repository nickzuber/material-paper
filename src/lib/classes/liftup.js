
const UtilStyles = require('../styles/utils.stl');

/** @description
 * Raises the paper element back up if invoked.
 * @param      {void}         void
 * @return     {void}         void
 * @dependency {React.state}  token
 * @dependency {React.state}  defaultZDepth
 */
const liftUp = {
  _liftUp: function(){
    var baseDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"]');
    baseDOM.style.boxShadow = UtilStyles.zDepth[this.state.raisedZDepth].boxShadow;
  }
}

module.exports = liftUp;