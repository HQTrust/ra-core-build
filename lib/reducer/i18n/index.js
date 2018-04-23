'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLocale = undefined;

var _redux = require('redux');

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _loading = require('./loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (initialLocale, defaultMessages) {
    return (0, _redux.combineReducers)({
        locale: (0, _locale2.default)(initialLocale),
        messages: (0, _messages2.default)(defaultMessages),
        loading: _loading2.default
    });
};

var getLocale = exports.getLocale = function getLocale(state) {
    return state.locale;
};