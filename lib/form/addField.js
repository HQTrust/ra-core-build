'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (BaseComponent) {
    var WithFormField = function WithFormField(props) {
        return _react2.default.createElement(_FormField2.default, (0, _extends3.default)({ component: BaseComponent }, props));
    };
    return WithFormField;
};

module.exports = exports['default'];