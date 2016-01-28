'use strict';
var assert = require('assert');
var kextjs = require('./index');

it('should add coverage to preprocessor dictionary', function(cb) {
    var prep = kextjs.preprocessCoverage(['file1', 'file2']);

    assert.strictEqual('coverage', prep.file1);
    assert.strictEqual('coverage', prep.file2);

    cb();
});

it('should default module options', function(cb) {
    var options = kextjs.setOptions();
    assert(options.beforeSource);
    assert(options.beforeSource.length === 0)
    assert(options.afterSource);
    assert(options.afterSource.length === 0);
    assert(options.coverage == false);
    assert.strictEqual(9877, options.staticPort);

    cb();
});

it('should default karma options', function(cb) {
    var options = kextjs.setOptions();
    assert.strictEqual(9876, options.karma.port, 'Expects default port');
    assert(options.karma.singleRun);
    assert('progress', options.karma.reporters.pop());
    assert('Chrome', options.karma.browsers.pop());
    assert('jasmine', options.karma.frameworks.pop());
    assert(options.karma.preprocessors);

    cb();
});

it('should not override module options', function(cb) {
    var options = kextjs.setOptions({
        beforeSource: ['before.js'],
        afterSource: ['after.js'],
        coverage: true,
        staticPort: 1111
    });

    assert(options.beforeSource);
    assert.strictEqual('before.js', options.beforeSource[0])
    assert(options.afterSource);
    assert.strictEqual('after.js', options.afterSource[0]);
    assert(options.coverage);
    assert.strictEqual(1111, options.staticPort);

    cb();
});

it('should not override karma options', function(cb) {
    var options = kextjs.setOptions({
        karma: {
            port: 1111,
            singleRun: false,
            reporters: ['otherreporter'],
            browsers: ['otherbrowser'],
            frameworks: ['otherframework'],
            preprocessors: {
                myfile: 'process'
            }
        }
    });

    assert.strictEqual(1111, options.karma.port, 'Expects default port');
    assert(!options.karma.singleRun, 'Expect single run false');
    assert('otherreporter', options.karma.reporters.pop(), 'Expects reporter set');
    assert('otherbrowser', options.karma.browsers.pop(), 'Expects browser set');
    assert('otherframework', options.karma.frameworks.pop(), 'Expects framework set');
    assert.strictEqual('process', options.karma.preprocessors.myfile, 'Expects preprocessor set');

    cb();
});

it('should add coverage preprocessors', function(cb) {
    var options = kextjs.setOptions({
        coverage: true,
        karma: {
            reporters: ['junit']
        }
    }, ['file1', 'file2']);

    assert.strictEqual('coverage', options.karma.reporters.pop(), 'Expects coverage reporter');
    assert.strictEqual('coverage', options.karma.preprocessors.file1, 'Expects file 1 preprocessors set');
    assert.strictEqual('coverage', options.karma.preprocessors.file2, 'Expects file 2 preprocessors set');

    cb();
});

it('should concat before files, source files, after files and spec files', function(cb) {
    var options = kextjs.setOptions({
        beforeSource: ['before.js'],
        afterSource: ['after.js'],
        tests: ['fixture1.js', 'fixture2.js']
    }, ['src1.js', 'src2.js']);

    assert.strictEqual('fixture2.js', options.karma.files.pop());
    assert.strictEqual('fixture1.js', options.karma.files.pop());
    assert.strictEqual('after.js', options.karma.files.pop());
    assert.strictEqual('src2.js', options.karma.files.pop());
    assert.strictEqual('src1.js', options.karma.files.pop());
    assert.strictEqual('before.js', options.karma.files.pop());

    cb();
});

it('should filter source files by given expression in filterSources config', function(cb) {
    var options = kextjs.setOptions({
        beforeSource: ['before.js'],
        afterSource: ['after.js'],
        tests: ['fixture1.js', 'fixture2.js'],
        filterSource: 'U4/src/some'
    }, ['U4/src/some/src1.js', 'U4/src/other/src2.js']);

    assert.strictEqual('fixture2.js', options.karma.files.pop());
    assert.strictEqual('fixture1.js', options.karma.files.pop());
    assert.strictEqual('after.js', options.karma.files.pop());
    assert.strictEqual('U4/src/some/src1.js', options.karma.files.pop());
    assert.strictEqual('before.js', options.karma.files.pop());

    cb();
});

it('should filter source files by given list of expressions in filterSources config', function(cb) {
    var options = kextjs.setOptions({
        beforeSource: ['before.js'],
        afterSource: ['after.js'],
        tests: ['fixture1.js', 'fixture2.js'],
        filterSource: ['U4/src/some/one', 'U4/src/some/two']
    }, ['U4/src/some/one/src1.js', 'U4/src/some/two/src2.js', 'U4/src/some/three/src3.js']);

    assert.strictEqual('fixture2.js', options.karma.files.pop());
    assert.strictEqual('fixture1.js', options.karma.files.pop());
    assert.strictEqual('after.js', options.karma.files.pop());
    assert.strictEqual('U4/src/some/two/src2.js', options.karma.files.pop());
    assert.strictEqual('U4/src/some/one/src1.js', options.karma.files.pop());
    assert.strictEqual('before.js', options.karma.files.pop());

    cb();
});

it('should filter source files to cover by given expression in filterCoverage config', function(cb) {
    var options = kextjs.setOptions({
        beforeSource: ['before.js'],
        afterSource: ['after.js'],
        tests: ['fixture1.js', 'fixture2.js'],
        filterCoverage: 'U4/src/some',
        coverage: true
    }, ['U4/src/some/src1.js', 'U4/src/other/src2.js']);

    assert.strictEqual(1, Object.keys(options.karma.preprocessors).length);
    assert.strictEqual('coverage', options.karma.preprocessors['U4/src/some/src1.js']);

    cb();
});

it('should filter source files to cover by given list of expressions in filterCoverage config', function(cb) {
    var options = kextjs.setOptions({
        beforeSource: ['before.js'],
        afterSource: ['after.js'],
        tests: ['fixture1.js', 'fixture2.js'],
        filterCoverage: ['U4/src/some/one', 'U4/src/some/two'],
        coverage: true
    }, ['U4/src/some/one/src1.js', 'U4/src/some/two/src2.js', 'U4/src/some/three/src3.js']);

    assert.strictEqual(2, Object.keys(options.karma.preprocessors).length);
    assert.strictEqual('coverage', options.karma.preprocessors['U4/src/some/one/src1.js']);
    assert.strictEqual('coverage', options.karma.preprocessors['U4/src/some/two/src2.js']);

    cb();
});