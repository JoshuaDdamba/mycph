'use strict';

var gls  = require('gulp-live-server');
var gulp = require('gulp');

gulp.task('client', function() {
  gulp.src(['./src/client/index.html', './src/client/index.js'])
  .pipe(gulp.dest('./build'));
})

gulp.task('server', function () {
  var server = gls.new('./src/server/express.js');

  server.start();
})

gulp.task('default', []);
