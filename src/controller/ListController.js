/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { parse, stringify } from 'query-string';
import { push as pushAction } from 'react-router-redux';
import compose from 'recompose/compose';
import { createSelector } from 'reselect';
import inflection from 'inflection';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';

import removeEmpty from '../util/removeEmpty';
import queryReducer, {
    SET_SORT,
    SET_PAGE,
    SET_FILTER,
    SORT_DESC,
} from '../reducer/admin/resource/list/queryReducer';
import { crudGetList as crudGetListAction } from '../actions/dataActions';
import {
    changeListParams as changeListParamsAction,
    setListSelectedIds as setListSelectedIdsAction,
    toggleListItem as toggleListItemAction,
} from '../actions/listActions';
import translate from '../i18n/translate';
import removeKey from '../util/removeKey';

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
export class ListController extends Component {
    constructor(props) {
        super(props);

        const enabledSources = props.initiallyEnabledSources.reduce((sources, src) => (
            { ...sources, [src]: true }
        ), {});

        this.state = {
            activeFilters: {},
            enabledSources,
        };
    }

    componentDidMount() {
        if (
            !this.props.query.page &&
            !(this.props.ids || []).length &&
            this.props.params.page > 1 &&
            this.props.total > 0
        ) {
            this.setPage(this.props.params.page - 1);
            return;
        }

        this.updateData(this.props);
        if (Object.keys(this.props.query).length > 0) {
            this.props.changeListParams(this.props.resource, this.props.query);
        }
    }

    componentWillUnmount() {
        this.setFilters.cancel();
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.resource !== this.props.resource ||
            nextProps.query.sort !== this.props.query.sort ||
            nextProps.query.order !== this.props.query.order ||
            nextProps.query.page !== this.props.query.page ||
            nextProps.query.perPage !== this.props.query.perPage ||
            nextProps.query.filter !== this.props.query.filter
        ) {
            this.updateData(
                nextProps,
                Object.keys(nextProps.query).length > 0
                    ? nextProps.query
                    : nextProps.params
            );
        }
        if (nextProps.version !== this.props.version) {
            this.updateData(nextProps);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.translate === this.props.translate &&
            nextProps.isLoading === this.props.isLoading &&
            nextProps.version === this.props.version &&
            nextState === this.state &&
            nextProps.data === this.props.data &&
            nextProps.selectedIds === this.props.selectedIds
        ) {
            return false;
        }
        return true;
    }

    getBasePath() {
        return this.props.location.pathname.replace(/\/$/, '');
    }

    /**
     * Merge list params from 3 different sources:
     *   - the query string
     *   - the params stored in the state (from previous navigation)
     *   - the props passed to the List component
     */
    getQuery() {
        const query =
            Object.keys(this.props.query).length > 0
                ? this.props.query
                : { ...this.props.params };
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

    updateData(props, query) {
        const params = query || this.getQuery();
        const { perPage } = props;
        const { sort, order, page = 1, filter } = params;
        const pagination = {
            page: parseInt(page, 10),
            perPage: parseInt(perPage, 10),
        };
        const permanentFilter = this.props.filter;
        this.props.crudGetList(
            this.props.resource,
            pagination,
            { field: sort, order },
            { ...filter, ...permanentFilter }
        );
    }

    setSort = sort => this.changeParams({ type: SET_SORT, payload: sort });

    setPage = page => this.changeParams({ type: SET_PAGE, payload: page });

    setFilters = debounce(filters => {
        if (isEqual(filters, this.props.filterValues)) {
            return;
        }

        // fix for redux-form bug with onChange and enableReinitialize
        const filtersWithoutEmpty = removeEmpty(filters);
        this.changeParams({ type: SET_FILTER, payload: filtersWithoutEmpty });
    }, this.props.debounce);

    showFilter = (filterName, defaultValue) => {
        this.setState({
            activeFilters: { ...this.state.activeFilters, [filterName]: true },
        });
        if (typeof defaultValue !== 'undefined') {
            this.setFilters({
                ...this.props.filterValues,
                [filterName]: defaultValue,
            });
        }
    };

    hideActiveFilters = () => {
        this.setState({ activeFilters: {} });
    };

    showInactiveFilters = () => {
        this.setState({ activeFilters: this.state.enabledSources });
    };

    hideFilter = filterName => {
        this.setState({
            activeFilters: { ...this.state.activeFilters, [filterName]: false },
        });
        const newFilters = removeKey(this.props.filterValues, filterName);
        this.setFilters(newFilters);
    };

    handleSelect = ids => {
        this.props.setSelectedIds(this.props.resource, ids);
    };

    handleUnselectItems = () => {
        this.props.setSelectedIds(this.props.resource, []);
    };

    handleToggleItem = id => {
        this.props.toggleItem(this.props.resource, id);
    };

    setSourceActive = (source, active) => {
        this.setState({
            activeFilters: { ...this.state.activeFilters, [source]: active },
            enabledSources: { ...this.state.enabledSources, [source]: active },
        });

        if (!active) {
            this.setFilters(removeKey(this.props.filterValues, source));
        }
    };

    changeParams(action) {
        const newParams = queryReducer(this.getQuery(), action);
        this.props.push({
            ...this.props.location,
            search: `?${stringify({
                ...newParams,
                filter: JSON.stringify(newParams.filter),
            })}`,
        });
        this.props.changeListParams(this.props.resource, newParams);
    }

    render() {
        const {
            children,
            resource,
            hasCreate,
            data,
            ids,
            total,
            totalAll,
            isLoading,
            translate,
            version,
            selectedIds,
            metaSources,
        } = this.props;
        const { enabledSources } = this.state;
        const query = this.getQuery();

        const queryFilterValues = query.filter || {};
        const basePath = this.getBasePath();

        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 2,
            _: inflection.humanize(inflection.pluralize(resource)),
        });
        const defaultTitle = translate('ra.page.list', {
            name: `${resourceName}`,
        });

        return children({
            basePath,
            currentSort: {
                field: query.sort,
                order: query.order,
            },
            data,
            defaultTitle,
            displayedFilters: this.state.activeFilters,
            enabledSources,
            filterValues: queryFilterValues,
            hasCreate,
            hideActiveFilters: this.hideActiveFilters,
            showInactiveFilters: this.showInactiveFilters,
            hideFilter: this.hideFilter,
            ids,
            isLoading,
            metaSources,
            onSelect: this.handleSelect,
            onToggleItem: this.handleToggleItem,
            onUnselectItems: this.handleUnselectItems,
            page: parseInt(query.page || 1, 10),
            perPage: parseInt(query.perPage, 10),
            refresh: this.refresh,
            selectedIds,
            setFilters: this.setFilters,
            setPage: this.setPage,
            setSourceActive: this.setSourceActive,
            setSort: this.setSort,
            showFilter: this.showFilter,
            translate,
            total,
            totalAll,
            version,
        });
    }
}

