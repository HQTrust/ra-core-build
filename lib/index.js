'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Resource = exports.RoutesWithLayout = exports.CoreAdminRouter = exports.CoreAdmin = exports.nameRelatedTo = exports.getReferencesByIds = exports.getReferences = exports.getIds = exports.queryReducer = exports.i18nReducer = exports.adminReducer = exports.getPossibleReferenceValues = exports.getPossibleReferences = exports.getNotification = exports.getLocale = exports.getReferenceResource = exports.getResources = exports.createAppReducer = undefined;

var _dataFetchActions = require('./dataFetchActions');

Object.keys(_dataFetchActions).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _dataFetchActions[key];
        }
    });
});

var _actions = require('./actions');

Object.keys(_actions).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _actions[key];
        }
    });
});

var _auth = require('./auth');

Object.keys(_auth).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _auth[key];
        }
    });
});

var _i18n = require('./i18n');

Object.keys(_i18n).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _i18n[key];
        }
    });
});

var _util = require('./util');

Object.keys(_util).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _util[key];
        }
    });
});

var _controller = require('./controller');

Object.keys(_controller).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _controller[key];
        }
    });
});

var _form = require('./form');

Object.keys(_form).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _form[key];
        }
    });
});

var _reducer = require('./reducer');

Object.defineProperty(exports, 'getResources', {
    enumerable: true,
    get: function get() {
        return _reducer.getResources;
    }
});
Object.defineProperty(exports, 'getReferenceResource', {
    enumerable: true,
    get: function get() {
        return _reducer.getReferenceResource;
    }
});
Object.defineProperty(exports, 'getLocale', {
    enumerable: true,
    get: function get() {
        return _reducer.getLocale;
    }
});
Object.defineProperty(exports, 'getNotification', {
    enumerable: true,
    get: function get() {
        return _reducer.getNotification;
    }
});
Object.defineProperty(exports, 'getPossibleReferences', {
    enumerable: true,
    get: function get() {
        return _reducer.getPossibleReferences;
    }
});
Object.defineProperty(exports, 'getPossibleReferenceValues', {
    enumerable: true,
    get: function get() {
        return _reducer.getPossibleReferenceValues;
    }
});

var _oneToMany = require('./reducer/admin/references/oneToMany');

Object.defineProperty(exports, 'getIds', {
    enumerable: true,
    get: function get() {
        return _oneToMany.getIds;
    }
});
Object.defineProperty(exports, 'getReferences', {
    enumerable: true,
    get: function get() {
        return _oneToMany.getReferences;
    }
});
Object.defineProperty(exports, 'getReferencesByIds', {
    enumerable: true,
    get: function get() {
        return _oneToMany.getReferencesByIds;
    }
});
Object.defineProperty(exports, 'nameRelatedTo', {
    enumerable: true,
    get: function get() {
        return _oneToMany.nameRelatedTo;
    }
});

var _sideEffect = require('./sideEffect');

Object.keys(_sideEffect).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _sideEffect[key];
        }
    });
});

var _reducer2 = _interopRequireDefault(_reducer);

var _admin = require('./reducer/admin');

var _admin2 = _interopRequireDefault(_admin);

var _i18n2 = require('./reducer/i18n');

var _i18n3 = _interopRequireDefault(_i18n2);

var _queryReducer2 = require('./reducer/admin/resource/list/queryReducer');

var _queryReducer3 = _interopRequireDefault(_queryReducer2);

var _CoreAdmin2 = require('./CoreAdmin');

var _CoreAdmin3 = _interopRequireDefault(_CoreAdmin2);

var _CoreAdminRouter2 = require('./CoreAdminRouter');

var _CoreAdminRouter3 = _interopRequireDefault(_CoreAdminRouter2);

var _RoutesWithLayout2 = require('./RoutesWithLayout');

var _RoutesWithLayout3 = _interopRequireDefault(_RoutesWithLayout2);

var _Resource2 = require('./Resource');

var _Resource3 = _interopRequireDefault(_Resource2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createAppReducer = _reducer2.default;
exports.adminReducer = _admin2.default;
exports.i18nReducer = _i18n3.default;
exports.queryReducer = _queryReducer3.default;
exports.CoreAdmin = _CoreAdmin3.default;
exports.CoreAdminRouter = _CoreAdminRouter3.default;
exports.RoutesWithLayout = _RoutesWithLayout3.default;
exports.Resource = _Resource3.default;