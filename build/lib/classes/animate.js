
/** @description
 * This process handles the expansion of the burst element into view.
 * @param      {boolean}      optional manual flag
 * @return     {void}         void
 * @dependency {React.prop}   settings
 * @dependency {React.state}  token
 */
const animate = {
  _animate: function (manual) {
    var burstDOM = document.querySelector('.panel-burst[data-burst-token="' + this.state.token + '"]');
    if (!burstDOM) {
      return 0;
    }
    // Static time variable (don't really see a need to ever change this, but keeping as variable just in case)
    var timing = 1000;

    // Burst down animation
    burstDOM.style.transition = 'all ' + timing + 'ms cubic-bezier(0.23, 1, 0.32, 1) 0s';
    burstDOM.style.transform = 'scale(1.5)';

    // If manual burst element, we want to burst it right away
    // and not wait for a mouseup event to trigger burst.
    manual ? this._burst(this.props.settings.burstSpeed) : 0;
  }
};

module.exports = animate;