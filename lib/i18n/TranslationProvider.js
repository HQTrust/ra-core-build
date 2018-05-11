'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nodePolyglot = require('node-polyglot');

var _nodePolyglot2 = _interopRequireDefault(_nodePolyglot);

var _reactRedux = require('react-redux');

var _recompose = require('recompose');

var _raLanguageEnglish = require('ra-language-english');

var _raLanguageEnglish2 = _interopRequireDefault(_raLanguageEnglish);

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a translation context, available to its children
 * 
 * Must be called withing a Redux app.
 * 
 * @example
 *     const MyApp = () => (
 *         <Provider store={store}>
 *             <TranslationProvider locale="fr" messages={messages}>
 *                 <!-- Child components go here -->
 *             </TranslationProvider>
 *         </Provider>
 *     );
 */
var TranslationProvider = function TranslationProvider(_ref) {
    var children = _ref.children;
    return _react.Children.only(children);
};

TranslationProvider.propTypes = {
    locale: _propTypes2.default.string.isRequired,
    messages: _propTypes2.default.object,
    children: _propTypes2.default.element
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        locale: state.i18n.locale,
        messages: state.i18n.messages
    };
};

var withI18nContext = (0, _recompose.withContext)({
    translate: _propTypes2.default.func.isRequired,
    locale: _propTypes2.default.string.isRequired
}, function (_ref2) {
    var locale = _ref2.locale,
        _ref2$messages = _ref2.messages,
        messages = _ref2$messages === undefined ? {} : _ref2$messages;

    var polyglot = new _nodePolyglot2.default({
        locale: locale,
        phrases: (0, _defaultsDeep2.default)({}, messages, _raLanguageEnglish2.default)
    });
    var t = polyglot.t.bind(polyglot);
    var translate = function translate(key) {
        var interpolationOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var translatables = interpolationOptions.translatables,
            rest = (0, _objectWithoutProperties3.default)(interpolationOptions, ['translatables']);

        var options = rest;
        if (translatables !== undefined) {
            Object.keys(translatables).forEach(function (translatableKey) {
                options[translatableKey] = t(translatables[translatableKey], rest);
            });
        }
        return t(key, options);
    };

    return {
        locale: locale,
        translate: translate
    };
});

exports.default = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps), withI18nContext)(TranslationProvider);
module.exports = exports['default'];