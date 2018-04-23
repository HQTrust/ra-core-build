'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
    sidebarOpen: false,
    optimistic: false,
    viewVersion: 0
};

exports.default = function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case _actions.TOGGLE_SIDEBAR:
            return (0, _extends3.default)({}, previousState, {
                sidebarOpen: !previousState.sidebarOpen
            });
        case _actions.SET_SIDEBAR_VISIBILITY:
            return (0, _extends3.default)({}, previousState, { sidebarOpen: payload });
        case _actions.REFRESH_VIEW:
            return (0, _extends3.default)({}, previousState, {
                viewVersion: previousState.viewVersion + 1
            });
        case _actions.START_OPTIMISTIC_MODE:
            return (0, _extends3.default)({}, previousState, { optimistic: true });
        case _actions.STOP_OPTIMISTIC_MODE:
            return (0, _extends3.default)({}, previousState, { optimistic: false });
        default:
            return previousState;
    }
};

module.exports = exports['default'];