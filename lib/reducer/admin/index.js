'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPossibleReferences = exports.isLoggedIn = exports.getReferenceResource = exports.getResources = exports.getPossibleReferenceValues = undefined;

var _references = require('./references');

Object.defineProperty(exports, 'getPossibleReferences', {
    enumerable: true,
    get: function get() {
        return _references.getPossibleReferences;
    }
});

var _redux = require('redux');

var _resource = require('./resource');

var _resource2 = _interopRequireDefault(_resource);

var _loading = require('./loading');

var _loading2 = _interopRequireDefault(_loading);

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _record = require('./record');

var _record2 = _interopRequireDefault(_record);

var _references2 = _interopRequireDefault(_references);

var _saving = require('./saving');

var _saving2 = _interopRequireDefault(_saving);

var _ui = require('./ui');

var _ui2 = _interopRequireDefault(_ui);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
    resources: _resource2.default,
    loading: _loading2.default,
    notifications: _notifications2.default,
    record: _record2.default,
    references: _references2.default,
    saving: _saving2.default,
    ui: _ui2.default,
    auth: _auth2.default
});
var getPossibleReferenceValues = exports.getPossibleReferenceValues = function getPossibleReferenceValues(state, props) {
    return (0, _references.getPossibleReferenceValues)(state.references, props);
};

var getResources = exports.getResources = function getResources(state) {
    return (0, _resource.getResources)(state.resources);
};

var getReferenceResource = exports.getReferenceResource = function getReferenceResource(state, props) {
    return (0, _resource.getReferenceResource)(state.resources, props);
};

var isLoggedIn = exports.isLoggedIn = function isLoggedIn(state) {
    return (0, _auth.isLoggedIn)(state.auth);
};