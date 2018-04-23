'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPossibleReferences = exports.getLocale = exports.isLoggedIn = exports.getReferenceResource = exports.getResources = exports.getPossibleReferenceValues = exports.getNotification = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _notifications = require('./admin/notifications');

Object.defineProperty(exports, 'getNotification', {
    enumerable: true,
    get: function get() {
        return _notifications.getNotification;
    }
});

var _admin = require('./admin');

Object.defineProperty(exports, 'getPossibleReferences', {
    enumerable: true,
    get: function get() {
        return _admin.getPossibleReferences;
    }
});

var _redux = require('redux');

var _reduxForm = require('redux-form');

var _reactRouterRedux = require('react-router-redux');

var _admin2 = _interopRequireDefault(_admin);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (customReducers, locale, messages) {
    return (0, _redux.combineReducers)((0, _extends3.default)({
        admin: _admin2.default,
        i18n: (0, _i18n2.default)(locale, messages),
        form: _reduxForm.reducer,
        routing: _reactRouterRedux.routerReducer
    }, customReducers));
};

var getPossibleReferenceValues = exports.getPossibleReferenceValues = function getPossibleReferenceValues(state, props) {
    return (0, _admin.getPossibleReferenceValues)(state.admin, props);
};
var getResources = exports.getResources = function getResources(state) {
    return (0, _admin.getResources)(state.admin);
};
var getReferenceResource = exports.getReferenceResource = function getReferenceResource(state, props) {
    return (0, _admin.getReferenceResource)(state.admin, props);
};
var isLoggedIn = exports.isLoggedIn = function isLoggedIn(state) {
    return (0, _admin.isLoggedIn)(state.admin);
};
var getLocale = exports.getLocale = function getLocale(state) {
    return (0, _i18n.getLocale)(state.i18n);
};