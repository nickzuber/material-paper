
/** @description
 * Flags all children nodes of a paper element as children of that paper element. This excludes
 * other paper elements, however.
 * @param      {void}         void
 * @return     {void}         void
 * @dependency {React.state}  token
 */
const flagChildren = {
  _flagChildrenNodes: function () {
    // Assuming that the paper token has been set.
    // Update children elements with -panel-item flag and also assign it the respective token
    var childrenLength = document.querySelector('.panel-top-level[data-token="' + this.state.token + '"]').children.length;
    for (i = 0; i < childrenLength; ++i) {
      // If we encounter another paper element as a child, we want to exit
      // We do *not* want to recurse into another paper element and try to make flag it as a child element
      // Doing so would cause many conflicts
      if (document.querySelector('.panel-top-level[data-token="' + this.state.token + '"]').children[i].classList.contains('panel-base')) break;
      document.querySelector('.panel-top-level[data-token="' + this.state.token + '"]').children[i].classList.add('-panel-item');
      document.querySelector('.panel-top-level[data-token="' + this.state.token + '"]').children[i].setAttribute('data-token', this.state.token);
    }
  }
};

module.exports = flagChildren;