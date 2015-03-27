'use strict';

var gulp = require('gulp'),
	eslint = require('gulp-eslint'),
	mocha = require('gulp-mocha'),
	coverage = require('gulp-coverage'),
	del = require('del');

var paths = {
	'all': [
		'./gulpfile.js',
		'./index.js',
		'./lib/**/*.js'
	],
	'src': [
		'./index.js',
		'./lib/**/*.js'
	],
	'tests': [ './test/**/*.test.js' ]
};

gulp.task('clean', function (cb) {
  del([
    '.coverage',
    '.coverdata',
    'coverage',
    '.coverrun',
    'coverage.html'
  ], cb);
});

gulp.task('lint', function () {
	return gulp.src(paths.all)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

// gulp for running the mocha tests with default dot reporter
gulp.task('test', function(){
	gulp
		.src(paths.tests)
		.pipe(mocha({reporter: 'dot'}));
});

// gulp for running the mocha tests with spec reporter
gulp.task('spec', function(){
	gulp
		.src(paths.tests)
		.pipe(coverage.instrument({
			pattern: paths.src,
			debugDirectory: '.coverage'
		}))
		.pipe(mocha({reporter: 'spec'}))
		.pipe(coverage.report({outFile: 'coverage.html'}));
});

gulp.task('default', ['lint', 'spec']);
