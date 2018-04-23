'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FormField = exports.isRequired = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require('redux-form');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isRequired = exports.isRequired = function isRequired(validate) {
    if (validate && validate.isRequired) return true;
    if (Array.isArray(validate)) {
        return !!validate.find(function (it) {
            return it.isRequired;
        });
    }
    return false;
};

var FormField = exports.FormField = function (_Component) {
    (0, _inherits3.default)(FormField, _Component);

    function FormField() {
        (0, _classCallCheck3.default)(this, FormField);
        return (0, _possibleConstructorReturn3.default)(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).apply(this, arguments));
    }

    (0, _createClass3.default)(FormField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                defaultValue = _props.defaultValue,
                input = _props.input,
                initializeForm = _props.initializeForm,
                source = _props.source;

            if (typeof defaultValue === 'undefined' || input) {
                return;
            }
            initializeForm((0, _defineProperty3.default)({}, source, typeof defaultValue === 'function' ? defaultValue() : defaultValue));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var defaultValue = nextProps.defaultValue,
                input = nextProps.input,
                initializeForm = nextProps.initializeForm,
                source = nextProps.source;

            if (typeof defaultValue === 'undefined' || input) {
                return;
            }

            if (defaultValue !== this.props.defaultValue) {
                initializeForm((0, _defineProperty3.default)({}, source, typeof defaultValue === 'function' ? defaultValue() : defaultValue));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                input = _props2.input,
                validate = _props2.validate,
                component = _props2.component,
                props = (0, _objectWithoutProperties3.default)(_props2, ['input', 'validate', 'component']);

            return input ? // An ancestor is already decorated by Field
            _react2.default.createElement(component, this.props) : _react2.default.createElement(_reduxForm.Field, (0, _extends3.default)({}, props, {
                name: props.source,
                component: component,
                validate: validate,
                isRequired: isRequired(validate)
            }));
        }
    }]);
    return FormField;
}(_react.Component);

FormField.propTypes = {
    component: _propTypes2.default.any.isRequired,
    defaultValue: _propTypes2.default.any,
    initializeForm: _propTypes2.default.func.isRequired,
    input: _propTypes2.default.object,
    source: _propTypes2.default.string,
    validate: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.array])
};
exports.default = (0, _reactRedux.connect)(undefined, { initializeForm: _actions.initializeForm })(FormField);