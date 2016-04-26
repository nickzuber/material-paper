
/** @description
 * Handles the process of the burst element "bursting" out and disappearing.
 * @param      {number}       optional timing parameter to decide the speed the element bursts
 * @return     {void}         void
 * @dependency {React.state}  token
 */
const burst = {
    _burst: function (timing) {
        var burstDOM = document.querySelector('.panel-burst[data-burst-token="' + this.state.token + '"]');
        if (!burstDOM) {
            return 0;
        }

        // Get base node
        var baseDOM = document.querySelector('.panel-base[data-token="' + this.state.token + '"]');
        var largerDimension = baseDOM.offsetHeight > baseDOM.offsetWidth ? baseDOM.offsetHeight : baseDOM.offsetWidth;
        var baseDimensions = (baseDOM.offsetHeight + baseDOM.offsetWidth) / 2;
        var burstDimensions = (burstDOM.offsetHeight + burstDOM.offsetWidth) / 2;
        var burstDistance = largerDimension / burstDimensions;
        burstDistance *= 1.5;

        var timing = timing || 1250;

        // Burst animation
        burstDOM.style.transition = 'all ' + timing + 'ms cubic-bezier(0.23, 1, 0.32, 1) 0s';
        burstDOM.style.transform = 'scale(' + Math.ceil(burstDistance) + ')';
        burstDOM.style.opacity = '0';

        // Remove burst element when finished animating
        setTimeout(function () {
            burstDOM.remove();
        }, timing);
    }
};

module.exports = burst;