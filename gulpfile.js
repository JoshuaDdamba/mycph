'use strict';

var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var gls        = require('gulp-live-server');
var gulp       = require('gulp');
var gutil      = require('gulp-util')
var source     = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var stylus     = require('gulp-stylus');
var uglify     = require('gulp-uglify');

var packageJson = require('./package.json');
var dependencies = Object.keys(packageJson && packageJson.dependencies || {});

gulp.task('client:vendors', function () {

  var b          = browserify();
  
  return b
      .require(dependencies)
      .bundle()
      .pipe(source('vendors.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
         .pipe(uglify())
         .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/js'));
});

gulp.task('client:js', function () {
  
  var b = browserify({
    entries: './src/client/index.js',
    debug: true
  });

  return b
      .external(dependencies)
      .bundle()
      .pipe(source('mycph.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify({mangle:false}))
        .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/js'))
});

gulp.task('copyLeafletCSS', function () {
  gulp.src(['./node_modules/leaflet/dist/leaflet.css'])
      .pipe(gulp.dest('./build/styles'));
});

gulp.task('client:styles', function () {
  gulp.src(['copyLeafletCSS', './src/client/styles/base.styl'])
      .pipe(stylus())
      .pipe(gulp.dest('./build/styles'));
});

gulp.task('client', ['client:styles', 'client:js']);

gulp.task('server', function () {
  var server = gls.new('./src/server/express.js');

  server.start();
})

gulp.task('default', []);
