'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.choices = exports.email = exports.regex = exports.number = exports.maxValue = exports.minValue = exports.maxLength = exports.minLength = exports.required = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
/* @link http://stackoverflow.com/questions/46155/validate-email-address-in-javascript */
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape

var isEmpty = function isEmpty(value) {
    return typeof value === 'undefined' || value === null || value === '';
};

var getMessage = function getMessage(message, messageArgs, value, values, props) {
    return typeof message === 'function' ? message((0, _extends3.default)({
        args: messageArgs,
        value: value,
        values: values
    }, props)) : props.translate(message, (0, _extends3.default)({
        _: message
    }, messageArgs));
};

var required = exports.required = function required() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ra.validation.required';
    return Object.assign(function (value, values, props) {
        return isEmpty(value) ? getMessage(message, undefined, value, values, props) : undefined;
    }, { isRequired: true });
};

var minLength = exports.minLength = function minLength(min) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ra.validation.minLength';
    return function (value, values, props) {
        return !isEmpty(value) && value.length < min ? getMessage(message, { min: min }, value, values, props) : undefined;
    };
};

var maxLength = exports.maxLength = function maxLength(max) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ra.validation.maxLength';
    return function (value, values, props) {
        return !isEmpty(value) && value.length > max ? getMessage(message, { max: max }, value, values, props) : undefined;
    };
};

var minValue = exports.minValue = function minValue(min) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ra.validation.minValue';
    return function (value, values, props) {
        return !isEmpty(value) && value < min ? getMessage(message, { min: min }, value, values, props) : undefined;
    };
};

var maxValue = exports.maxValue = function maxValue(max) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ra.validation.maxValue';
    return function (value, values, props) {
        return !isEmpty(value) && value > max ? getMessage(message, { max: max }, value, values, props) : undefined;
    };
};

var number = exports.number = function number() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ra.validation.number';
    return function (value, values, props) {
        return !isEmpty(value) && isNaN(Number(value)) ? getMessage(message, undefined, value, values, props) : undefined;
    };
};

var regex = exports.regex = function regex(pattern) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ra.validation.regex';
    return function (value, values, props) {
        return !isEmpty(value) && typeof value === 'string' && !pattern.test(value) ? getMessage(message, { pattern: pattern }, value, values, props) : undefined;
    };
};

var email = exports.email = function email() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ra.validation.email';
    return regex(EMAIL_REGEX, message);
};

var oneOfTypeMessage = function oneOfTypeMessage(_ref, value, values, _ref2) {
    var list = _ref.list;
    var translate = _ref2.translate;

    translate('ra.validation.oneOf', {
        options: list.join(', ')
    });
};
var choices = exports.choices = function choices(list) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : oneOfTypeMessage;
    return function (value, values, props) {
        return !isEmpty(value) && list.indexOf(value) === -1 ? getMessage(message, { list: list }, value, values, props) : undefined;
    };
};