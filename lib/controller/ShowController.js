'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShowController = undefined;

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

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _translate = require('../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Page component for the Show view
 * 
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Show>` component accepts the following props:
 *
 * - title
 * - actions
 * 
 * Both expect an element for value.
 * 
 * @example     
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *     
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <SimpleShowLayout>
 *                 <TextField source="title" />
 *             </SimpleShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *     
 *     import { PostShow } from './posts';
 *     
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
var ShowController = exports.ShowController = function (_Component) {
    (0, _inherits3.default)(ShowController, _Component);

    function ShowController() {
        (0, _classCallCheck3.default)(this, ShowController);
        return (0, _possibleConstructorReturn3.default)(this, (ShowController.__proto__ || Object.getPrototypeOf(ShowController)).apply(this, arguments));
    }

    (0, _createClass3.default)(ShowController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateData();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.id !== nextProps.id || nextProps.version !== this.props.version) {
                this.updateData(nextProps.resource, nextProps.id);
            }
        }
    }, {
        key: 'getBasePath',
        value: function getBasePath() {
            var location = this.props.location;

            return location.pathname.split('/').slice(0, -2).join('/');
        }
    }, {
        key: 'updateData',
        value: function updateData() {
            var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.resource;
            var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.id;

            this.props.crudGetOne(resource, id, this.getBasePath());
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                children = _props.children,
                id = _props.id,
                record = _props.record,
                isLoading = _props.isLoading,
                resource = _props.resource,
                translate = _props.translate,
                version = _props.version;


            if (!children) return null;
            var basePath = this.getBasePath();

            var resourceName = translate('resources.' + resource + '.name', {
                smart_count: 1,
                _: _inflection2.default.humanize(_inflection2.default.singularize(resource))
            });
            var defaultTitle = translate('ra.page.show', {
                name: '' + resourceName,
                id: id,
                record: record
            });
            return children({
                isLoading: isLoading,
                title: title,
                defaultTitle: defaultTitle,
                resource: resource,
                basePath: basePath,
                record: record,
                translate: translate,
                version: version
            });
        }
    }]);
    return ShowController;
}(_react.Component);

ShowController.propTypes = {
    children: _propTypes2.default.func.isRequired,
    crudGetOne: _propTypes2.default.func.isRequired,
    record: _propTypes2.default.object,
    hasCreate: _propTypes2.default.bool,
    hasEdit: _propTypes2.default.bool,
    hasList: _propTypes2.default.bool,
    hasShow: _propTypes2.default.bool,
    id: _propTypes2.default.string.isRequired,
    isLoading: _propTypes2.default.bool.isRequired,
    location: _propTypes2.default.object.isRequired,
    match: _propTypes2.default.object.isRequired,
    resource: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.any,
    translate: _propTypes2.default.func,
    version: _propTypes2.default.number.isRequired
};

function mapStateToProps(state, props) {
    return {
        id: decodeURIComponent(props.match.params.id),
        record: state.admin.resources[props.resource] ? state.admin.resources[props.resource].data[decodeURIComponent(props.match.params.id)] : null,
        isLoading: state.admin.loading > 0,
        version: state.admin.ui.viewVersion
    };
}

exports.default = (0, _compose2.default)((0, _reactRedux.connect)(mapStateToProps, { crudGetOne: _actions.crudGetOne }), _translate2.default)(ShowController);