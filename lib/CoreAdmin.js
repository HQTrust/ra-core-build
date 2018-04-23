'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _createHashHistory = require('history/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _reactRouterDom = require('react-router-dom');

var _reactRouterRedux = require('react-router-redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = require('redux-saga/effects');

var _withContext = require('recompose/withContext');

var _withContext2 = _interopRequireDefault(_withContext);

var _authActions = require('./actions/authActions');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _sideEffect = require('./sideEffect');

var _i18n = require('./i18n');

var _CoreAdminRouter = require('./CoreAdminRouter');

var _CoreAdminRouter2 = _interopRequireDefault(_CoreAdminRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CoreAdmin = function CoreAdmin(_ref) {
    var appLayout = _ref.appLayout,
        authProvider = _ref.authProvider,
        children = _ref.children,
        _ref$customReducers = _ref.customReducers,
        customReducers = _ref$customReducers === undefined ? {} : _ref$customReducers,
        _ref$customSagas = _ref.customSagas,
        customSagas = _ref$customSagas === undefined ? [] : _ref$customSagas,
        _ref$customRoutes = _ref.customRoutes,
        customRoutes = _ref$customRoutes === undefined ? [] : _ref$customRoutes,
        dashboard = _ref.dashboard,
        history = _ref.history,
        menu = _ref.menu,
        catchAll = _ref.catchAll,
        dataProvider = _ref.dataProvider,
        _ref$i18nProvider = _ref.i18nProvider,
        i18nProvider = _ref$i18nProvider === undefined ? _i18n.defaultI18nProvider : _ref$i18nProvider,
        theme = _ref.theme,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? 'React Admin' : _ref$title,
        loading = _ref.loading,
        loginPage = _ref.loginPage,
        logoutButton = _ref.logoutButton,
        initialState = _ref.initialState,
        _ref$locale = _ref.locale,
        locale = _ref$locale === undefined ? 'en' : _ref$locale;

    var messages = i18nProvider(locale);
    var appReducer = (0, _reducer2.default)(customReducers, locale, messages);

    var resettableAppReducer = function resettableAppReducer(state, action) {
        return appReducer(action.type !== _authActions.USER_LOGOUT ? state : undefined, action);
    };
    var saga = /*#__PURE__*/_regenerator2.default.mark(function rootSaga() {
        return _regenerator2.default.wrap(function rootSaga$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _effects.all)([(0, _sideEffect.adminSaga)(dataProvider, authProvider, i18nProvider)].concat((0, _toConsumableArray3.default)(customSagas)).map(_effects.fork));

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, rootSaga, this);
    });
    var sagaMiddleware = (0, _reduxSaga2.default)();
    var routerHistory = history || (0, _createHashHistory2.default)();
    var store = (0, _redux.createStore)(resettableAppReducer, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(sagaMiddleware, (0, _reactRouterRedux.routerMiddleware)(routerHistory)), typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : function (f) {
        return f;
    }));
    sagaMiddleware.run(saga);

    var logout = authProvider ? (0, _react.createElement)(logoutButton) : null;

    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _i18n.TranslationProvider,
            null,
            _react2.default.createElement(
                _reactRouterRedux.ConnectedRouter,
                { history: routerHistory },
                _react2.default.createElement(
                    _reactRouterDom.Switch,
                    null,
                    _react2.default.createElement(_reactRouterDom.Route, {
                        exact: true,
                        path: '/login',
                        render: function render(props) {
                            return (0, _react.createElement)(loginPage, (0, _extends3.default)({}, props, {
                                title: title
                            }));
                        }
                    }),
                    _react2.default.createElement(_reactRouterDom.Route, {
                        path: '/',
                        render: function render(props) {
                            return _react2.default.createElement(
                                _CoreAdminRouter2.default,
                                (0, _extends3.default)({
                                    appLayout: appLayout,
                                    catchAll: catchAll,
                                    customRoutes: customRoutes,
                                    dashboard: dashboard,
                                    loading: loading,
                                    loginPage: loginPage,
                                    logout: logout,
                                    menu: menu,
                                    theme: theme,
                                    title: title
                                }, props),
                                children
                            );
                        }
                    })
                )
            )
        )
    );
};

var componentPropType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]);

CoreAdmin.propTypes = {
    appLayout: componentPropType,
    authProvider: _propTypes2.default.func,
    children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
    catchAll: componentPropType,
    customSagas: _propTypes2.default.array,
    customReducers: _propTypes2.default.object,
    customRoutes: _propTypes2.default.array,
    dashboard: componentPropType,
    dataProvider: _propTypes2.default.func.isRequired,
    history: _propTypes2.default.object,
    i18nProvider: _propTypes2.default.func,
    initialState: _propTypes2.default.object,
    loading: componentPropType,
    locale: _propTypes2.default.string,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    menu: componentPropType,
    theme: _propTypes2.default.object,
    title: _propTypes2.default.node
};

exports.default = (0, _withContext2.default)({
    authProvider: _propTypes2.default.func
}, function (_ref2) {
    var authProvider = _ref2.authProvider;
    return { authProvider: authProvider };
})(CoreAdmin);
module.exports = exports['default'];