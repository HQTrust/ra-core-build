'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.handleUndoRace = handleUndoRace;
exports.default = watchUndoable;

var _effects = require('redux-saga/effects');

var _notificationActions = require('../actions/notificationActions');

var _undoActions = require('../actions/undoActions');

var _uiActions = require('../actions/uiActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(handleUndoRace),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(watchUndoable);

function handleUndoRace(undoableAction) {
    var action, _action$meta, onSuccess, metaWithoutSuccessSideEffects, _ref, complete;

    return _regenerator2.default.wrap(function handleUndoRace$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    action = undoableAction.payload.action;
                    _action$meta = action.meta, onSuccess = _action$meta.onSuccess, metaWithoutSuccessSideEffects = (0, _objectWithoutProperties3.default)(_action$meta, ['onSuccess']);
                    _context.next = 4;
                    return (0, _effects.put)((0, _undoActions.startOptimisticMode)());

                case 4:
                    _context.next = 6;
                    return (0, _effects.put)((0, _extends3.default)({}, action, {
                        type: action.type + '_OPTIMISTIC',
                        meta: (0, _extends3.default)({}, metaWithoutSuccessSideEffects, onSuccess, {
                            optimistic: true
                        })
                    }));

                case 6:
                    _context.next = 8;
                    return (0, _effects.race)({
                        undo: (0, _effects.take)(_undoActions.UNDO),
                        complete: (0, _effects.take)(_undoActions.COMPLETE)
                    });

                case 8:
                    _ref = _context.sent;
                    complete = _ref.complete;
                    _context.next = 12;
                    return (0, _effects.put)((0, _undoActions.stopOptimisticMode)());

                case 12:
                    if (!complete) {
                        _context.next = 17;
                        break;
                    }

                    _context.next = 15;
                    return (0, _effects.put)((0, _extends3.default)({}, action, {
                        meta: (0, _extends3.default)({}, metaWithoutSuccessSideEffects, {
                            onSuccess: { refresh: true }
                        })
                    }));

                case 15:
                    _context.next = 21;
                    break;

                case 17:
                    _context.next = 19;
                    return (0, _effects.put)((0, _notificationActions.showNotification)('ra.notification.canceled'));

                case 19:
                    _context.next = 21;
                    return (0, _effects.put)((0, _uiActions.refreshView)());

                case 21:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function watchUndoable() {
    return _regenerator2.default.wrap(function watchUndoable$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return (0, _effects.takeEvery)(_undoActions.UNDOABLE, handleUndoRace);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}