'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hideNotification = exports.HIDE_NOTIFICATION = exports.showNotification = exports.SHOW_NOTIFICATION = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHOW_NOTIFICATION = exports.SHOW_NOTIFICATION = 'RA/SHOW_NOTIFICATION';

/**
 * @typedef {Object} notificationOptions
 * @param {number} [notificationOptions.autoHideDuration=4000] - The type of the notification
 * @param {Object} [notificationOptions.messageArgs] - Arguments used to translate the message 
 */

/**
 * Shows a snackbar/toast notification on the screen 
 * @param {string} message - A translatable label or text to display on notification
 * @param {string} [type=info] - The type of the notification
 * @param {notificationOptions} [notificationOptions] - Specify additional parameters of notification
 * @see {@link https://material-ui-next.com/api/snackbar/|Material ui snackbar component}
 * @see {@link https://material.io/guidelines/components/snackbars-toasts.html|Material ui reference document on snackbar}
 * 
 */
var showNotification = exports.showNotification = function showNotification(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
    var notificationOptions = arguments[2];
    return {
        type: SHOW_NOTIFICATION,
        payload: (0, _extends3.default)({}, notificationOptions, {
            type: type,
            message: message
        })
    };
};

var HIDE_NOTIFICATION = exports.HIDE_NOTIFICATION = 'RA/HIDE_NOTIFICATION';

var hideNotification = exports.hideNotification = function hideNotification() {
    return {
        type: HIDE_NOTIFICATION
    };
};