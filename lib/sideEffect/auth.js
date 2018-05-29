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
        var type, payload, error, meta, authPayload, redirectTo;
        return _regenerator2.default.wrap(function handleAuth$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        type = action.type, payload = action.payload, error = action.error, meta = action.meta;
                        _context.t0 = type;
                        _context.next = _context.t0 === _authActions.USER_LOGIN ? 4 : _context.t0 === _authActions.USER_CHECK ? 26 : _context.t0 === _authActions.USER_LOGOUT ? 38 : _context.t0 === _fetchActions.FETCH_ERROR ? 43 : 57;
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
                        _context.next = 25;
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
                        _context.next = 25;
                        return (0, _effects.put)((0, _notificationActions.showNotification)('ra.auth.sign_in_error', 'warning'));

                    case 25:
                        return _context.abrupt('break', 57);

                    case 26:
                        _context.prev = 26;
                        _context.next = 29;
                        return (0, _effects.call)(authProvider, _auth.AUTH_CHECK, payload);

                    case 29:
                        _context.next = 37;
                        break;

                    case 31:
                        _context.prev = 31;
                        _context.t2 = _context['catch'](26);
                        _context.next = 35;
                        return (0, _effects.call)(authProvider, _auth.AUTH_LOGOUT);

                    case 35:
                        _context.next = 37;
                        return (0, _effects.put)((0, _reactRouterRedux.replace)({
                            pathname: _context.t2 && _context.t2.redirectTo || '/login',
                            state: { nextPathname: meta.pathName }
                        }));

                    case 37:
                        return _context.abrupt('break', 57);

                    case 38:
                        _context.next = 40;
                        return (0, _effects.put)((0, _reactRouterRedux.push)(action.payload && action.payload.redirectTo || '/login'));

                    case 40:
                        _context.next = 42;
                        return (0, _effects.call)(authProvider, _auth.AUTH_LOGOUT);

                    case 42:
                        return _context.abrupt('break', 57);

                    case 43:
                        _context.prev = 43;
                        _context.next = 46;
                        return (0, _effects.call)(authProvider, _auth.AUTH_ERROR, error);

                    case 46:
                        _context.next = 56;
                        break;

                    case 48:
                        _context.prev = 48;
                        _context.t3 = _context['catch'](43);
                        _context.next = 52;
                        return (0, _effects.call)(authProvider, _auth.AUTH_LOGOUT);

                    case 52:
                        _context.next = 54;
                        return (0, _effects.put)((0, _reactRouterRedux.push)('/login'));

                    case 54:
                        _context.next = 56;
                        return (0, _effects.put)((0, _notificationActions.hideNotification)());

                    case 56:
                        return _context.abrupt('break', 57);

                    case 57:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked, this, [[4, 19], [26, 31], [43, 48]]);
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