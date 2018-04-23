'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _listActions = require('../../../../actions/listActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = [];

exports.default = function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _listActions.SET_LIST_SELECTED_IDS:
            return action.payload;
        case _listActions.TOGGLE_LIST_ITEM:
            {
                var index = previousState.indexOf(action.payload);
                if (index > -1) {
                    return [].concat((0, _toConsumableArray3.default)(previousState.slice(0, index)), (0, _toConsumableArray3.default)(previousState.slice(index + 1)));
                } else {
                    return [].concat((0, _toConsumableArray3.default)(previousState), [action.payload]);
                }
            }
        default:
            return action.meta && action.meta.unselectAll ? initialState : previousState;
    }
};

module.exports = exports['default'];