'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListController = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends8 = require('babel-runtime/helpers/extends');

var _extends9 = _interopRequireDefault(_extends8);

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

var _queryString = require('query-string');

var _reactRouterRedux = require('react-router-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _reselect = require('reselect');

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _pickBy = require('lodash/pickBy');

var _pickBy2 = _interopRequireDefault(_pickBy);

var _removeEmpty = require('../util/removeEmpty');

var _removeEmpty2 = _interopRequireDefault(_removeEmpty);

var _queryReducer = require('../reducer/admin/resource/list/queryReducer');

var _queryReducer2 = _interopRequireDefault(_queryReducer);

var _dataActions = require('../actions/dataActions');

var _listActions = require('../actions/listActions');

var _translate = require('../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

var _removeKey = require('../util/removeKey');

var _removeKey2 = _interopRequireDefault(_removeKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * List page component
 *
 * The <List> component renders the list layout (title, buttons, filters, pagination),
 * and fetches the list of records from the REST API.
 * It then delegates the rendering of the list of records to its child component.
 * Usually, it's a <Datagrid>, responsible for displaying a table with one row for each post.
 *
 * In Redux terms, <List> is a connected component, and <Datagrid> is a dumb component.
 *
 * Props:
 *   - title
 *   - perPage
 *   - sort
 *   - filter (the permanent filter to apply to the query)
 *   - actions
 *   - filters (a React Element used to display the filter form)
 *   - pagination
 *
 * @example
 *     const PostFilter = (props) => (
 *         <Filter {...props}>
 *             <TextInput label="Search" source="q" alwaysOn />
 *             <TextInput label="Title" source="title" />
 *         </Filter>
 *     );
 *     export const PostList = (props) => (
 *         <List {...props}
 *             title="List of posts"
 *             sort={{ field: 'published_at' }}
 *             filter={{ is_published: true }}
 *             filters={<PostFilter />}
 *         >
 *             <Datagrid>
 *                 <TextField source="id" />
 *                 <TextField source="title" />
 *                 <EditButton />
 *             </Datagrid>
 *         </List>
 *     );
 */
var ListController = exports.ListController = function (_Component) {
    (0, _inherits3.default)(ListController, _Component);

    function ListController(props) {
        (0, _classCallCheck3.default)(this, ListController);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ListController.__proto__ || Object.getPrototypeOf(ListController)).call(this, props));

        _initialiseProps.call(_this);

        var enabledSources = props.initiallyEnabledSources.reduce(function (sources, src) {
            return (0, _extends9.default)({}, sources, (0, _defineProperty3.default)({}, src, true));
        }, {});

        _this.state = {
            activeFilters: {},
            enabledSources: enabledSources
        };
        return _this;
    }

    (0, _createClass3.default)(ListController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.props.query.page && !(this.props.ids || []).length && this.props.params.page > 1 && this.props.total > 0) {
                this.setPage(this.props.params.page - 1);
                return;
            }

            this.updateData(this.props);
            if (Object.keys(this.props.query).length > 0) {
                this.props.changeListParams(this.props.resource, this.props.query);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.setFilters.cancel();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.resource !== this.props.resource || nextProps.query.sort !== this.props.query.sort || nextProps.query.order !== this.props.query.order || nextProps.query.page !== this.props.query.page || nextProps.query.perPage !== this.props.query.perPage || nextProps.query.filter !== this.props.query.filter) {
                this.updateData(nextProps, Object.keys(nextProps.query).length > 0 ? nextProps.query : nextProps.params);
            }
            if (nextProps.version !== this.props.version) {
                this.updateData(nextProps);
            }
            if (nextProps.filterValues !== this.props.filterValues) {
                // TODO: showing inactive filters when props.filterValues changed
                // is one approach for viewing the filter panel after page reload
                // when there are filters present in the url. This does however
                // break the tabBar by expanding the collapsed filter panel when
                // user clicks a tab. Fixme!
                // requestAnimationFrame(this.showInactiveFilters);
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.translate === this.props.translate && nextProps.isLoading === this.props.isLoading && nextProps.version === this.props.version && nextState === this.state && nextProps.data === this.props.data && nextProps.selectedIds === this.props.selectedIds) {
                return false;
            }
            return true;
        }
    }, {
        key: 'getBasePath',
        value: function getBasePath() {
            return this.props.location.pathname.replace(/\/$/, '');
        }

        /**
         * Merge list params from 3 different sources:
         *   - the query string
         *   - the params stored in the state (from previous navigation)
         *   - the props passed to the List component
         */

    }, {
        key: 'getQuery',
        value: function getQuery() {
            var query = Object.keys(this.props.query).length > 0 ? this.props.query : (0, _extends9.default)({}, this.props.params);
            if (!query.sort) {
                query.sort = this.props.sort.field;
                query.order = this.props.sort.order;
            }
            query.perPage = this.props.perPage;
            if (!query.page) {
                query.page = 1;
            }
            return query;
        }
    }, {
        key: 'updateData',
        value: function updateData(props, query) {
            var params = query || this.getQuery();
            var perPage = props.perPage;
            var sort = params.sort,
                order = params.order,
                _params$page = params.page,
                page = _params$page === undefined ? 1 : _params$page,
                filter = params.filter;

            var pagination = {
                page: parseInt(page, 10),
                perPage: parseInt(perPage, 10)
            };
            var permanentFilter = this.props.filter;
            this.props.crudGetList(this.props.resource, pagination, { field: sort, order: order }, (0, _extends9.default)({}, filter, permanentFilter));
        }
    }, {
        key: 'changeParams',
        value: function changeParams(action) {
            var newParams = (0, _queryReducer2.default)(this.getQuery(), action);
            this.props.push((0, _extends9.default)({}, this.props.location, {
                search: '?' + (0, _queryString.stringify)((0, _extends9.default)({}, newParams, {
                    filter: JSON.stringify(newParams.filter)
                }))
            }));
            this.props.changeListParams(this.props.resource, newParams);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                resource = _props.resource,
                hasCreate = _props.hasCreate,
                data = _props.data,
                ids = _props.ids,
                total = _props.total,
                totalAll = _props.totalAll,
                isLoading = _props.isLoading,
                translate = _props.translate,
                version = _props.version,
                selectedIds = _props.selectedIds,
                metaSources = _props.metaSources;
            var enabledSources = this.state.enabledSources;

            var query = this.getQuery();

            var queryFilterValues = query.filter || {};
            var basePath = this.getBasePath();

            var resourceName = translate('resources.' + resource + '.name', {
                smart_count: 2,
                _: _inflection2.default.humanize(_inflection2.default.pluralize(resource))
            });
            var defaultTitle = translate('ra.page.list', {
                name: '' + resourceName
            });

            return children({
                basePath: basePath,
                currentSort: {
                    field: query.sort,
                    order: query.order
                },
                data: data,
                defaultTitle: defaultTitle,
                displayedFilters: this.state.activeFilters,
                enabledSources: enabledSources,
                filterValues: queryFilterValues,
                hasCreate: hasCreate,
                hideActiveFilters: this.hideActiveFilters,
                showInactiveFilters: this.showInactiveFilters,
                hideFilter: this.hideFilter,
                ids: ids,
                isLoading: isLoading,
                metaSources: metaSources,
                onSelect: this.handleSelect,
                onToggleItem: this.handleToggleItem,
                onUnselectItems: this.handleUnselectItems,
                page: parseInt(query.page || 1, 10),
                perPage: parseInt(query.perPage, 10),
                refresh: this.refresh,
                selectedIds: selectedIds,
                setFilters: this.setFilters,
                setFiltersImmediate: this.setFiltersImmediate,
                setPage: this.setPage,
                setSourceActive: this.setSourceActive,
                setSort: this.setSort,
                showFilter: this.showFilter,
                translate: translate,
                total: total,
                totalAll: totalAll,
                version: version
            });
        }
    }]);
    return ListController;
}(_react.Component); /* eslint no-console: ["error", { allow: ["warn", "error"] }] */


