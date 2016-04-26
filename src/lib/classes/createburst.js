
const UtilityMethods = require('../utils/methods');

/** @description
 * Handles the process of creating the burst element. This does NOT expand the burst into view.
 * Accounts for both cases where a burst is internally invoked and externally invoked.
 * @param      {Event}        the event that captures data regarding mouse location etc.
 * @param      {number}       optional x coordinate offset for where burst is created relative to container
 * @param      {number}       optional y coordinate offset for where burst is created relative to container
 * @return     {void}         void
 * @dependency {React.method} _animate
 * @dependency {React.method} _liftUp
 * @dependency {React.prop}   settings
 * @dependency {React.state}  token
 */
const createBurst = {
  
  /** Manual burst creation usually invoked by some external process */
  createBurst: function(offsetX, offsetY){
    // Target base nodes
    var baseDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"]');
    var oldBurstDOM = document.querySelector('.panel-burst[data-burst-token="'+this.state.token+'"]');

    // If already exists, remove old and make new.
    if(oldBurstDOM){
      oldBurstDOM.remove();
    }

    // Create burst
    var burstDOM = document.createElement('span');
    burstDOM.className = 'panel-burst';
    burstDOM.setAttribute('data-burst-token', this.state.token);

    // Get dimensions to calculate burst size
    var largerDimension = (baseDOM.offsetHeight > baseDOM.offsetWidth) ? baseDOM.offsetHeight : baseDOM.offsetWidth;
    var burstSize = Math.floor(largerDimension / 6);

    burstDOM.style.height = burstDOM.style.width = (Math.ceil(burstSize)+'px');

    // TODO: Static burst class styles
    burstDOM.style.background = 'rgba(0,0,0,.09)';
    burstDOM.style.borderRadius = '100%';
    burstDOM.style.position = 'absolute';
    burstDOM.style.zIndex = '1500';
    burstDOM.style.transform = 'scale(0)';

    this.props.settings.burstColor ? burstDOM.style.background = this.props.settings.burstColor : 0;

    // Attach to paper
    baseDOM.appendChild(burstDOM);

    // Set location
    var baseDOMCoords = UtilityMethods.getPosition(baseDOM);
    burstDOM.style.top = (offsetY - baseDOMCoords.y - (burstSize/2))+'px';
    burstDOM.style.left = (offsetX - baseDOMCoords.x - (burstSize/2))+'px';

    this._animate(true);
  },

  /** Internal burst creation based off mouse location */
  _createBurst: function(e){
    if(!this.props.settings.clickable) return;
    e.preventDefault();

    // Target base nodes
    var baseDOM = document.querySelector('.panel-base[data-token="'+this.state.token+'"]');
    var oldBurstDOM = document.querySelector('.panel-burst[data-burst-token="'+this.state.token+'"]');

    // If already exists, remove old and make new.
    if(oldBurstDOM){
      oldBurstDOM.remove();
    }

    // Create burst
    var burstDOM = document.createElement('span');
    burstDOM.className = 'panel-burst';
    burstDOM.setAttribute('data-burst-token', this.state.token);
    burstDOM.setAttribute('data-native', "true");

    // Get dimensions to calculate burst size
    var largerDimension = (baseDOM.offsetHeight > baseDOM.offsetWidth) ? baseDOM.offsetHeight : baseDOM.offsetWidth;
    var burstSize = Math.floor(largerDimension / 6);
    burstDOM.style.height = burstDOM.style.width = (Math.ceil(burstSize)+'px');

    // TODO: Static burst class styles
    burstDOM.style.background = 'rgba(0,0,0,.09)';
    burstDOM.style.borderRadius = '100%';
    burstDOM.style.position = 'absolute';
    burstDOM.style.zIndex = '1500';
    burstDOM.style.transform = 'scale(0)';
    burstDOM.style.WebkitBackfaceVisibility = 'hidden';

    this.props.settings.burstColor ? burstDOM.style.background = this.props.settings.burstColor : 0;

    // Attach to paper
    baseDOM.appendChild(burstDOM);

    // Set location
    var baseDOMCoords = UtilityMethods.getPosition(baseDOM);
    burstDOM.style.top = (e.clientY - baseDOMCoords.y - (burstSize/2))+'px';
    burstDOM.style.left = (e.clientX - baseDOMCoords.x - (burstSize/2))+'px';

    // Lift up
    this.props.settings.liftOnClick ? this._liftUp() : 0;

    this._animate(false);
  }
}


module.exports = createBurst;