'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Higher-Order Component for getting access to the `translate` function in props.
 * 
 * Requires that the app is decorated by the <TranslationPRovider> to inject
 * the translation dictionaries and function in the context.
 * 
 * @example
 *     import React from 'react';
 *     import { translate } from 'react-admin';
 *     
 *     const MyHelloButton = ({ translate }) => (
 *         <button>{translate('myroot.hello.world')}</button>
 *     );
 *     
 *     export default translate(MyHelloButton);
 * 
 * @param {*} BaseComponent The component to decorate
 */
var translate = function translate(BaseComponent) {
    var TranslatedComponent = function (_Component) {
        (0, _inherits3.default)(TranslatedComponent, _Component);

        function TranslatedComponent() {
            (0, _classCallCheck3.default)(this, TranslatedComponent);
            return (0, _possibleConstructorReturn3.default)(this, (TranslatedComponent.__proto__ || Object.getPrototypeOf(TranslatedComponent)).apply(this, arguments));
        }

        (0, _createClass3.default)(TranslatedComponent, [{
            key: 'render',
            value: function render() {
                var props = (0, _extends3.default)({}, this.context, this.props);
                return _react2.default.createElement(BaseComponent, props);
            }
        }]);
        return TranslatedComponent;
    }(_react.Component);

    var _ref = BaseComponent.defaultProps || {},
        translate = _ref.translate,
        defaultProps = (0, _objectWithoutProperties3.default)(_ref, ['translate']);

    TranslatedComponent.defaultProps = defaultProps;
    TranslatedComponent.contextTypes = {
        translate: _propTypes2.default.func.isRequired,
        locale: _propTypes2.default.string.isRequired
    };
    TranslatedComponent.displayName = 'TranslatedComponent(' + BaseComponent.displayName + ')';

    return TranslatedComponent;
};

exports.default = translate;
module.exports = exports['default'];