'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WithPermissions = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _getContext = require('recompose/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _authActions = require('../actions/authActions');

var _types = require('../auth/types');

var _reducer = require('../reducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmptyChildren = function isEmptyChildren(children) {
    return _react.Children.count(children) === 0;
};
/**
 * After checking that the user is authenticated,
 * retrieves the user's permissions for a specific context.
 *
 * Useful for Route components ; used internally by Resource.
 * Use it to decorate your custom page components to require
 * a custom role. It will pass the permissions as a prop to your
 * component.
 *
 * Pass the `location` from the `routeParams` as `location` prop.
 * You can set additional `authParams` at will if your authProvider
 * requires it.
 *
 * @example
 *     import { WithPermissions } from 'react-admin';
 *
 *     const Foo = ({ permissions }) => (
 *         {permissions === 'admin' ? <p>Sensitive data</p> : null}
 *         <p>Not sensitive data</p>
 *     );
 *
 *     const customRoutes = [
 *         <Route path="/foo" render={routeParams =>
 *             <WithPermissions location={routeParams.location} authParams={{ foo: 'bar' }}>
 *                 <Foo />
 *             </WithPermissions>
 *         } />
 *     ];
 *     const App = () => (
 *         <Admin customRoutes={customRoutes}>
 *             ...
 *         </Admin>
 *     );
 */

var WithPermissions = exports.WithPermissions = function (_Component) {
    (0, _inherits3.default)(WithPermissions, _Component);

    function WithPermissions() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, WithPermissions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WithPermissions.__proto__ || Object.getPrototypeOf(WithPermissions)).call.apply(_ref, [this].concat(args))), _this), _this.state = { permissions: null }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(WithPermissions, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            (0, _warning2.default)(!(this.props.render && this.props.children && !isEmptyChildren(this.props.children)), 'You should not use both <WithPermissions render> and <WithPermissions children>; <WithPermissions children> will be ignored');
            this.checkAuthentication(this.props);
        }
    }, {
        key: 'componentDidMount',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.checkPermissions(this.props);

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function componentDidMount() {
                return _ref2.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.location !== this.props.location || nextProps.authParams !== this.props.authParams || nextProps.isLoggedIn !== this.props.isLoggedIn) {
                this.checkAuthentication(nextProps);
                this.checkPermissions(this.props);
            }
        }
    }, {
        key: 'checkAuthentication',
        value: function checkAuthentication(params) {
            var userCheck = params.userCheck,
                authParams = params.authParams,
                location = params.location;

            userCheck(authParams, location && location.pathname);
        }
    }, {
        key: 'checkPermissions',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(params) {
                var authProvider, authParams, location, match, permissions;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                authProvider = params.authProvider, authParams = params.authParams, location = params.location, match = params.match;
                                _context2.prev = 1;
                                _context2.next = 4;
                                return authProvider(_types.AUTH_GET_PERMISSIONS, (0, _extends3.default)({}, authParams, {
                                    routeParams: match ? match.params : undefined,
                                    location: location ? location.pathname : undefined
                                }));

                            case 4:
                                permissions = _context2.sent;


                                this.setState({ permissions: permissions });
                                _context2.next = 11;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2['catch'](1);

                                this.setState({ permissions: null });

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 8]]);
            }));

            function checkPermissions(_x) {
                return _ref3.apply(this, arguments);
            }

            return checkPermissions;
        }()

        // render even though the AUTH_GET_PERMISSIONS
        // isn't finished (optimistic rendering)

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                authProvider = _props.authProvider,
                userCheck = _props.userCheck,
                isLoggedIn = _props.isLoggedIn,
                render = _props.render,
                children = _props.children,
                staticContext = _props.staticContext,
                props = (0, _objectWithoutProperties3.default)(_props, ['authProvider', 'userCheck', 'isLoggedIn', 'render', 'children', 'staticContext']);
            var permissions = this.state.permissions;


            if (render) {
                return render((0, _extends3.default)({ permissions: permissions }, props));
            }

            if (children) {
                return children((0, _extends3.default)({ permissions: permissions }, props));
            }
        }
    }]);
    return WithPermissions;
}(_react.Component);

WithPermissions.propTypes = {
    authProvider: _propTypes2.default.func,
    authParams: _propTypes2.default.object,
    children: _propTypes2.default.func,
    location: _propTypes2.default.object,
    match: _propTypes2.default.object,
    render: _propTypes2.default.func,
    isLoggedIn: _propTypes2.default.bool,
    staticContext: _propTypes2.default.object,
    userCheck: _propTypes2.default.func
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        isLoggedIn: (0, _reducer.isLoggedIn)(state)
    };
};

exports.default = (0, _compose2.default)((0, _getContext2.default)({
    authProvider: _propTypes2.default.func
}), (0, _reactRedux.connect)(mapStateToProps, { userCheck: _authActions.userCheck }))(WithPermissions);