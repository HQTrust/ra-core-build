'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = _callee;

var _effects = require('redux-saga/effects');

var _dataActions = require('../actions/dataActions');

var _notificationActions = require('../actions/notificationActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(handleResponse),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(_callee);

/**
 * Side effects for fetch responses
 *
 * Mostly corenr case handling
 */
function handleResponse(_ref) {
    var type = _ref.type,
        requestPayload = _ref.requestPayload,
        payload = _ref.payload;
    return _regenerator2.default.wrap(function handleResponse$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.t0 = type;
                    _context.next = _context.t0 === _dataActions.CRUD_GET_ONE_SUCCESS ? 3 : 8;
                    break;

                case 3:
                    if (!(!('id' in payload.data) || payload.data.id != requestPayload.id)) {
                        _context.next = 7;
                        break;
                    }

                    _context.next = 6;
                    return (0, _effects.put)((0, _notificationActions.showNotification)('ra.notification.bad_item', 'warning'));

                case 6:
                    return _context.abrupt('return', _context.sent);

                case 7:
                    return _context.abrupt('break', 11);

                case 8:
                    _context.next = 10;
                    return (0, _effects.all)([]);

                case 10:
                    return _context.abrupt('return', _context.sent);

                case 11:
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
                        return action.meta && action.meta.fetchResponse;
                    }, handleResponse);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}
module.exports = exports['default'];