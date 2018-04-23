'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceArrayInputController = undefined;

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

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _reselect = require('reselect');

var _dataActions = require('../../actions/dataActions');

var _reducer = require('../../reducer');

var _referenceDataStatus = require('./referenceDataStatus');

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var referenceSource = function referenceSource(resource, source) {
    return resource + '@' + source;
};

/**
 * An Input component for fields containing a list of references to another resource.
 * Useful for 'hasMany' relationship.
 *
 * @example
 * The post object has many tags, so the post resource looks like:
 * {
 *    id: 1234,
 *    tag_ids: [ "1", "23", "4" ]
 * }
 *
 * ReferenceArrayInput component fetches the current resources (using the
 * `CRUD_GET_MANY` REST method) as well as possible resources (using the
 * `CRUD_GET_MATCHING` REST method) in the reference endpoint. It then
 * delegates rendering to a subcomponent, to which it passes the possible
 * choices as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<SelectArrayInput>`
 * or <CheckboxGroupInput>.
 *
 * @example
 * export const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceArrayInput source="tag_ids" reference="tags">
 *                 <SelectArrayInput optionText="name" />
 *             </ReferenceArrayInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      perPage={100}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      sort={{ field: 'name', order: 'ASC' }}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      filter={{ is_public: true }}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 *
 * The enclosed component may filter results. ReferenceArrayInput passes a
 * `setFilter` function as prop to its child component. It uses the value to
 * create a filter for the query - by default { q: [searchText] }. You can
 * customize the mapping searchText => searchQuery by setting a custom
 * `filterToQuery` function prop:
 *
 * @example
 * <ReferenceArrayInput
 *      source="tag_ids"
 *      reference="tags"
 *      filterToQuery={searchText => ({ name: searchText })}>
 *     <SelectArrayInput optionText="name" />
 * </ReferenceArrayInput>
 */

var ReferenceArrayInputController = exports.ReferenceArrayInputController = function (_Component) {
    (0, _inherits3.default)(ReferenceArrayInputController, _Component);

    function ReferenceArrayInputController(props) {
        (0, _classCallCheck3.default)(this, ReferenceArrayInputController);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ReferenceArrayInputController.__proto__ || Object.getPrototypeOf(ReferenceArrayInputController)).call(this, props));

        _initialiseProps.call(_this);

        var perPage = props.perPage,
            sort = props.sort,
            filter = props.filter;
        // stored as a property rather than state because we don't want redraw of async updates

        _this.params = { pagination: { page: 1, perPage: perPage }, sort: sort, filter: filter };
        _this.debouncedSetFilter = (0, _debounce2.default)(_this.setFilter.bind(_this), 500);
        return _this;
    }

    (0, _createClass3.default)(ReferenceArrayInputController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchReferencesAndOptions();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.record.id !== nextProps.record.id) {
                this.fetchReferencesAndOptions(nextProps);
            } else if (this.props.input.value !== nextProps.input.value) {
                this.fetchReferences(nextProps);
            }
        }
    }, {
        key: 'fetchReferencesAndOptions',
        value: function fetchReferencesAndOptions(nextProps) {
            this.fetchReferences(nextProps);
            this.fetchOptions(nextProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                input = _props.input,
                referenceRecords = _props.referenceRecords,
                matchingReferences = _props.matchingReferences,
                onChange = _props.onChange,
                children = _props.children,
                translate = _props.translate;


            var dataStatus = (0, _referenceDataStatus.getStatusForArrayInput)({
                input: input,
                matchingReferences: matchingReferences,
                referenceRecords: referenceRecords,
                translate: translate
            });

            return children({
                choices: dataStatus.choices,
                error: dataStatus.error,
                isLoading: dataStatus.waiting,
                onChange: onChange,
                setFilter: this.debouncedSetFilter,
                setPagination: this.setPagination,
                setSort: this.setSort,
                warning: dataStatus.warning
            });
        }
    }]);
    return ReferenceArrayInputController;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.setFilter = function (filter) {
        if (filter !== _this2.params.filter) {
            _this2.params.filter = _this2.props.filterToQuery(filter);
            _this2.fetchOptions();
        }
    };

    this.setPagination = function (pagination) {
        if (pagination !== _this2.param.pagination) {
            _this2.param.pagination = pagination;
            _this2.fetchOptions();
        }
    };

    this.setSort = function (sort) {
        if (sort !== _this2.params.sort) {
            _this2.params.sort = sort;
            _this2.fetchOptions();
        }
    };

    this.fetchReferences = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;
        var crudGetMany = props.crudGetMany,
            input = props.input,
            reference = props.reference;

        var ids = input.value;
        if (ids) {
            if (!Array.isArray(ids)) {
                throw Error('The value of ReferenceArrayInput should be an array');
            }
            crudGetMany(reference, ids);
        }
    };

    this.fetchOptions = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;
        var crudGetMatching = props.crudGetMatching,
            reference = props.reference,
            source = props.source,
            resource = props.resource,
            referenceSource = props.referenceSource;
        var _params = _this2.params,
            pagination = _params.pagination,
            sort = _params.sort,
            filter = _params.filter;

        crudGetMatching(reference, referenceSource(resource, source), pagination, sort, filter);
    };
};