var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.setSort = function (sort) {
        return _this2.changeParams({ type: _queryReducer.SET_SORT, payload: sort });
    };

    this.setPage = function (page) {
        return _this2.changeParams({ type: _queryReducer.SET_PAGE, payload: page });
    };

    this.setFiltersImmediate = function (filters) {
        if ((0, _isEqual2.default)(filters, _this2.props.filterValues)) {
            return;
        }

        // fix for redux-form bug with onChange and enableReinitialize
        var filtersWithoutEmpty = (0, _removeEmpty2.default)(filters);
        _this2.changeParams({ type: _queryReducer.SET_FILTER, payload: filtersWithoutEmpty });
    };

    this.setFilters = (0, _debounce2.default)(this.setFiltersImmediate, this.props.debounce);

    this.showFilter = function (filterName, defaultValue) {
        _this2.setState({
            activeFilters: (0, _extends9.default)({}, _this2.state.activeFilters, (0, _defineProperty3.default)({}, filterName, true))
        });
        if (typeof defaultValue !== 'undefined') {
            _this2.setFilters((0, _extends9.default)({}, _this2.props.filterValues, (0, _defineProperty3.default)({}, filterName, defaultValue)));
        }
    };

    this.hideActiveFilters = function () {
        _this2.setState({ activeFilters: {} });
    };

    this.sanitizedFilterName = function (filterName) {
        var suffix = filterName.slice(-3);
        return suffix === 'Min' || suffix === 'Max' ? filterName.substr(0, filterName.length - 3) : filterName;
    };

    this.showInactiveFilters = function () {
        var activeFilters = (0, _extends9.default)({}, _this2.state.enabledSources);
        var enabledSources = (0, _extends9.default)({}, _this2.state.enabledSources);
        Object.keys(_this2.props.filterValues).forEach(function (filterName) {
            var sanitizedFilterName = _this2.sanitizedFilterName(filterName);
            activeFilters[sanitizedFilterName] = true;
            enabledSources[sanitizedFilterName] = true;
        });

        _this2.setState({ activeFilters: activeFilters, enabledSources: enabledSources });
    };

    this.hideFilter = function (filterName) {
        _this2.setState({
            activeFilters: (0, _extends9.default)({}, _this2.state.activeFilters, (0, _defineProperty3.default)({}, filterName, false))
        });
        var newFilters = (0, _removeKey2.default)(_this2.props.filterValues, filterName);
        _this2.setFilters(newFilters);
    };

    this.handleSelect = function (ids) {
        _this2.props.setSelectedIds(_this2.props.resource, ids);
    };

    this.handleUnselectItems = function () {
        _this2.props.setSelectedIds(_this2.props.resource, []);
    };

    this.handleToggleItem = function (id) {
        _this2.props.toggleItem(_this2.props.resource, id);
    };

    this.setSourceActive = function (source, active) {
        _this2.setState({
            activeFilters: (0, _extends9.default)({}, _this2.state.activeFilters, (0, _defineProperty3.default)({}, source, active)),
            enabledSources: (0, _extends9.default)({}, _this2.state.enabledSources, (0, _defineProperty3.default)({}, source, active))
        });

        if (!active) {
            _this2.setFilters((0, _removeKey2.default)(_this2.props.filterValues, source));
        }
    };
};

