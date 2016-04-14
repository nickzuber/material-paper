
'use strict';

// JS modules
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Concat and minify js files for examples
gulp.task('examples', function(){
    gulp.src(['./examples/modules/render.js'])
    .pipe(webpack({
        watch: false,
        module: {
            loaders: [
                { test: /\.jsx$/, loader: 'jsx-loader' },
            ],
        },
    }))

    // Minifying increases compile time so when developing
    // don't bother to minify so we can speed up builds
    //.pipe(uglify())

    .pipe(rename({
        basename: 'app',
        extname: '.bundle.js'
    }))
    .pipe(gulp.dest('./examples/www/js/build'));
});

// set default
gulp.task('default', ['examples']);