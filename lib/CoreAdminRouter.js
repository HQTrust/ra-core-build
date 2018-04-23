'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CoreAdminRouter = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _getContext = require('recompose/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _types = require('./auth/types');

var _reducer = require('./reducer');

var _authActions = require('./actions/authActions');

var _RoutesWithLayout = require('./RoutesWithLayout');

var _RoutesWithLayout2 = _interopRequireDefault(_RoutesWithLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var welcomeStyles = {
    width: '50%',
    margin: '40vh',
    textAlign: 'center'
};

var CoreAdminRouter = exports.CoreAdminRouter = function (_Component) {
    (0, _inherits3.default)(CoreAdminRouter, _Component);

    function CoreAdminRouter() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CoreAdminRouter);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CoreAdminRouter.__proto__ || Object.getPrototypeOf(CoreAdminRouter)).call.apply(_ref, [this].concat(args))), _this), _this.state = { children: [] }, _this.initializeResources = function (nextProps) {
            if (typeof nextProps.children === 'function') {
                _this.initializeResourcesAsync(nextProps);
            }
        }, _this.initializeResourcesAsync = function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
                var authProvider, permissions, children, childrenFuncResult;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                authProvider = props.authProvider;
                                _context.prev = 1;
                                _context.next = 4;
                                return authProvider(_types.AUTH_GET_PERMISSIONS);

                            case 4:
                                permissions = _context.sent;
                                children = props.children;
                                childrenFuncResult = children(permissions);

                                if (childrenFuncResult.then) {
                                    childrenFuncResult.then(function (resolvedChildren) {
                                        _this.setState({
                                            children: resolvedChildren.filter(function (child) {
                                                return child;
                                            }).map(function (child) {
                                                return (0, _extends3.default)({}, child, {
                                                    props: (0, _extends3.default)({}, child.props, {
                                                        key: child.props.name
                                                    })
                                                });
                                            })
                                        });
                                    });
                                } else {
                                    _this.setState({
                                        children: childrenFuncResult.filter(function (child) {
                                            return child;
                                        })
                                    });
                                }
                                _context.next = 13;
                                break;

                            case 10:
                                _context.prev = 10;
                                _context.t0 = _context['catch'](1);

                                _this.props.userLogout();

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[1, 10]]);
            }));

            return function (_x) {
                return _ref2.apply(this, arguments);
            };
        }(), _this.renderCustomRoutesWithoutLayout = function (route, props) {
            if (route.props.render) {
                return route.props.render((0, _extends3.default)({}, props, {
                    title: _this.props.title
                }));
            }
            if (route.props.component) {
                return (0, _react.createElement)(route.props.component, (0, _extends3.default)({}, props, {
                    title: _this.props.title
                }));
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CoreAdminRouter, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.initializeResources(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
                this.setState({
                    children: []
                }, function () {
                    return _this3.initializeResources(nextProps);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props,
                appLayout = _props.appLayout,
                catchAll = _props.catchAll,
                children = _props.children,
                customRoutes = _props.customRoutes,
                dashboard = _props.dashboard,
                loading = _props.loading,
                logout = _props.logout,
                menu = _props.menu,
                theme = _props.theme,
                title = _props.title;


            if (typeof children !== 'function' && !children) {
                return _react2.default.createElement(
                    'div',
                    { style: welcomeStyles },
                    'React-admin is properly configured.',
                    _react2.default.createElement('br', null),
                    'Now you can add a first <Resource> as child of <Admin>.'
                );
            }

            if (typeof children === 'function' && (!this.state.children || this.state.children.length === 0)) {
                return _react2.default.createElement(_reactRouterDom.Route, { path: '/', key: 'loading', component: loading });
            }

            var childrenToRender = typeof children === 'function' ? this.state.children : children;

            return _react2.default.createElement(
                'div',
                null,
                // Render every resources children outside the React Router Switch
                // as we need all of them and not just the one rendered
                _react.Children.map(childrenToRender, function (child) {
                    return (0, _react.cloneElement)(child, {
                        key: child.props.name,
                        // The context prop instructs the Resource component to not render anything
                        // but simply to register itself as a known resource
                        context: 'registration'
                    });
                }),
                _react2.default.createElement(
                    _reactRouterDom.Switch,
                    null,
                    customRoutes.filter(function (route) {
                        return route.props.noLayout;
                    }).map(function (route, index) {
                        return _react2.default.createElement(_reactRouterDom.Route, {
                            key: index,
                            exact: route.props.exact,
                            path: route.props.path,
                            render: function render(props) {
                                return _this4.renderCustomRoutesWithoutLayout(route, props);
                            }
                        });
                    }),
                    _react2.default.createElement(_reactRouterDom.Route, {
                        path: '/',
                        render: function render() {
                            return (0, _react.createElement)(appLayout, {
                                children: _react2.default.createElement(_RoutesWithLayout2.default, {
                                    catchAll: catchAll,
                                    children: childrenToRender // eslint-disable-line react/no-children-prop
                                    , customRoutes: customRoutes.filter(function (route) {
                                        return !route.props.noLayout;
                                    }),
                                    dashboard: dashboard,
                                    title: title
                                }),
                                dashboard: dashboard,
                                logout: logout,
                                menu: menu,
                                theme: theme,
                                title: title
                            });
                        }
                    })
                )
            );
        }
    }]);
    return CoreAdminRouter;
}(_react.Component);

var componentPropType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]);

CoreAdminRouter.propTypes = {
    appLayout: componentPropType,
    authProvider: _propTypes2.default.func,
    catchAll: componentPropType,
    children: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
    customRoutes: _propTypes2.default.array,
    dashboard: componentPropType,
    isLoggedIn: _propTypes2.default.bool,
    loading: componentPropType,
    logout: _propTypes2.default.node,
    menu: componentPropType,
    theme: _propTypes2.default.object,
    title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    userLogout: _propTypes2.default.func
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        isLoggedIn: (0, _reducer.isLoggedIn)(state)
    };
};

exports.default = (0, _compose2.default)((0, _getContext2.default)({
    authProvider: _propTypes2.default.func
}), (0, _reactRedux.connect)(mapStateToProps, { userLogout: _authActions.userLogout }))(CoreAdminRouter);