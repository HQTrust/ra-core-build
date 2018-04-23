'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = _callee;

var _effects = require('redux-saga/effects');

var _uiActions = require('../actions/uiActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(handleRefresh),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(_callee);

/**
 * Redirection Side Effects
 */
function handleRefresh() {
    return _regenerator2.default.wrap(function handleRefresh$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return (0, _effects.put)((0, _uiActions.refreshView)());

                case 2:
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
                        return action.meta && action.meta.refresh;
                    }, handleRefresh);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}
module.exports = exports['default'];