ListController.propTypes = {
    // the props you can change
    children: PropTypes.func.isRequired,
    filter: PropTypes.object,
    filters: PropTypes.element,
    pagination: PropTypes.element,
    perPage: PropTypes.number.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.string,
    }),
    // the props managed by react-admin
    authProvider: PropTypes.func,
    changeListParams: PropTypes.func.isRequired,
    crudGetList: PropTypes.func.isRequired,
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    debounce: PropTypes.number,
    filterValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    hasCreate: PropTypes.bool.isRequired,
    hasEdit: PropTypes.bool.isRequired,
    hasList: PropTypes.bool.isRequired,
    hasShow: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    initiallyEnabledSources: PropTypes.arrayOf(PropTypes.string),
    metaSources: PropTypes.arrayOf(PropTypes.string),
    selectedIds: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    path: PropTypes.string,
    params: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    setSelectedIds: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    totalAll: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
    version: PropTypes.number,
};

ListController.defaultProps = {
    debounce: 500,
    filter: {},
    filterValues: {},
    perPage: 10,
    sort: {
        field: 'id',
        order: SORT_DESC,
    },
};

const validQueryParams = ['page', 'perPage', 'sort', 'order', 'filter'];
const getLocationPath = props => props.location.pathname;
const getLocationSearch = props => props.location.search;
const getQuery = createSelector(
    getLocationPath,
    getLocationSearch,
    (path, search) => {
        const query = pickBy(
            parse(search),
            (v, k) => validQueryParams.indexOf(k) !== -1
        );
        if (query.filter && typeof query.filter === 'string') {
            try {
                query.filter = JSON.parse(query.filter);
            } catch (err) {
                delete query.filter;
            }
        }
        return query;
    }
);

function mapStateToProps(state, props) {
    const resourceState = state.admin.resources[props.resource];

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
        version: state.admin.ui.viewVersion,
    };
}

export default compose(
    connect(mapStateToProps, {
        crudGetList: crudGetListAction,
        changeListParams: changeListParamsAction,
        setSelectedIds: setListSelectedIdsAction,
        toggleItem: toggleListItemAction,
        push: pushAction,
    }),
    translate
)(ListController);
