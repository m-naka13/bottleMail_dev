var gulp = require('gulp');
var pleeease = require('gulp-pleeease');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");

var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var htmlhint = require("gulp-htmlhint");

gulp.task('default', function(callback) {
  runSequence('sass', 'browserSync', 'watch' , callback);
});


//sass
gulp.task('sass', function() {
  return gulp.src([ 'assets/scss/**/**/*.scss', 'assets/scss/**/**/**/*scss', '!assets/scss/**/**/_*.scss', '!assets/scss/**/**/**/_*scss'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(pleeease({
      browsers: ['ios 7', 'Android 4.1'],
      minifier: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css/'))
});




gulp.task('browserSync', function() {
  return browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('reload', browserSync.reload);

gulp.task('watch', function() {
  gulp.watch(['assets/scss/**/*.scss'], ['sass']);
  gulp.watch(['**/*.+(jpg|jpeg|png|gif|svg)'], ['reload']);
  gulp.watch('**/*.html').on('change',function(e){
    gulp.src(e.path)
      .pipe(htmlhint())
      .pipe(htmlhint.reporter()
    )
  });
  gulp.watch('**/*.+(html|css|js)').on('change', browserSync.reload);
});