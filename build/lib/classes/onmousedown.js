
/** @description
 * Handles the behavior for the event of a mouse clicking down on the paper.
 *
 * @param      {Event}        the inherited event object
 * @return     {void}
 *
 * @dependency {React.method} _animate
 * @dependency {React.prop}   settings
 * @dependency {React.state}  token
 */
const onMouseDown = {
    _onMouseDown: function (e) {
        if (!this.props.settings.clickable) return;
        e.preventDefault();

        // Target base nodes
        var baseDOM = document.querySelector('.panel-base[data-token="' + this.state.token + '"]');
        var oldBurstDOM = document.querySelector('.panel-burst[data-burst-token="' + this.state.token + '"]');

        // If already exists, remove old and make new.
        if (oldBurstDOM) {
            oldBurstDOM.remove();
        }

        // Create burst
        var burstDOM = document.createElement('span');
        burstDOM.className = 'panel-burst';
        burstDOM.setAttribute('data-burst-token', this.state.token);

        // Get dimensions to calculate burst size
        var largerDimension = baseDOM.offsetHeight > baseDOM.offsetWidth ? baseDOM.offsetHeight : baseDOM.offsetWidth;
        var burstSize = largerDimension / 6;
        burstDOM.style.height = burstDOM.style.width = burstSize + 'px';

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
        burstDOM.style.top = e.clientY - baseDOMCoords.y - burstSize / 2 + 'px';
        burstDOM.style.left = e.clientX - baseDOMCoords.x - burstSize / 2 + 'px';

        // Lift up
        this.props.settings.liftOnClick ? this._liftUp() : 0;

        this._animate(false);
    }
};

module.exports = onMouseDown;