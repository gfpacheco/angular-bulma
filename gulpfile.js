// Prevent bluebird warnings
process.env['BLUEBIRD_WARNINGS'] = 0;

var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');

/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

// tests
var testDirectory = path.join(rootDirectory, './tests');

var sourceFiles = [
  // Make sure module files are handled first
  path.join(sourceDirectory, '/**/module.js'),
  // Then add all JavaScript files
  path.join(sourceDirectory, '/**/*.js')
];

var lintFiles = [
  'gulpfile.js',
  // Karma configuration
  'karma-*.conf.js'
].concat(sourceFiles);

gulp.task('build', function() {
  gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(concat('angular-bulma.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('angular-bulma.min.js'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Process
 */
gulp.task('process-all', function (done) {
  runSequence('jshint', 'test-src', 'build', done);
});

/**
 * Watch task
 */
gulp.task('watch', function () {
  // Watch JavaScript files
  gulp.watch(sourceFiles, ['process-all']);
  // watch test files and re-run unit tests when changed
  gulp.watch(path.join(testDirectory, '/**/*.js'), ['test-src']);
});

/**
 * Validate source JavaScript
 */
gulp.task('jshint', function () {
  return gulp.src(lintFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-all', function () {
  runSequence('process-all', 'test-dist-concatenated', 'test-dist-minified');
});

gulp.task('default', function () {
  runSequence('process-all', 'watch');
});
