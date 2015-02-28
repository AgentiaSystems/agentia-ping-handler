var gulp = require('gulp'),
	jscs = require('gulp-jscs'),
	mocha = require('gulp-mocha'),
	coverage = require('gulp-coverage');

var paths = {
	'src':['./index.js', './lib/**/*.js'],
	'tests':['./test/**/*.test.js']
};

// lint task
gulp.task('jscs', function(){
	gulp
		.src(paths.src)
		.pipe(jscs());
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

gulp.task('default', ['jscs', 'spec']);