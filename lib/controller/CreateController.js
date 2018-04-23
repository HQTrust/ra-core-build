'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
 * Page component for the Create view
 * 
 * The `<Create>` component renders the page title and actions.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Create>` component accepts the following props:
 *
 * - title
 * - actions
 * 
 * Both expect an element for value.
 * 
 * @example     
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Create, SimpleForm, TextInput } from 'react-admin';
 *     
 *     export const PostCreate = (props) => (
 *         <Create {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Create>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *     
 *     import { PostCreate } from './posts';
 *     
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" create={PostCreate} />
 *         </Admin>
 *     );
 *     export default App;
 */
var CreateController = function (_Component) {
    (0, _inherits3.default)(CreateController, _Component);

    function CreateController() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CreateController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CreateController.__proto__ || Object.getPrototypeOf(CreateController)).call.apply(_ref, [this].concat(args))), _this), _this.save = function (record, redirect) {
            _this.props.crudCreate(_this.props.resource, record, _this.getBasePath(), redirect);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CreateController, [{
        key: 'getBasePath',
        value: function getBasePath() {
            var location = this.props.location;

            return location.pathname.split('/').slice(0, -1).join('/');
        }
    }, {
        key: 'defaultRedirectRoute',
        value: function defaultRedirectRoute() {
            var _props = this.props,
                hasShow = _props.hasShow,
                hasEdit = _props.hasEdit;

            if (hasEdit) return 'edit';
            if (hasShow) return 'show';
            return 'list';
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                children = _props2.children,
                isLoading = _props2.isLoading,
                record = _props2.record,
                resource = _props2.resource,
                translate = _props2.translate;


            if (!children) return null;
            var basePath = this.getBasePath();

            var resourceName = translate('resources.' + resource + '.name', {
                smart_count: 1,
                _: _inflection2.default.humanize(_inflection2.default.singularize(resource))
            });
            var defaultTitle = translate('ra.page.create', {
                name: '' + resourceName
            });
            return children({
                isLoading: isLoading,
                defaultTitle: defaultTitle,
                save: this.save,
                resource: resource,
                basePath: basePath,
                record: record,
                redirect: this.defaultRedirectRoute(),
                translate: translate
            });
        }
    }]);
    return CreateController;
}(_react.Component);

CreateController.propTypes = {
    children: _propTypes2.default.func.isRequired,
    crudCreate: _propTypes2.default.func.isRequired,
    hasCreate: _propTypes2.default.bool,
    hasEdit: _propTypes2.default.bool,
    hasList: _propTypes2.default.bool,
    hasShow: _propTypes2.default.bool,
    isLoading: _propTypes2.default.bool.isRequired,
    location: _propTypes2.default.object.isRequired,
    match: _propTypes2.default.object.isRequired,
    record: _propTypes2.default.object,
    resource: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.any,
    translate: _propTypes2.default.func.isRequired
};

CreateController.defaultProps = {
    record: {}
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0
    };
}

exports.default = (0, _compose2.default)((0, _reactRedux.connect)(mapStateToProps, { crudCreate: _actions.crudCreate }), _translate2.default)(CreateController);
module.exports = exports['default'];