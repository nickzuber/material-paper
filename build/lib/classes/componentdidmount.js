
const UtilityMethods = require('../utils/methods');

/** @description
 * Invoked when the paper component is initialized; defines the token state and
 * the zDepth state.
 * @param      {void}         void
 * @return     {void}         void
 * @dependency {React.method} _setEventHandler
 * @dependency {React.prop}   settings
 */
const componentDidMount = {
  componentDidMount: function () {
    do {
      var tokenAttempt = UtilityMethods.hash(Math.floor(Date.now() + Math.random() * 21));
    } while (document.querySelector('.panel-base[data-token="' + tokenAttempt + '"]'));
    this.setState({
      token: tokenAttempt
    }, this._flagChildrenNodes);
    var _zDepth = 'none';
    typeof this.props.settings.zDepth !== 'undefined' ? _zDepth = this.props.settings.zDepth : 0;

    switch (_zDepth) {
      case '0':
      case 0:
        this.setState({
          defaultZDepth: 'zero',
          raisedZDepth: 'one'
        });
        break;
      case '1':
      case 1:
        this.setState({
          defaultZDepth: 'one',
          raisedZDepth: 'two'
        });
        break;
      case '2':
      case 2:
        this.setState({
          defaultZDepth: 'two',
          raisedZDepth: 'three'
        });
        break;
      case '3':
      case 3:
        this.setState({
          defaultZDepth: 'three',
          raisedZDepth: 'four'
        });
        break;
      case '4':
      case 4:
        this.setState({
          defaultZDepth: 'four',
          raisedZDepth: 'four'
        });
        break;
      default:
        this.setState({
          defaultZDepth: 'none',
          raisedZDepth: 'zero'
        });
        break;
    }
    this._setEventHandler();
  }
};

module.exports = componentDidMount;