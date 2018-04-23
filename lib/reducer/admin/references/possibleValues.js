'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPossibleReferences = exports.getPossibleReferenceValues = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _dataActions = require('../../../actions/dataActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {};

exports.default = function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload,
        meta = _ref.meta;

    switch (type) {
        case _dataActions.CRUD_GET_MATCHING_SUCCESS:
            return (0, _extends5.default)({}, previousState, (0, _defineProperty3.default)({}, meta.relatedTo, payload.data.map(function (record) {
                return record.id;
            })));
        case _dataActions.CRUD_GET_MATCHING_FAILURE:
            return (0, _extends5.default)({}, previousState, (0, _defineProperty3.default)({}, meta.relatedTo, { error: payload.error }));
        default:
            return previousState;
    }
};

var getPossibleReferenceValues = exports.getPossibleReferenceValues = function getPossibleReferenceValues(state, props) {
    return state[props.referenceSource(props.resource, props.source)];
};

var getPossibleReferences = exports.getPossibleReferences = function getPossibleReferences(referenceState, possibleValues) {
    var selectedIds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (!possibleValues) {
        return null;
    }

    if (possibleValues.error) {
        return possibleValues;
    }
    possibleValues = Array.from(possibleValues);
    selectedIds.forEach(function (id) {
        return possibleValues.some(function (value) {
            return value == id;
        }) || possibleValues.unshift(id);
    });
    return possibleValues.map(function (id) {
        return referenceState.data[id];
    }).filter(function (r) {
        return typeof r !== 'undefined';
    });
};