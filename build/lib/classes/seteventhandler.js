
/** @description
 * Sets the event handler for the window object if a paper element in initialized and has the ability to react to
 * be clicked. The purpose of this event handler is for the window to know if and when a burst element needs to be
 * despawned from the screen in the event of it being created but not properly bursted.
 * @param      {void}         void
 * @return     {void}         void
 * @dependency {React.prop}   settings
 */
const setEventHandler = {
  _setEventHandler: function () {
    if (!this.props.settings.clickable) return;

    if (typeof window !== 'undefined' && document.body.getAttribute('data-mp-listener-set') === null) {
      // To avoid setting more than one event listener for material paper, we add a flag
      // to the body element to let us know that the event listner has been set
      document.body.setAttribute('data-mp-listener-set', true);

      window.addEventListener('mouseup', function (e) {
        // Note: if a element is unresolvable and we cannot get a token or id, we
        //       want to set the variable to null to ensure that they are still
        //       technically equal to each other, to make sure the if condition
        //       later down the road will resolve to false.

        // Active burst element
        var existingBurstDOM = document.querySelector('.panel-burst[data-native]');
        if (existingBurstDOM) {
          var existingBurstID = existingBurstDOM.getAttribute('data-burst-token');
          //console.log('burstID: '+existingBurstID);
        } else {
            var existingBurstID = null;
            //console.log('burstID: '+existingBurstID+' (does not exist)');
          }

        // Target element
        var targetElementDOM = e.target;
        if (e.target.className.indexOf('-panel-item') > -1) {
          var targetElementToken = targetElementDOM.getAttribute('data-token');
          //console.log('paperID: '+targetElementToken);
        } else {
            var targetElementToken = null;
            //console.log('paperID: '+targetElementToken+' (not paper element)');
          }

        // If mouseup on any element that isn't the respective paper element,
        // we want to unburst the current burst element (if exists)
        if (existingBurstDOM && existingBurstID !== targetElementToken) {
          existingBurstDOM.style.transition = 'all 250ms ease';
          existingBurstDOM.style.transform = 'scale(0)';
          setTimeout(function () {
            existingBurstDOM.remove();
          }, 250);
        }
      });
    }
  }
};

module.exports = setEventHandler;