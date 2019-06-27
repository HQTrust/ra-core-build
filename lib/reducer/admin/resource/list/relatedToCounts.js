'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _dataActions = require('../../../../actions/dataActions');

var _index = require('../index');

var _oneToMany = require('../../references/oneToMany.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (resource) {
  return function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload,
        meta = _ref.meta;

    if (meta === undefined || meta.relatedTo === undefined || !(0, _index.metaMatchesResource)(meta, resource) || type !== _dataActions.CRUD_GET_LIST_SUCCESS && type !== _dataActions.CRUD_GET_MANY_REFERENCE_SUCCESS) {
      return previousState;
    }

    var _parseNameRelatedTo = (0, _oneToMany.parseNameRelatedTo)(meta.relatedTo),
        reference = _parseNameRelatedTo.reference,
        recordId = _parseNameRelatedTo.id,
        relatedResource = _parseNameRelatedTo.resource,
        target = _parseNameRelatedTo.target,
        filter = _parseNameRelatedTo.filter;

    var pagination = filter.pagination,
        sort = filter.sort,
        relevantFilter = (0, _objectWithoutProperties3.default)(filter, ['pagination', 'sort']);

    var filterSortedByKey = (0, _lodash2.default)(relevantFilter).toPairs().sortBy(0).fromPairs().value();

    var relatedTo = (0, _oneToMany.nameRelatedTo)(reference, recordId, relatedResource, target, filterSortedByKey);

    switch (type) {
      case _dataActions.CRUD_GET_LIST_SUCCESS:
      case _dataActions.CRUD_GET_MANY_REFERENCE_SUCCESS:
        return _lodash2.default.isNumber(payload.total) ? (0, _extends4.default)({}, previousState, (0, _defineProperty3.default)({}, relatedTo, payload.total)) : previousState;
      default:
        return previousState;
    }
  };
};

module.exports = exports['default'];