'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var REGISTER_RESOURCE = exports.REGISTER_RESOURCE = 'RA/REGISTER_RESOURCE';
var UNREGISTER_RESOURCE = exports.UNREGISTER_RESOURCE = 'RA/UNREGISTER_RESOURCE';

var registerResource = exports.registerResource = function registerResource(resource) {
    return {
        type: REGISTER_RESOURCE,
        payload: resource
    };
};

var unregisterResource = exports.unregisterResource = function unregisterResource(resourceName) {
    return {
        type: UNREGISTER_RESOURCE,
        payload: resourceName
    };
};