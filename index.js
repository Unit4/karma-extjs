'use strict';
var Q = require('q');
var path = require('path');
var http = require('http');
var ecstatic = require('ecstatic');
var Server = require('karma').Server;
var merge = require('merge');
var jsb3 = require('jsb3');

module.exports = {
    run: function (options){
        var me = this;

        return jsb3(options.jsb3).then(function (source){
            return me.startKarma(me.setOptions(options, source));
        });
    },

    setOptions: function (options, source){
        options = options || {};
        options.karma = options.karma || [];
        
        // Default options
        options.coverage = options.coverage || false;
        options.staticPort = options.staticPort || 9877;
        options.beforeSource = options.beforeSource || [];
        options.afterSource = options.afterSource || [];

        // Karma options
        options.karma.port = options.karma.port || 9876;        
        options.karma.singleRun = options.karma.singleRun !== false;
        options.karma.reporters = options.karma.reporters || ['progress'];
        options.karma.browsers = options.karma.browsers || ['Chrome'];
        options.karma.frameworks = options.karma.frameworks || ['jasmine'];
        options.karma.preprocessors = options.karma.preprocessors || {};
        options.karma.proxies = { '/base' : 'http://localhost:' + options.staticPort };
        options.karma.client = { args: options.filter ? ['--grep=' + options.filter] : [] };

        options.karma.files = options.beforeSource.concat(source)
            .concat(options.afterSource)
            .concat(options.tests);

        if (options.coverage && source){
            options.karma.reporters.push('coverage');
            options.karma.preprocessors = merge(options.karma.preprocessors, this.preprocessCoverage(source));
        }

        return options;
    },

    startKarma: function (options){
        var deferred = Q.defer();
        
        var staticServer = this.serveStatic(options.staticPort);

        var karma = new Server(options.karma, function(exitCode) {
            console.log('Karma has exited with ' + exitCode);
            deferred.resolve(exitCode);

            // Close the static server after karma exists
            staticServer.close()
        });

        karma.start();

        return deferred.promise;
    },

    preprocessCoverage: function (files){
        var cover = {}
        files.forEach(function(file){
            cover[file] = 'coverage';
        });

        return cover;
    }, 

    serveStatic: function (port) {
        var location = './';

        var server = http.createServer(
            ecstatic({ root: location })
        ).listen(port, function () {
            console.log('Serving '+ path.resolve(location) +' on port ' + port);
        }).on('close', function () {
            console.log('Server closing '+ path.resolve(location) +' on port ' + port);
        });

        return server
    }
};
