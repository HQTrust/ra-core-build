'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _WithPermissions = require('./auth/WithPermissions');

var _WithPermissions2 = _interopRequireDefault(_WithPermissions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoutesWithLayout = function RoutesWithLayout(_ref) {
    var catchAll = _ref.catchAll,
        children = _ref.children,
        customRoutes = _ref.customRoutes,
        dashboard = _ref.dashboard,
        title = _ref.title;

    var childrenAsArray = _react2.default.Children.toArray(children);
    var firstChild = childrenAsArray.length > 0 ? childrenAsArray[0] : null;

    return _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        customRoutes && customRoutes.map(function (route, index) {
            return _react2.default.createElement(_reactRouterDom.Route, {
                key: index,
                exact: route.props.exact,
                path: route.props.path,
                component: route.props.component,
                render: route.props.render,
                children: route.props.children // eslint-disable-line react/no-children-prop
            });
        }),
        _react.Children.map(children, function (child) {
            return _react2.default.createElement(_reactRouterDom.Route, {
                key: child.props.name,
                path: '/' + child.props.name,
                render: function render(props) {
                    return (0, _react.cloneElement)(child, (0, _extends3.default)({
                        // The context prop instruct the Resource component to
                        // render itself as a standard component
                        context: 'route'
                    }, props));
                }
            });
        }),
        dashboard ? _react2.default.createElement(_reactRouterDom.Route, {
            exact: true,
            path: '/',
            render: function render(routeProps) {
                return _react2.default.createElement(_WithPermissions2.default, (0, _extends3.default)({
                    authParams: {
                        route: 'dashboard'
                    }
                }, routeProps, {
                    render: function render(props) {
                        return (0, _react.createElement)(dashboard, props);
                    }
                }));
            }
        }) : firstChild ? _react2.default.createElement(_reactRouterDom.Route, {
            exact: true,
            path: '/',
            render: function render() {
                return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' + firstChild.props.name });
            }
        }) : null,
        _react2.default.createElement(_reactRouterDom.Route, {
            render: function render() {
                return (0, _react.createElement)(catchAll, {
                    title: title
                });
            }
        })
    );
};

var componentPropType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]);

RoutesWithLayout.propTypes = {
    catchAll: componentPropType,
    children: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
    customRoutes: _propTypes2.default.array,
    dashboard: componentPropType,
    title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
};

exports.default = RoutesWithLayout;
module.exports = exports['default'];