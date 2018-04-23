'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _notificationActions = require('../actions/notificationActions');

var _authActions = require('../actions/authActions');

var _fetchActions = require('../actions/fetchActions');

var _auth = require('../auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nextPathnameSelector = function nextPathnameSelector(state) {
    var locationState = state.routing.location.state;
    return locationState && locationState.nextPathname;
};

exports.default = function (authProvider) {
    var _marked = /*#__PURE__*/_regenerator2.default.mark(handleAuth);

    if (!authProvider) return function () {
        return null;
    };
    function handleAuth(action) {
        var type, payload, error, meta, authPayload, redirectTo, errorMessage;
        return _regenerator2.default.wrap(function handleAuth$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        type = action.type, payload = action.payload, error = action.error, meta = action.meta;
                        _context.t0 = type;
                        _context.next = _context.t0 === _authActions.USER_LOGIN ? 4 : _context.t0 === _authActions.USER_CHECK ? 27 : _context.t0 === _authActions.USER_LOGOUT ? 39 : _context.t0 === _fetchActions.FETCH_ERROR ? 44 : 58;
                        break;

                    case 4:
                        _context.prev = 4;
                        _context.next = 7;
                        return (0, _effects.put)({ type: _authActions.USER_LOGIN_LOADING });

                    case 7:
                        _context.next = 9;
                        return (0, _effects.call)(authProvider, _auth.AUTH_LOGIN, payload);

                    case 9:
                        authPayload = _context.sent;
                        _context.next = 12;
                        return (0, _effects.put)({
                            type: _authActions.USER_LOGIN_SUCCESS,
                            payload: authPayload
                        });

                    case 12:
                        _context.next = 14;
                        return meta.pathName || (0, _effects.select)(nextPathnameSelector);

                    case 14:
                        redirectTo = _context.sent;
                        _context.next = 17;
                        return (0, _effects.put)((0, _reactRouterRedux.push)(redirectTo || '/'));

                    case 17:
                        _context.next = 26;
                        break;

                    case 19:
                        _context.prev = 19;
                        _context.t1 = _context['catch'](4);
                        _context.next = 23;
                        return (0, _effects.put)({
                            type: _authActions.USER_LOGIN_FAILURE,
                            error: _context.t1,
                            meta: { auth: true }
                        });

                    case 23:
                        errorMessage = typeof _context.t1 === 'string' ? _context.t1 : typeof _context.t1 === 'undefined' || !_context.t1.message ? 'ra.auth.sign_in_error' : _context.t1.message;
                        _context.next = 26;
                        return (0, _effects.put)((0, _notificationActions.showNotification)(errorMessage, 'warning'));

                    case 26:
                        return _context.abrupt('break', 58);

                    case 27:
                        _context.prev = 27;
                        _context.next = 30;
                        return (0, _effects.call)(authProvider, _auth.AUTH_CHECK, payload);

                    case 30:
                        _context.next = 38;
                        break;

                    case 32:
                        _context.prev = 32;
                        _context.t2 = _context['catch'](27);
                        _context.next = 36;
                        return (0, _effects.call)(authProvider, _auth.AUTH_LOGOUT);

                    case 36:
                        _context.next = 38;
                        return (0, _effects.put)((0, _reactRouterRedux.replace)({
                            pathname: _context.t2 && _context.t2.redirectTo || '/login',
                            state: { nextPathname: meta.pathName }
                        }));

                    case 38:
                        return _context.abrupt('break', 58);

                    case 39:
                        _context.next = 41;
                        return (0, _effects.put)((0, _reactRouterRedux.push)(action.payload && action.payload.redirectTo || '/login'));

                    case 41:
                        _context.next = 43;
                        return (0, _effects.call)(authProvider, _auth.AUTH_LOGOUT);

                    case 43:
                        return _context.abrupt('break', 58);

                    case 44:
                        _context.prev = 44;
                        _context.next = 47;
                        return (0, _effects.call)(authProvider, _auth.AUTH_ERROR, error);

                    case 47:
                        _context.next = 57;
                        break;

                    case 49:
                        _context.prev = 49;
                        _context.t3 = _context['catch'](44);
                        _context.next = 53;
                        return (0, _effects.call)(authProvider, _auth.AUTH_LOGOUT);

                    case 53:
                        _context.next = 55;
                        return (0, _effects.put)((0, _reactRouterRedux.push)('/login'));

                    case 55:
                        _context.next = 57;
                        return (0, _effects.put)((0, _notificationActions.hideNotification)());

                    case 57:
                        return _context.abrupt('break', 58);

                    case 58:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked, this, [[4, 19], [27, 32], [44, 49]]);
    }
    return (/*#__PURE__*/_regenerator2.default.mark(function watchAuthActions() {
            return _regenerator2.default.wrap(function watchAuthActions$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _effects.all)([(0, _effects.takeEvery)(function (action) {
                                return action.meta && action.meta.auth;
                            }, handleAuth), (0, _effects.takeEvery)(_fetchActions.FETCH_ERROR, handleAuth)]);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, watchAuthActions, this);
        })
    );
};

module.exports = exports['default'];