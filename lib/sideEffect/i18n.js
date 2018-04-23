'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (i18nProvider) {
    var _marked = /*#__PURE__*/_regenerator2.default.mark(loadMessages);

    function loadMessages(action) {
        var locale, messages;
        return _regenerator2.default.wrap(function loadMessages$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        locale = action.payload;
                        _context.prev = 1;
                        _context.next = 4;
                        return (0, _effects.call)(i18nProvider, locale);

                    case 4:
                        messages = _context.sent;
                        _context.next = 7;
                        return (0, _effects.put)((0, _actions.changeLocaleSuccess)(locale, messages));

                    case 7:
                        _context.next = 13;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](1);
                        _context.next = 13;
                        return (0, _effects.put)((0, _actions.changeLocaleFailure)(action.payload.locale, _context.t0));

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked, this, [[1, 9]]);
    }
    return (/*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _effects.all)([(0, _effects.takeLatest)(_actions.CHANGE_LOCALE, loadMessages)]);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee, this);
        })
    );
};

module.exports = exports['default'];