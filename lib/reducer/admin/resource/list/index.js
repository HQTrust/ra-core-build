'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _ids = require('./ids');

var _ids2 = _interopRequireDefault(_ids);

var _params = require('./params');

var _params2 = _interopRequireDefault(_params);

var _selectedIds = require('./selectedIds');

var _selectedIds2 = _interopRequireDefault(_selectedIds);

var _total = require('./total');

var _total2 = _interopRequireDefault(_total);

var _totalAll = require('./totalAll');

var _totalAll2 = _interopRequireDefault(_totalAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (resource) {
    return (0, _redux.combineReducers)({
        ids: (0, _ids2.default)(resource),
        params: (0, _params2.default)(resource),
        selectedIds: _selectedIds2.default,
        total: (0, _total2.default)(resource),
        totalAll: (0, _totalAll2.default)(resource)
    });
};

module.exports = exports['default'];