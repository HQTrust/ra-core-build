'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceInputController = undefined;

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

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
 * An Input component for choosing a reference record. Useful for foreign keys.
 *
 * This component fetches the possible values in the reference resource
 * (using the `CRUD_GET_MATCHING` REST method), then delegates rendering
 * to a subcomponent, to which it passes the possible choices
 * as the `choices` attribute.
 *
 * Use it with a selector component as child, like `<AutocompleteInput>`,
 * `<SelectInput>`, or `<RadioButtonGroupInput>`.
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <AutocompleteInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example
 * export const CommentEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <ReferenceInput label="Post" source="post_id" reference="posts">
 *                 <SelectInput optionText="title" />
 *             </ReferenceInput>
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      perPage={100}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      sort={{ field: 'title', order: 'ASC' }}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filter={{ is_published: true }}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 *
 * The enclosed component may filter results. ReferenceInput passes a `setFilter`
 * function as prop to its child component. It uses the value to create a filter
 * for the query - by default { q: [searchText] }. You can customize the mapping
 * searchText => searchQuery by setting a custom `filterToQuery` function prop:
 *
 * @example
 * <ReferenceInput
 *      source="post_id"
 *      reference="posts"
 *      filterToQuery={searchText => ({ title: searchText })}>
 *     <SelectInput optionText="title" />
 * </ReferenceInput>
 */

var ReferenceInputController = exports.ReferenceInputController = function (_Component) {
    (0, _inherits3.default)(ReferenceInputController, _Component);

    function ReferenceInputController(props) {
        (0, _classCallCheck3.default)(this, ReferenceInputController);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ReferenceInputController.__proto__ || Object.getPrototypeOf(ReferenceInputController)).call(this, props));

        _initialiseProps.call(_this);

        var perPage = props.perPage,
            sort = props.sort,
            filter = props.filter;
        // stored as a property rather than state because we don't want redraw of async updates

        _this.params = { pagination: { page: 1, perPage: perPage }, sort: sort, filter: filter };
        _this.debouncedSetFilter = (0, _debounce2.default)(_this.setFilter.bind(_this), 500);
        return _this;
    }

    (0, _createClass3.default)(ReferenceInputController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchReferenceAndOptions(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.record.id !== nextProps.record.id) {
                this.fetchReferenceAndOptions(nextProps);
            } else if (this.props.input.value !== nextProps.input.value) {
                this.fetchReference(nextProps);
            }
        }
    }, {
        key: 'fetchReferenceAndOptions',
        value: function fetchReferenceAndOptions(props) {
            this.fetchReference(props);
            this.fetchOptions(props);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                input = _props.input,
                matchingReferences = _props.matchingReferences,
                onChange = _props.onChange,
                record = _props.record,
                referenceRecord = _props.referenceRecord,
                source = _props.source,
                translate = _props.translate;

            var defaultValue = (0, _get2.default)(record, source);

            var dataStatus = (0, _referenceDataStatus.getStatusForInput)({
                input: input,
                matchingReferences: matchingReferences,
                referenceRecord: referenceRecord,
                translate: translate
            });

            return children({
                choices: dataStatus.choices,
                defaultValue: defaultValue,
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
    return ReferenceInputController;
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

    this.fetchReference = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;
        var crudGetOne = props.crudGetOne,
            input = props.input,
            reference = props.reference;

        var id = input.value;
        if (id) {
            crudGetOne(reference, id, null, false);
        }
    };

    this.fetchOptions = function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;
        var crudGetMatching = props.crudGetMatching,
            filterFromProps = props.filter,
            reference = props.reference,
            referenceSource = props.referenceSource,
            resource = props.resource,
            source = props.source;
        var _params = _this2.params,
            pagination = _params.pagination,
            sort = _params.sort,
            filter = _params.filter;


        crudGetMatching(reference, referenceSource(resource, source), pagination, sort, (0, _extends3.default)({}, filterFromProps, filter));
    };
};

ReferenceInputController.propTypes = {
    allowEmpty: _propTypes2.default.bool.isRequired,
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.func.isRequired,
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    crudGetMatching: _propTypes2.default.func.isRequired,
    crudGetOne: _propTypes2.default.func.isRequired,
    filter: _propTypes2.default.object,
    filterToQuery: _propTypes2.default.func.isRequired,
    input: _propTypes2.default.object.isRequired,
    matchingReferences: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
    onChange: _propTypes2.default.func,
    perPage: _propTypes2.default.number,
    record: _propTypes2.default.object,
    reference: _propTypes2.default.string.isRequired,
    referenceRecord: _propTypes2.default.object,
    referenceSource: _propTypes2.default.func.isRequired,
    resource: _propTypes2.default.string.isRequired,
    sort: _propTypes2.default.shape({
        field: _propTypes2.default.string,
        order: _propTypes2.default.oneOf(['ASC', 'DESC'])
    }),
    source: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired
};

ReferenceInputController.defaultProps = {
    allowEmpty: false,
    filter: {},
    filterToQuery: function filterToQuery(searchText) {
        return { q: searchText };
    },
    matchingReferences: null,
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
    referenceRecord: null,
    referenceSource: referenceSource // used in tests
};

var makeMapStateToProps = function makeMapStateToProps() {
    return (0, _reselect.createSelector)([_reducer.getReferenceResource, _reducer.getPossibleReferenceValues, function (_, props) {
        return props.input.value;
    }], function (referenceState, possibleValues, inputId) {
        return {
            matchingReferences: (0, _reducer.getPossibleReferences)(referenceState, possibleValues, [inputId]),
            referenceRecord: referenceState && referenceState.data[inputId]
        };
    });
};

var EnhancedReferenceInputController = (0, _compose2.default)(_translate2.default, (0, _reactRedux.connect)(makeMapStateToProps(), {
    crudGetOne: _dataActions.crudGetOne,
    crudGetMatching: _dataActions.crudGetMatching
}))(ReferenceInputController);

EnhancedReferenceInputController.defaultProps = {
    referenceSource: referenceSource // used in makeMapStateToProps
};

exports.default = EnhancedReferenceInputController;