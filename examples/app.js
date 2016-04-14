/*
 *
 *  This is mainly where the routes are initialized
 *  and where other templating software is configured.
 *  Other elements of the server are configured here
 *  as well as any middleware and general app settings.
 *
 */

const express = require('express');
const path = require('path');

const _port = 8080;

const app = express();

// Initialize .jsx Transformer
require('node-jsx').install();

// Collect The Routes
const routes = require('./routes/core-routes.js');

// Configure ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Allow Access To File Directory
app.use(express.static(path.join(__dirname, 'www')))

// Set Up Routes
routes(app);

// Create Server
app.listen(_port, function(){
    console.log('Ready on port ' + _port + '...');
});