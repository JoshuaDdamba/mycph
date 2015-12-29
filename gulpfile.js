'use strict';

var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var gls        = require('gulp-live-server');
var gulp       = require('gulp');
var gutil      = require('gulp-util')
var source     = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');

var b          = browserify();

gulp.task('client:js', function () {
  
  var b = browserify({
    entries: './src/client/index.js',
    debug: true
  });

  return b
      .bundle()
      .pipe(source('mycph.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify({mangle:false}))
        .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/js'))
});

gulp.task('client:html', function () {
  gulp.src(['./src/client/index.html'])
  .pipe(gulp.dest('./build'));
});

gulp.task('client', ['client:html', 'client:js']);

gulp.task('server', function () {
  var server = gls.new('./src/server/express.js');

  server.start();
})

gulp.task('default', []);
