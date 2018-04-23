'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = _callee;

var _effects = require('redux-saga/effects');

var _notificationActions = require('../actions/notificationActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(handleNotification),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(_callee);

/**
 * Notification Side Effects
 */
function handleNotification(_ref) {
    var error = _ref.error,
        _ref$meta = _ref.meta,
        notification = _ref$meta.notification,
        optimistic = _ref$meta.optimistic;

    var body, level, _notification$message, messageArgs;

    return _regenerator2.default.wrap(function handleNotification$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    body = notification.body, level = notification.level, _notification$message = notification.messageArgs, messageArgs = _notification$message === undefined ? {} : _notification$message;

                    if (!error) {
                        _context.next = 5;
                        break;
                    }

                    _context.next = 4;
                    return (0, _effects.put)((0, _notificationActions.showNotification)(typeof error === 'string' ? error : error.message || body, level || 'warning', {
                        messageArgs: messageArgs,
                        undoable: false
                    }));

                case 4:
                    return _context.abrupt('return', _context.sent);

                case 5:
                    _context.next = 7;
                    return (0, _effects.put)((0, _notificationActions.showNotification)(body, level || 'info', {
                        messageArgs: messageArgs,
                        undoable: optimistic
                    }));

                case 7:
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
                        return action.meta && action.meta.notification;
                    }, handleNotification);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}
module.exports = exports['default'];