'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRecord = exports.addRecordsFactory = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _mergeWith = require('lodash/mergeWith');

var _mergeWith2 = _interopRequireDefault(_mergeWith);

var _fetchActions = require('../../../actions/fetchActions');

var _dataFetchActions = require('../../../dataFetchActions');

var _dataActions = require('../../../actions/dataActions');

var _getFetchedAt = require('../../../util/getFetchedAt');

var _getFetchedAt2 = _interopRequireDefault(_getFetchedAt);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Add new records to the pool, and remove outdated ones.
 *
 * This is the equivalent of a stale-while-revalidate caching strategy:
 * The cached data is displayed before fetching, and stale data is removed
 * only once fresh data is fetched.
 */
var addRecordsFactory = exports.addRecordsFactory = function addRecordsFactory(getFetchedAt) {
    return function () {
        var newRecords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var oldRecords = arguments[1];

        var newFetchedAt = getFetchedAt(newRecords.map(function (_ref) {
            var id = _ref.id;
            return id;
        }), oldRecords.fetchedAt);

        var newRecordsById = newRecords.reduce(function (acc, record) {
            return (0, _extends5.default)({}, acc, (0, _defineProperty3.default)({}, record.id, record));
        }, {});

        var records = Object.keys(newFetchedAt).reduce(function (acc, id) {
            return (0, _extends5.default)({}, acc, (0, _defineProperty3.default)({}, id, newRecordsById[id] || oldRecords[id]));
        }, {});

        Object.defineProperty(records, 'fetchedAt', {
            value: newFetchedAt
        }); // non enumerable by default

        return records;
    };
};

var addRecords = addRecordsFactory(_getFetchedAt2.default);

var initialState = {};
Object.defineProperty(initialState, 'fetchedAt', { value: {} }); // non enumerable by default

exports.default = function (resource) {
    return function () {
        var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var _ref2 = arguments[1];
        var type = _ref2.type,
            payload = _ref2.payload,
            requestPayload = _ref2.requestPayload,
            meta = _ref2.meta;

        if (!(0, _index.metaMatchesResource)(meta, resource)) {
            return previousState;
        }
        if (type === _dataActions.CRUD_UPDATE_OPTIMISTIC) {
            var updatedRecord = (0, _extends5.default)({}, previousState[payload.id], payload.data);
            return addRecords([updatedRecord], previousState);
        }
        if (type === _dataActions.CRUD_UPDATE_MANY_OPTIMISTIC) {
            var updatedRecords = payload.ids.reduce(function (records, id) {
                return records.concat(previousState[id]);
            }, []).map(function (record) {
                return (0, _extends5.default)({}, record, payload.data);
            });
            return addRecords(updatedRecords, previousState);
        }
        if (!meta.fetchResponse || meta.fetchStatus !== _fetchActions.FETCH_END) {
            return previousState;
        }
        switch (meta.fetchResponse) {
            case _dataFetchActions.GET_LIST:
            case _dataFetchActions.GET_MANY:
            case _dataFetchActions.GET_MANY_REFERENCE:
                return addRecords(payload.data, previousState);
            case _dataFetchActions.GET_ONE:
            case _dataFetchActions.UPDATE:
            case _dataFetchActions.CREATE:
                {
                    var mergedData = (0, _mergeWith2.default)({}, (0, _get2.default)(requestPayload, 'data'), (0, _get2.default)(payload, 'data'), function (a, b) {
                        return b === null ? a : undefined;
                    });
                    return addRecords([mergedData], previousState);
                }
            case _dataFetchActions.DELETE:
                {
                    var id = requestPayload.previousData.id;


                    var newState = (0, _extends5.default)({}, previousState);
                    delete newState[id];

                    Object.defineProperty(newState, 'fetchedAt', {
                        value: (0, _getFetchedAt2.default)(Object.keys(newState), previousState.fetchedAt)
                    });

                    return newState;
                }
            default:
                return previousState;
        }
    };
};

var getRecord = exports.getRecord = function getRecord(state, id) {
    return state[id];
};