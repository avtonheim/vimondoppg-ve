var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require("gulp-concat");
var browserify = require('browserify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var colors = require('colors');
var livereload = require('gulp-livereload');

gulp.task('script', function() {
  browserify('./client-src/main.js', {
      debug: true
    })
    .add(require.resolve('babel/polyfill'))
    .transform(babelify)
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(livereload());
});

gulp.task('sass', function() {
  return gulp.src('./client-src/css/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(concatCss("./bundle.css"))
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/styles/'))
    .pipe(livereload());
});

gulp.task('nodemon', function() {
  return nodemon({
    script: './app.js',
    watch: ['app.js', 'routes', 'src']
  });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('client-src/**/*.js', ['script']);
  gulp.watch('client-src/css/**/*.scss', ['sass']);
});

gulp.task('dist', ['script', 'sass']);
gulp.task('default', ['script', 'sass', 'watch', 'nodemon']);
