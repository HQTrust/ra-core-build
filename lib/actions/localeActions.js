'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var CHANGE_LOCALE = exports.CHANGE_LOCALE = 'RA/CHANGE_LOCALE';
var CHANGE_LOCALE_SUCCESS = exports.CHANGE_LOCALE_SUCCESS = 'RA/CHANGE_LOCALE_SUCCESS';
var CHANGE_LOCALE_FAILURE = exports.CHANGE_LOCALE_FAILURE = 'RA/CHANGE_LOCALE_FAILURE';

var changeLocale = exports.changeLocale = function changeLocale(locale) {
    return {
        type: CHANGE_LOCALE,
        payload: locale
    };
};

var changeLocaleSuccess = exports.changeLocaleSuccess = function changeLocaleSuccess(locale, messages) {
    return {
        type: CHANGE_LOCALE_SUCCESS,
        payload: {
            locale: locale,
            messages: messages
        }
    };
};

var changeLocaleFailure = exports.changeLocaleFailure = function changeLocaleFailure(locale, error) {
    return {
        type: CHANGE_LOCALE_FAILURE,
        error: error,
        payload: {
            locale: locale
        }
    };
};