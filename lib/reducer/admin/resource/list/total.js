'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dataActions = require('../../../../actions/dataActions');

var _index = require('../index');

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (resource) {
    return function () {
        var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var _ref = arguments[1];
        var type = _ref.type,
            payload = _ref.payload,
            meta = _ref.meta;

        if (!(0, _index.metaMatchesResource)(meta, resource)) {
            return previousState;
        }

        switch (type) {
            case _dataActions.CRUD_GET_ONE_SUCCESS:
                return previousState == 0 ? 1 : previousState;
            case _dataActions.CRUD_GET_LIST_SUCCESS:
                return (0, _isNumber2.default)(payload.total) ? payload.total : previousState;
            case _dataActions.CRUD_GET_MANY_REFERENCE_SUCCESS:
                return (0, _isNumber2.default)(payload.total) ? payload.total : previousState;
            case _dataActions.CRUD_CREATE_SUCCESS:
                return previousState + 1;
            case _dataActions.CRUD_DELETE_SUCCESS:
                return previousState - 1;
            case _dataActions.CRUD_DELETE_OPTIMISTIC:
                return previousState - 1;
            case _dataActions.CRUD_DELETE_MANY_OPTIMISTIC:
                return previousState - payload.ids.length;
            default:
                return previousState;
        }
    };
};

module.exports = exports['default'];