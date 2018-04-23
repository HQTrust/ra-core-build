'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Resource = undefined;

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

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _WithPermissions = require('./auth/WithPermissions');

var _WithPermissions2 = _interopRequireDefault(_WithPermissions);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentPropType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]);

var Resource = exports.Resource = function (_Component) {
    (0, _inherits3.default)(Resource, _Component);

    function Resource() {
        (0, _classCallCheck3.default)(this, Resource);
        return (0, _possibleConstructorReturn3.default)(this, (Resource.__proto__ || Object.getPrototypeOf(Resource)).apply(this, arguments));
    }

    (0, _createClass3.default)(Resource, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                context = _props.context,
                name = _props.name,
                list = _props.list,
                create = _props.create,
                edit = _props.edit,
                show = _props.show,
                options = _props.options,
                icon = _props.icon,
                registerResource = _props.registerResource;


            if (context === 'registration') {
                var resource = {
                    name: name,
                    options: options,
                    hasList: !!list,
                    hasEdit: !!edit,
                    hasShow: !!show,
                    hasCreate: !!create,
                    icon: icon
                };

                registerResource(resource);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _props2 = this.props,
                context = _props2.context,
                name = _props2.name,
                unregisterResource = _props2.unregisterResource;

            if (context === 'registration') {
                unregisterResource(name);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                match = _props3.match,
                context = _props3.context,
                name = _props3.name,
                list = _props3.list,
                create = _props3.create,
                edit = _props3.edit,
                show = _props3.show,
                options = _props3.options;


            if (context === 'registration') {
                return null;
            }

            var resource = {
                resource: name,
                options: options,
                hasList: !!list,
                hasEdit: !!edit,
                hasShow: !!show,
                hasCreate: !!create
            };

            return _react2.default.createElement(
                _reactRouterDom.Switch,
                null,
                create && _react2.default.createElement(_reactRouterDom.Route, {
                    exact: true,
                    path: match.url + '/create',
                    render: function render(routeProps) {
                        return _react2.default.createElement(_WithPermissions2.default, (0, _extends3.default)({
                            render: function render(props) {
                                return (0, _react.createElement)(create, props);
                            }
                        }, routeProps, resource));
                    }
                }),
                show && _react2.default.createElement(_reactRouterDom.Route, {
                    exact: true,
                    path: match.url + '/:id/show',
                    render: function render(routeProps) {
                        return _react2.default.createElement(_WithPermissions2.default, (0, _extends3.default)({
                            render: function render(props) {
                                return (0, _react.createElement)(show, props);
                            }
                        }, routeProps, resource));
                    }
                }),
                edit && _react2.default.createElement(_reactRouterDom.Route, {
                    exact: true,
                    path: match.url + '/:id',
                    render: function render(routeProps) {
                        return _react2.default.createElement(_WithPermissions2.default, (0, _extends3.default)({
                            render: function render(props) {
                                return (0, _react.createElement)(edit, props);
                            }
                        }, routeProps, resource));
                    }
                }),
                list && _react2.default.createElement(_reactRouterDom.Route, {
                    exact: true,
                    path: '' + match.url,
                    render: function render(routeProps) {
                        return _react2.default.createElement(_WithPermissions2.default, (0, _extends3.default)({
                            render: function render(props) {
                                return (0, _react.createElement)(list, props);
                            }
                        }, routeProps, resource));
                    }
                })
            );
        }
    }]);
    return Resource;
}(_react.Component);

Resource.propTypes = {
    context: _propTypes2.default.oneOf(['route', 'registration']).isRequired,
    match: _propTypes2.default.shape({
        isExact: _propTypes2.default.bool,
        params: _propTypes2.default.object,
        path: _propTypes2.default.string,
        url: _propTypes2.default.string
    }),
    name: _propTypes2.default.string.isRequired,
    list: componentPropType,
    create: componentPropType,
    edit: componentPropType,
    show: componentPropType,
    icon: componentPropType,
    options: _propTypes2.default.object,
    registerResource: _propTypes2.default.func.isRequired,
    unregisterResource: _propTypes2.default.func.isRequired
};

Resource.defaultProps = {
    context: 'route',
    options: {}
};

exports.default = (0, _reactRedux.connect)(null, { registerResource: _actions.registerResource, unregisterResource: _actions.unregisterResource })(Resource);