/*global require*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var argv = require('yargs').argv;
var karma = require('karma-extjs');

gulp.task('coverage', function () {
    return karma.run({
        staticPort: 9877,
        coverage: true,
        jsb3: 'APP/build/app.jsb3',
        beforeSource: [
            'extjs/ext-all.js',            
            'APP/testconfig.js'            
        ],
        afterSource: [
            'APP/testapp.js'
        ],
        tests: [
            'APP/specs/**/*.spec.js'
        ],
        karma: {
            browserNoActivityTimeout: 20000,
            coverageReporter: {
                type: 'html',
                dir: argv.o ? argv.o : 'coverage/'
            },
            exclude: [                
            ]
        }
    });
});
