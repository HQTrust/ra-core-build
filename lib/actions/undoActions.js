'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var UNDOABLE = exports.UNDOABLE = 'RA/UNDOABLE';
var UNDO = exports.UNDO = 'RA/UNDO';
var COMPLETE = exports.COMPLETE = 'RA/COMPLETE';
var START_OPTIMISTIC_MODE = exports.START_OPTIMISTIC_MODE = 'RA/START_OPTIMISTIC_MODE';
var STOP_OPTIMISTIC_MODE = exports.STOP_OPTIMISTIC_MODE = 'RA/STOP_OPTIMISTIC_MODE';

var startUndoable = exports.startUndoable = function startUndoable(action) {
    return {
        type: UNDOABLE,
        payload: { action: action }
    };
};

var undo = exports.undo = function undo() {
    return {
        type: UNDO
    };
};
var complete = exports.complete = function complete() {
    return {
        type: COMPLETE
    };
};

var startOptimisticMode = exports.startOptimisticMode = function startOptimisticMode() {
    return {
        type: START_OPTIMISTIC_MODE
    };
};

var stopOptimisticMode = exports.stopOptimisticMode = function stopOptimisticMode() {
    return {
        type: STOP_OPTIMISTIC_MODE
    };
};