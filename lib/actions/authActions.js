'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userLogout = exports.USER_LOGOUT = exports.userCheck = exports.USER_CHECK = exports.userLogin = exports.USER_LOGIN_SUCCESS = exports.USER_LOGIN_FAILURE = exports.USER_LOGIN_LOADING = exports.USER_LOGIN = exports.USER_CHECK_SUCCESS = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USER_CHECK_SUCCESS = exports.USER_CHECK_SUCCESS = 'RA/USER_CHECK_SUCCESS';
var USER_LOGIN = exports.USER_LOGIN = 'RA/USER_LOGIN';
var USER_LOGIN_LOADING = exports.USER_LOGIN_LOADING = 'RA/USER_LOGIN_LOADING';
var USER_LOGIN_FAILURE = exports.USER_LOGIN_FAILURE = 'RA/USER_LOGIN_FAILURE';
var USER_LOGIN_SUCCESS = exports.USER_LOGIN_SUCCESS = 'RA/USER_LOGIN_SUCCESS';

var userLogin = exports.userLogin = function userLogin(payload, pathName) {
    return {
        type: USER_LOGIN,
        payload: payload,
        meta: { auth: true, pathName: pathName }
    };
};

var USER_CHECK = exports.USER_CHECK = 'RA/USER_CHECK';

var userCheck = exports.userCheck = function userCheck(payload, pathName, routeParams) {
    return {
        type: USER_CHECK,
        payload: (0, _extends3.default)({}, payload, {
            routeParams: routeParams
        }),
        meta: { auth: true, pathName: pathName }
    };
};

var USER_LOGOUT = exports.USER_LOGOUT = 'RA/USER_LOGOUT';

/**
 * Action to trigger logout of the current user. The entire redux state will be cleared
 * thanks to the resettableAppReducer in Admin.
 * @see: Admin.js
 * @param redirectTo Path to direct to after logout
 * @return {{type: string, payload: {redirectTo: string}, meta: {auth: boolean}}}
 */
var userLogout = exports.userLogout = function userLogout(redirectTo) {
    return {
        type: USER_LOGOUT,
        payload: {
            redirectTo: redirectTo
        },
        meta: { auth: true }
    };
};