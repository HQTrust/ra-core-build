'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dataActions = require('../../../../actions/dataActions');

exports.default = function (resource) {
    return function () {
        var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var _ref = arguments[1];
        var type = _ref.type,
            payload = _ref.payload,
            meta = _ref.meta;

        if (!meta || meta.resource !== resource) {
            return previousState;
        }
        if (type === _dataActions.CRUD_GET_ONE_SUCCESS) {
            return previousState == 0 ? 1 : previousState;
        }
        if (type === _dataActions.CRUD_GET_LIST_SUCCESS) {
            return payload.total;
        }
        if (type === _dataActions.CRUD_DELETE_OPTIMISTIC) {
            return previousState - 1;
        }
        if (type === _dataActions.CRUD_DELETE_MANY_OPTIMISTIC) {
            return previousState - payload.ids.length;
        }
        return previousState;
    };
};

module.exports = exports['default'];