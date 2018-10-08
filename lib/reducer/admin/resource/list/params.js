'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _listActions = require('../../../../actions/listActions');

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
    sort: null,
    order: null,
    page: 1,
    perPage: null,
    filter: {}
};

exports.default = function (resource) {
    return function () {
        var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
        var _ref = arguments[1];
        var type = _ref.type,
            payload = _ref.payload,
            meta = _ref.meta;

        if (!(0, _index.metaMatchesResource)(meta, resource)) {
            return previousState;
        }
        switch (type) {
            case _listActions.CRUD_CHANGE_LIST_PARAMS:
                var pathname = meta.location.pathname || 'default';
                var filter = (0, _extends4.default)({}, previousState.filter, (0, _defineProperty3.default)({}, meta.location.pathname, payload.filter));
                return (0, _extends4.default)({}, payload, {
                    filter: filter
                });
            default:
                return previousState;
        }
    };
};

module.exports = exports['default'];