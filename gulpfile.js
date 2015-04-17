//
// Gulp Configuration
//------------------------------------------------------------------------


//
// Include necessary gulp files
// ------------------------------------------------------------------------

var gulp =
   require('gulp'),
// path = require('path'),
   minifyCSS = require('gulp-minify-css'),
   less = require('gulp-less'),
   concat = require('gulp-concat'),
// uglify = require('gulp-uglify'),
   plumber = require('gulp-plumber'),
   rename = require("gulp-rename");
// sourcemaps = require("gulp-sourcemaps");
// autoprefixer = require("gulp-autoprefixer");
   watch = require('gulp-watch');


var onError = function(event) {
   return gulp.src(event.path)
      .pipe(refresh(lrserver));
};

var themepath = 'wp-content/themes/bwrk_devkit';

//
// Compile SASS files
//------------------------------------------------------------------------

gulp.task('styles', function () {

   gulp.src(themepath+'/src/less/main.less')
      .pipe(plumber())
      .pipe(less())
      .pipe(rename({basename: 'app', extname: '.css'}))
      .pipe(gulp.dest(themepath+'/css/'))
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(themepath+'/css/'))
});



//
// Concatenate & Minify JS
// ------------------------------------------------------------------------

gulp.task('scripts', function() {

   var filelist = [

      // Load own stuff
      'fileadmin/templates/default/src/js/custom/*.js'
   ];

   gulp.src(filelist)
      .pipe(plumber())
      .pipe(concat('main.js'))
      //.pipe(uglify('compress'))
      .pipe(gulp.dest(themepath+'/js/'))
});



//
// Watch files for changes
// ------------------------------------------------------------------------

gulp.task('watch', function() {
   gulp.watch(themepath+'/src/less/**/*.less', ['styles'], onError);
   gulp.watch(themepath+'/src/js/**/*.js', ['scripts'], onError);
});



//
// Define default Tasks
//------------------------------------------------------------------------

gulp.task('default', ['styles', 'scripts', 'watch'])