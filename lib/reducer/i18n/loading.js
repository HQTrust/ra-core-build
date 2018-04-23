'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _localeActions = require('../../actions/localeActions');

exports.default = function () {
    var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {
        case _localeActions.CHANGE_LOCALE:
            return true;
        case _localeActions.CHANGE_LOCALE_SUCCESS:
        case _localeActions.CHANGE_LOCALE_FAILURE:
            return false;
        default:
            return loading;
    }
};

module.exports = exports['default'];