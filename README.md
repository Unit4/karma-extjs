# [karma](http://karma-runner.github.io/)-extjs 

Use Karma to run tests for Ext JS applications. Run tests and measure coverage without any html-file facilitation.

[![Build Status][travis-image]][travis-url] 
[![NPM Version][npm-image]][npm-url] 
[![Dependency Status][dependencies-image]][dependencies-url]

## Install

```bash
$ npm install --save-dev karma-extjs
```


## Usage

```js
var karma = require('karma-extjs');

karma.run({
    coverage: true,
    staticPort: 9877,
    jsb3: 'APP/build/packages.jsb3',
    beforeSource: [
        'extjs/ext-all.js',         
        'appconfig.js'
    ],
    afterSource: [
        'testapp.js'
    ],
    tests: [
        'APP/specs/**/*.spec.js'
    ]        
});
```

The appconfig.js is typically a file that sets the Ext JS config. Something like:

```js
Ext.Loader.setConfig({
    enabled: true,    
    paths: {
        'APP': 'http://' + window.location.host + '/base/APP/src',
        'APPTests': 'http://' + window.location.host + '/base/APP/specs'
    },
    disableCaching: true
});
```

The testapp.js is typically a file that starts the Ext JS application. Somethig like:

```js
Ext.Loader.loadScript({
    url: '/base/APP/src/init.js',
    onLoad: function () {
        Ext.application({
            inhibitLaunch: true
        });
    }
});
```

## API

### run(options)

#### options

##### jsb3

Type: `string`

Path to the jsb3 file of your application/package. This is used to append source files to Karma config
in the correct order.

##### coverage

Type: `Boolean`  
Default: `false`

Enable coverage. `true` will add 'coverage' preprocessors to source files and add the coverage reporter.

##### staticPort

Type: `Number`  
Default `9877`

Serve the root of the project. Karma will use this server as a proxy when files are layzy loaded.

##### beforeSource

Type: `Array` of `strings`

File(s) to append to Karma files before the source files are appended.

##### afterSource

Type: `Array` of `strings`

File(s) to append to Karma files after the source files are appended.

##### karma

Type: `Object`

Dictionary with [Karma](http://karma-runner.github.io/) config.

Defaults:
- **port**: `9876`
- **singleRun**: `true`
- **reporters**: `progress`
- **browsers**: `Chrome`
- **frameworks**: `jasmine`

Note: **proxies** option is overridden and cannot be configured through the API.

## License

[MIT](http://opensource.org/licenses/MIT) © [Unit4](http://www.unit4.com/)

[travis-image]: https://travis-ci.org/Unit4/karma-extjs.svg?branch=master
[travis-url]: https://travis-ci.org/Unit4/karma-extjs
[npm-image]: http://img.shields.io/npm/v/karma-extjs.svg
[npm-url]: https://www.npmjs.org/package/karma-extjs
[dependencies-image]: https://david-dm.org/unit4/karma-extjs.svg
[dependencies-url]: https://david-dm.org/unit4/karma-extjs