ReferenceArrayInputController.propTypes = {
    allowEmpty: _propTypes2.default.bool.isRequired,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.func.isRequired,
    className: _propTypes2.default.string,
    crudGetMatching: _propTypes2.default.func.isRequired,
    crudGetMany: _propTypes2.default.func.isRequired,
    filter: _propTypes2.default.object,
    filterToQuery: _propTypes2.default.func.isRequired,
    input: _propTypes2.default.object.isRequired,
    label: _propTypes2.default.string,
    matchingReferences: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
    meta: _propTypes2.default.object,
    onChange: _propTypes2.default.func,
    perPage: _propTypes2.default.number,
    record: _propTypes2.default.object,
    reference: _propTypes2.default.string.isRequired,
    referenceRecords: _propTypes2.default.array,
    referenceSource: _propTypes2.default.func.isRequired,
    resource: _propTypes2.default.string.isRequired,
    sort: _propTypes2.default.shape({
        field: _propTypes2.default.string,
        order: _propTypes2.default.oneOf(['ASC', 'DESC'])
    }),
    source: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired
};

ReferenceArrayInputController.defaultProps = {
    allowEmpty: false,
    filter: {},
    filterToQuery: function filterToQuery(searchText) {
        return { q: searchText };
    },
    matchingReferences: null,
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
    referenceRecords: [],
    referenceSource: referenceSource // used in unit tests
};

var makeMapStateToProps = function makeMapStateToProps() {
    return (0, _reselect.createSelector)([_reducer.getReferenceResource, _reducer.getPossibleReferenceValues, function (_, _ref) {
        var referenceIds = _ref.input.value;
        return referenceIds || [];
    }], function (referenceState, possibleValues, inputIds) {
        return {
            matchingReferences: (0, _reducer.getPossibleReferences)(referenceState, possibleValues, inputIds),
            referenceRecords: referenceState && inputIds.reduce(function (references, referenceId) {
                if (referenceState.data[referenceId]) {
                    references.push(referenceState.data[referenceId]);
                }
                return references;
            }, [])
        };
    });
};

var EnhancedReferenceArrayInputController = (0, _compose2.default)(_translate2.default, (0, _reactRedux.connect)(makeMapStateToProps(), {
    crudGetMany: _dataActions.crudGetMany,
    crudGetMatching: _dataActions.crudGetMatching
}))(ReferenceArrayInputController);

EnhancedReferenceArrayInputController.defaultProps = {
    referenceSource: referenceSource // used in makeMapStateToProps
};

exports.default = EnhancedReferenceArrayInputController;