ListController.propTypes = {
    // the props you can change
    children: _propTypes2.default.func.isRequired,
    filter: _propTypes2.default.object,
    filters: _propTypes2.default.element,
    pagination: _propTypes2.default.element,
    perPage: _propTypes2.default.number.isRequired,
    sort: _propTypes2.default.shape({
        field: _propTypes2.default.string,
        order: _propTypes2.default.string
    }),
    // the props managed by react-admin
    authProvider: _propTypes2.default.func,
    changeListParams: _propTypes2.default.func.isRequired,
    crudGetList: _propTypes2.default.func.isRequired,
    data: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
    debounce: _propTypes2.default.number,
    filterValues: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
    hasCreate: _propTypes2.default.bool.isRequired,
    hasEdit: _propTypes2.default.bool.isRequired,
    hasList: _propTypes2.default.bool.isRequired,
    hasShow: _propTypes2.default.bool.isRequired,
    ids: _propTypes2.default.array,
    initiallyEnabledSources: _propTypes2.default.arrayOf(_propTypes2.default.string),
    metaSources: _propTypes2.default.arrayOf(_propTypes2.default.string),
    selectedIds: _propTypes2.default.array,
    isLoading: _propTypes2.default.bool.isRequired,
    location: _propTypes2.default.object.isRequired,
    path: _propTypes2.default.string,
    params: _propTypes2.default.object.isRequired,
    push: _propTypes2.default.func.isRequired,
    query: _propTypes2.default.object.isRequired,
    resource: _propTypes2.default.string.isRequired,
    setSelectedIds: _propTypes2.default.func.isRequired,
    toggleItem: _propTypes2.default.func.isRequired,
    total: _propTypes2.default.number.isRequired,
    totalAll: _propTypes2.default.number.isRequired,
    translate: _propTypes2.default.func.isRequired,
    version: _propTypes2.default.number
};

ListController.defaultProps = {
    debounce: 500,
    filter: {},
    filterValues: {},
    perPage: 10,
    sort: {
        field: 'id',
        order: _queryReducer.SORT_DESC
    }
};

var validQueryParams = ['page', 'perPage', 'sort', 'order', 'filter'];
var getLocationPath = function getLocationPath(props) {
    return props.location.pathname;
};
var getLocationSearch = function getLocationSearch(props) {
    return props.location.search;
};
var getQuery = (0, _reselect.createSelector)(getLocationPath, getLocationSearch, function (path, search) {
    var query = (0, _pickBy2.default)((0, _queryString.parse)(search), function (v, k) {
        return validQueryParams.indexOf(k) !== -1;
    });
    if (query.filter && typeof query.filter === 'string') {
        try {
            query.filter = JSON.parse(query.filter);
        } catch (err) {
            delete query.filter;
        }
    }
    return query;
});

function mapStateToProps(state, props) {
    var resourceState = state.admin.resources[props.resource];

    return {
        query: getQuery(props),
        params: resourceState.list.params,
        ids: resourceState.list.ids,
        selectedIds: resourceState.list.selectedIds,
        total: resourceState.list.total,
        totalAll: resourceState.list.totalAll,
        data: resourceState.data,
        isLoading: state.admin.loading > 0,
        filterValues: resourceState.list.params.filter,
        version: state.admin.ui.viewVersion
    };
}

exports.default = (0, _compose2.default)((0, _reactRedux.connect)(mapStateToProps, {
    crudGetList: _dataActions.crudGetList,
    changeListParams: _listActions.changeListParams,
    setSelectedIds: _listActions.setListSelectedIds,
    toggleItem: _listActions.toggleListItem,
    push: _reactRouterRedux.push
}), _translate2.default)(ListController);