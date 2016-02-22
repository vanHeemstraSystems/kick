/*
 * Common
 */
var global = self;
//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'js/lib',
    urlArgs: 'bust=' +  (new Date()).getTime(), // Forces to receive non-cached resources
    paths: {
        app: '../app',
        lodash: 'lodash',
        expect: 'expect',
        mocha: 'mocha',
        jquery: 'jquery',
        jquerypp: 'jquerypp.custom',
        framewarp: 'framewarp'
    },
    // A shim automatically adds a wrapper around a javascript library 
    // that makes it AMD-compatible, requirejs-friendly.
    shim: {
        backbone: {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        lodash: {
            exports: 'lodash'
        },
        expect: {
            exports: 'expect'
        },
        mocha: {
            exports: 'mocha'
        }
    }
});
