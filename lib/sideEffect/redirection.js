'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.handleRedirection = handleRedirection;
exports.default = _callee;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _reduxForm = require('redux-form');

var _resolveRedirectTo = require('../util/resolveRedirectTo');

var _resolveRedirectTo2 = _interopRequireDefault(_resolveRedirectTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(handleRedirection),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(_callee);

/**
 * Redirection Side Effects
 */
function handleRedirection(_ref) {
    var payload = _ref.payload,
        _ref$meta = _ref.meta,
        basePath = _ref$meta.basePath,
        redirectTo = _ref$meta.redirectTo;
    return _regenerator2.default.wrap(function handleRedirection$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!redirectTo) {
                        _context.next = 6;
                        break;
                    }

                    _context.next = 3;
                    return (0, _effects.put)((0, _reactRouterRedux.push)((0, _resolveRedirectTo2.default)(redirectTo, basePath, payload.id || payload.data.id)));

                case 3:
                    _context.t0 = _context.sent;
                    _context.next = 9;
                    break;

                case 6:
                    _context.next = 8;
                    return (0, _effects.put)((0, _reduxForm.reset)('record-form'));

                case 8:
                    _context.t0 = _context.sent;

                case 9:
                    return _context.abrupt('return', _context.t0);

                case 10:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return (0, _effects.takeEvery)(function (action) {
                        return action.meta && typeof action.meta.redirectTo !== 'undefined';
                    }, handleRedirection);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}