'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../../actions/index');

exports.default = function (defaultMessages) {
    return function () {
        var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMessages;
        var _ref = arguments[1];
        var type = _ref.type,
            payload = _ref.payload;

        switch (type) {
            case _index.CHANGE_LOCALE_SUCCESS:
                return payload.messages;
            default:
                return previousState;
        }
    };
};

module.exports = exports['default'];