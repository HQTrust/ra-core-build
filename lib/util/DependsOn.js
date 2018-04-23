'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapStateToProps = exports.DependsOnView = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

var _FormField = require('../form/FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _getValue = require('./getValue');

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REDUX_FORM_NAME = 'record-form';

var DependsOnView = function DependsOnView(_ref) {
    var children = _ref.children,
        show = _ref.show,
        source = _ref.source,
        value = _ref.value,
        resolve = _ref.resolve,
        props = (0, _objectWithoutProperties3.default)(_ref, ['children', 'show', 'source', 'value', 'resolve']);

    if (!show) {
        return null;
    }

    if (Array.isArray(children)) {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.Children.map(children, function (child) {
                return _react2.default.createElement(
                    'div',
                    {
                        key: child.props.source,
                        style: child.props.style,
                        className: 'ra-input-' + child.props.source
                    },
                    _react2.default.createElement(_FormField2.default, (0, _extends3.default)({ input: child }, props))
                );
            })
        );
    }

    return _react2.default.createElement(
        'div',
        {
            key: children.props.source,
            style: children.props.style,
            className: 'ra-input-' + children.props.source
        },
        _react2.default.createElement(_FormField2.default, (0, _extends3.default)({ input: children }, props))
    );
};

exports.DependsOnView = DependsOnView;
DependsOnView.propTypes = {
    children: _propTypes2.default.node.isRequired,
    show: _propTypes2.default.bool.isRequired,
    source: _propTypes2.default.any,
    value: _propTypes2.default.any,
    resolve: _propTypes2.default.func,
    formName: _propTypes2.default.string
};

var mapStateToProps = exports.mapStateToProps = function mapStateToProps(state, _ref2) {
    var source = _ref2.source,
        _ref2$formName = _ref2.formName,
        formName = _ref2$formName === undefined ? REDUX_FORM_NAME : _ref2$formName,
        record = _ref2.record,
        resolve = _ref2.resolve,
        value = _ref2.value;

    var formValues = (0, _reduxForm.getFormValues)(formName)(state);
    var data = formValues || record;

    if (resolve && (source === null || typeof source === 'undefined')) {
        return {
            dependsOnValue: data,
            show: resolve(data, source, value)
        };
    }

    var dependsOnValue = void 0;
    // get the current form values from redux-form
    if (Array.isArray(source)) {
        dependsOnValue = source.reduce(function (acc, dependsOnKey) {
            return (0, _set2.default)(acc, dependsOnKey, (0, _get2.default)(data, dependsOnKey));
        }, {});
    } else {
        dependsOnValue = (0, _get2.default)(data, source);
    }

    if (resolve) {
        return {
            dependsOnValue: dependsOnValue,
            show: resolve(dependsOnValue, source)
        };
    }

    if (Array.isArray(source) && Array.isArray(value)) {
        return {
            dependsOnValue: dependsOnValue,
            show: source.reduce(function (acc, s, index) {
                return acc && (0, _get2.default)(dependsOnValue, s) === value[index];
            }, true)
        };
    }

    if (typeof value === 'undefined') {
        if (Array.isArray(source)) {
            return {
                dependsOnValue: dependsOnValue,
                show: source.reduce(function (acc, s) {
                    return acc && !!(0, _getValue2.default)(dependsOnValue, s);
                }, true)
            };
        }

        return { dependsOnValue: dependsOnValue, show: !!dependsOnValue };
    }

    return { dependsOnValue: dependsOnValue, show: dependsOnValue === value };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(DependsOnView);