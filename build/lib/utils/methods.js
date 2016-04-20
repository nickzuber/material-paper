
/** @description
 * Core utility methods are defined in this file and exported.
 */
const UtilityMethods = {};

/** @private
 * Performs a shallow extend on target object from source object.
 * @param {Object} the object to inherit properties
 * @param {Object} the object to supply properties
 * @return void
 */
UtilityMethods.__extend = function (t, s) {
  for (var p in s) t[p] = s[p];
};

/** @private
 * Performs a weak, shallow extend on target object from source object.
 * Properties already defined in the target object will not be overwritten.
 * @param {Object} the object to inherit properties
 * @param {Object} the object to supply properties
 * @return void
 */
UtilityMethods.__weakExtend = function (t, s) {
  for (var p in s) !t.hasOwnProperty(p) ? t[p] = s[p] : 0;
};

/** @private
 * Returns a hash of a given string
 * @param {string} string to hash
 * @return {string} hashed string
 */
UtilityMethods.hash = function (string) {
  var length = Math.floor(Math.random() * 10) + 10;
  var mask = '.abcdefghijklmnopqrstuvwxyz';
  mask += '.ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  mask += '.0123456789';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
  return result;
};

/** @private
 * Gets the absolute coords of a given DOM element.
 * @param {DOMElement} element to find coords
 * @return {object} object containing x and y coords
 */
UtilityMethods.getPosition = function (element) {
  var xPosition = 0;
  var yPosition = 0;
  while (element) {
    xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
    yPosition += element.offsetTop + element.clientTop;
    element = element.offsetParent;
  }
  // Account for distance scrolled from top of document
  yPosition -= window.scrollY;
  return {
    x: xPosition,
    y: yPosition
  };
};

module.exports = UtilityMethods;