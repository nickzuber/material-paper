
/** @description
 * If any custom click event was constructed into the instance of paper, we want
 * to execute the function it was given.
 * @param      {void}
 * @return     {void}
 */
const handleClick = {
  _handleOnClick: function () {
    if (this.props.onClick) {
      this.props.onClick(this);
    }
  }
};

module.exports = handleClick;