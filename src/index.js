/**
 * Native definition file for Node and true entry point of library.
 * All React components are bound to the materialPaper object and served.
 */

'use strict';

const Paper = require('./lib/paper.js');

const materialPaper = {};

materialPaper.Paper = Paper;

exports = module.exports = materialPaper;