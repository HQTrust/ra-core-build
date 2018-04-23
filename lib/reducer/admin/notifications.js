'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNotification = undefined;

var _notificationActions = require('../../actions/notificationActions');

var _undoActions = require('../../actions/undoActions');

exports.default = function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case _notificationActions.SHOW_NOTIFICATION:
            return previousState.concat(payload);
        case _notificationActions.HIDE_NOTIFICATION:
        case _undoActions.UNDO:
            return previousState.slice(1);
        default:
            return previousState;
    }
};

/**
 * Returns the first available notification to show
 * @param {Object} state - Redux state 
 */


var getNotification = exports.getNotification = function getNotification(state) {
    return state.admin.notifications[0];
};