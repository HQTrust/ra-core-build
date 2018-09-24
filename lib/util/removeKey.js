'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeKey = function removeKey(target, path) {
    if (!target) {
        return target;
    }

    return Object.keys(target).reduce(function (acc, key) {
        if (!key.startsWith(path)) {
            return Object.assign({}, acc, (0, _defineProperty3.default)({}, key, target[key]));
        }

        return acc;
    }, {});
};

var deepRemoveKey = function deepRemoveKey(target, path) {
    var paths = path.split('.');

    if (paths.length === 1) {
        return removeKey(target, path);
    }

    var deepKey = paths[0];
    var deep = deepRemoveKey(target[deepKey], paths.slice(1).join('.'));

    if (!deep) {
        return target;
    }

    if (Object.keys(deep).length === 0) {
        return removeKey(target, deepKey);
    }

    return Object.assign({}, target, (0, _defineProperty3.default)({}, deepKey, deep));
};

exports.default = deepRemoveKey;
module.exports = exports['default'];