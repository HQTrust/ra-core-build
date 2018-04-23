'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveBrowserLocale = undefined;

var _index = require('./index');

/**
 * Resolve the browser locale according to the value of the global window.navigator
 * 
 * Use it to determine the <Admin> locale at runtime.
 * 
 * @example
 *     import React from 'react';
 *     import { Admin, Resource, resolveBrowserLocale } from 'react-admin';
 *     import englishMessages from 'ra-language-english';
 *     import frenchMessages from 'ra-language-french';
 *     const messages = {
 *        fr: frenchMessages,
 *        en: englishMessages,
 *     };
 *     const App = () => (
 *         <Admin locale={resolveBrowserLocale()} messages={messages}>
 *             ...
 *         </Admin>
 *     );
 *
 * @param {String} defaultLocale Defaults to 'en'
 */
var resolveBrowserLocale = exports.resolveBrowserLocale = function resolveBrowserLocale() {
    var defaultLocale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _index.DEFAULT_LOCALE;

    // from http://blog.ksol.fr/user-locale-detection-browser-javascript/
    // Rely on the window.navigator object to determine user locale
    var _window$navigator = window.navigator,
        language = _window$navigator.language,
        browserLanguage = _window$navigator.browserLanguage,
        userLanguage = _window$navigator.userLanguage;

    return (language || browserLanguage || userLanguage || defaultLocale).split('-')[0];
};