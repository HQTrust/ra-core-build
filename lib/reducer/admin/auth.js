'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isLoggedIn = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = { isLoggedIn: false };

exports.default = function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _actions.USER_LOGIN_SUCCESS:
            return (0, _extends3.default)({}, previousState, { isLoggedIn: true });
        case _actions.USER_LOGOUT:
            return (0, _extends3.default)({}, previousState, { isLoggedIn: false });
    }

    return previousState;
};

var isLoggedIn = exports.isLoggedIn = function isLoggedIn(state) {
    return state.isLoggedIn;
};