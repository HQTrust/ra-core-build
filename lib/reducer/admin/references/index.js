'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPossibleReferences = exports.getPossibleReferenceValues = undefined;

var _redux = require('redux');

var _oneToMany = require('./oneToMany');

var _oneToMany2 = _interopRequireDefault(_oneToMany);

var _possibleValues = require('./possibleValues');

var _possibleValues2 = _interopRequireDefault(_possibleValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
    oneToMany: _oneToMany2.default,
    possibleValues: _possibleValues2.default
});
var getPossibleReferenceValues = exports.getPossibleReferenceValues = function getPossibleReferenceValues(state, props) {
    return (0, _possibleValues.getPossibleReferenceValues)(state.possibleValues, props);
};

var getPossibleReferences = exports.getPossibleReferences = _possibleValues.getPossibleReferences;