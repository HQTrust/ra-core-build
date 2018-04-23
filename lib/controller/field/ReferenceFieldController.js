'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceFieldController = undefined;

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

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _actions = require('../../actions');

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fetch reference record, and delegate rendering to child component.
 *
 * The reference prop sould be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * By default, includes a link to the <Edit> page of the related record
 * (`/users/:userId` in the previous example).
 *
 * Set the linkType prop to "show" to link to the <Show> page instead.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType="show">
 *     <TextField source="name" />
 * </ReferenceField>
 *
 * You can also prevent `<ReferenceField>` from adding link to children by setting
 * `linkType` to false.
 *
 * @example
 * <ReferenceField label="User" source="userId" reference="users" linkType={false}>
 *     <TextField source="name" />
 * </ReferenceField>
 */
var ReferenceFieldController = exports.ReferenceFieldController = function (_Component) {
    (0, _inherits3.default)(ReferenceFieldController, _Component);

    function ReferenceFieldController() {
        (0, _classCallCheck3.default)(this, ReferenceFieldController);
        return (0, _possibleConstructorReturn3.default)(this, (ReferenceFieldController.__proto__ || Object.getPrototypeOf(ReferenceFieldController)).apply(this, arguments));
    }

    (0, _createClass3.default)(ReferenceFieldController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchReference(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.record.id !== nextProps.record.id) {
                this.fetchReference(nextProps);
            }
        }
    }, {
        key: 'fetchReference',
        value: function fetchReference(props) {
            var source = (0, _get2.default)(props.record, props.source);
            if (source !== null && typeof source !== 'undefined') {
                this.props.crudGetManyAccumulate(props.reference, [source]);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                allowEmpty = _props.allowEmpty,
                basePath = _props.basePath,
                children = _props.children,
                linkType = _props.linkType,
                record = _props.record,
                reference = _props.reference,
                referenceRecord = _props.referenceRecord,
                resource = _props.resource,
                source = _props.source;

            var rootPath = basePath.replace(resource, reference);
            var resourceLinkPath = !linkType ? false : (0, _util.linkToRecord)(rootPath, (0, _get2.default)(record, source), linkType);
            return children({
                isLoading: !referenceRecord && !allowEmpty,
                referenceRecord: referenceRecord,
                resourceLinkPath: resourceLinkPath
            });
        }
    }]);
    return ReferenceFieldController;
}(_react.Component);

ReferenceFieldController.propTypes = {
    addLabel: _propTypes2.default.bool,
    allowEmpty: _propTypes2.default.bool.isRequired,
    basePath: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.func.isRequired,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    cellClassName: _propTypes2.default.string,
    headerClassName: _propTypes2.default.string,
    crudGetManyAccumulate: _propTypes2.default.func.isRequired,
    label: _propTypes2.default.string,
    record: _propTypes2.default.object,
    reference: _propTypes2.default.string.isRequired,
    referenceRecord: _propTypes2.default.object,
    resource: _propTypes2.default.string,
    source: _propTypes2.default.string.isRequired,
    translateChoice: _propTypes2.default.func,
    linkType: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]).isRequired
};

ReferenceFieldController.defaultProps = {
    allowEmpty: false,
    classes: {},
    linkType: 'edit',
    referenceRecord: null,
    record: {}
};

var mapStateToProps = function mapStateToProps(state, props) {
    return {
        referenceRecord: state.admin.resources[props.reference].data[(0, _get2.default)(props.record, props.source)]
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, {
    crudGetManyAccumulate: _actions.crudGetManyAccumulate
})(ReferenceFieldController);