'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.crudGetManyReference = exports.CRUD_GET_MANY_REFERENCE_SUCCESS = exports.CRUD_GET_MANY_REFERENCE_FAILURE = exports.CRUD_GET_MANY_REFERENCE_LOADING = exports.CRUD_GET_MANY_REFERENCE = exports.crudGetMatching = exports.CRUD_GET_MATCHING_SUCCESS = exports.CRUD_GET_MATCHING_FAILURE = exports.CRUD_GET_MATCHING_LOADING = exports.CRUD_GET_MATCHING = exports.crudGetMany = exports.CRUD_GET_MANY_SUCCESS = exports.CRUD_GET_MANY_FAILURE = exports.CRUD_GET_MANY_LOADING = exports.CRUD_GET_MANY = exports.crudDeleteMany = exports.CRUD_DELETE_MANY_OPTIMISTIC = exports.CRUD_DELETE_MANY_SUCCESS = exports.CRUD_DELETE_MANY_FAILURE = exports.CRUD_DELETE_MANY_LOADING = exports.CRUD_DELETE_MANY = exports.crudDelete = exports.CRUD_DELETE_OPTIMISTIC = exports.CRUD_DELETE_SUCCESS = exports.CRUD_DELETE_FAILURE = exports.CRUD_DELETE_LOADING = exports.CRUD_DELETE = exports.crudUpdateMany = exports.CRUD_UPDATE_MANY_OPTIMISTIC = exports.CRUD_UPDATE_MANY_SUCCESS = exports.CRUD_UPDATE_MANY_FAILURE = exports.CRUD_UPDATE_MANY_LOADING = exports.CRUD_UPDATE_MANY = exports.crudUpdate = exports.CRUD_UPDATE_OPTIMISTIC = exports.CRUD_UPDATE_SUCCESS = exports.CRUD_UPDATE_FAILURE = exports.CRUD_UPDATE_LOADING = exports.CRUD_UPDATE = exports.crudCreate = exports.CRUD_CREATE_SUCCESS = exports.CRUD_CREATE_FAILURE = exports.CRUD_CREATE_LOADING = exports.CRUD_CREATE = exports.crudGetOne = exports.CRUD_GET_ONE_SUCCESS = exports.CRUD_GET_ONE_FAILURE = exports.CRUD_GET_ONE_LOADING = exports.CRUD_GET_ONE = exports.crudGetList = exports.CRUD_GET_LIST_SUCCESS = exports.CRUD_GET_LIST_FAILURE = exports.CRUD_GET_LIST_LOADING = exports.CRUD_GET_LIST = undefined;

var _dataFetchActions = require('../dataFetchActions');

var CRUD_GET_LIST = exports.CRUD_GET_LIST = 'RA/CRUD_GET_LIST';
var CRUD_GET_LIST_LOADING = exports.CRUD_GET_LIST_LOADING = 'RA/CRUD_GET_LIST_LOADING';
var CRUD_GET_LIST_FAILURE = exports.CRUD_GET_LIST_FAILURE = 'RA/CRUD_GET_LIST_FAILURE';
var CRUD_GET_LIST_SUCCESS = exports.CRUD_GET_LIST_SUCCESS = 'RA/CRUD_GET_LIST_SUCCESS';

var crudGetList = exports.crudGetList = function crudGetList(resource, pagination, sort, filter) {
    return {
        type: CRUD_GET_LIST,
        payload: { pagination: pagination, sort: sort, filter: filter },
        meta: {
            resource: resource,
            fetch: _dataFetchActions.GET_LIST,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                },
                refresh: true
            }
        }
    };
};

var CRUD_GET_ONE = exports.CRUD_GET_ONE = 'RA/CRUD_GET_ONE';
var CRUD_GET_ONE_LOADING = exports.CRUD_GET_ONE_LOADING = 'RA/CRUD_GET_ONE_LOADING';
var CRUD_GET_ONE_FAILURE = exports.CRUD_GET_ONE_FAILURE = 'RA/CRUD_GET_ONE_FAILURE';
var CRUD_GET_ONE_SUCCESS = exports.CRUD_GET_ONE_SUCCESS = 'RA/CRUD_GET_ONE_SUCCESS';

var crudGetOne = exports.crudGetOne = function crudGetOne(resource, id, basePath) {
    return {
        type: CRUD_GET_ONE,
        payload: { id: id },
        meta: {
            resource: resource,
            fetch: _dataFetchActions.GET_ONE,
            basePath: basePath,
            onFailure: {
                notification: {
                    body: 'ra.notification.item_doesnt_exist',
                    level: 'warning'
                },
                redirectTo: 'list',
                refresh: true
            }
        }
    };
};

var CRUD_CREATE = exports.CRUD_CREATE = 'RA/CRUD_CREATE';
var CRUD_CREATE_LOADING = exports.CRUD_CREATE_LOADING = 'RA/CRUD_CREATE_LOADING';
var CRUD_CREATE_FAILURE = exports.CRUD_CREATE_FAILURE = 'RA/CRUD_CREATE_FAILURE';
var CRUD_CREATE_SUCCESS = exports.CRUD_CREATE_SUCCESS = 'RA/CRUD_CREATE_SUCCESS';

var crudCreate = exports.crudCreate = function crudCreate(resource, data, basePath) {
    var redirectTo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'edit';
    return {
        type: CRUD_CREATE,
        payload: { data: data },
        meta: {
            resource: resource,
            fetch: _dataFetchActions.CREATE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.created',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1
                    }
                },
                redirectTo: redirectTo,
                basePath: basePath
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                },
                refresh: true
            }
        }
    };
};

var CRUD_UPDATE = exports.CRUD_UPDATE = 'RA/CRUD_UPDATE';
var CRUD_UPDATE_LOADING = exports.CRUD_UPDATE_LOADING = 'RA/CRUD_UPDATE_LOADING';
var CRUD_UPDATE_FAILURE = exports.CRUD_UPDATE_FAILURE = 'RA/CRUD_UPDATE_FAILURE';
var CRUD_UPDATE_SUCCESS = exports.CRUD_UPDATE_SUCCESS = 'RA/CRUD_UPDATE_SUCCESS';
var CRUD_UPDATE_OPTIMISTIC = exports.CRUD_UPDATE_OPTIMISTIC = 'RA/CRUD_UPDATE_OPTIMISTIC';

var crudUpdate = exports.crudUpdate = function crudUpdate(resource, id, data, previousData, basePath) {
    var redirectTo = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'show';
    return {
        type: CRUD_UPDATE,
        payload: { id: id, data: data, previousData: previousData },
        meta: {
            resource: resource,
            fetch: _dataFetchActions.UPDATE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.updated',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1
                    }
                },
                redirectTo: redirectTo,
                basePath: basePath
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                },
                refresh: true
            }
        }
    };
};

var CRUD_UPDATE_MANY = exports.CRUD_UPDATE_MANY = 'RA/CRUD_UPDATE_MANY';
var CRUD_UPDATE_MANY_LOADING = exports.CRUD_UPDATE_MANY_LOADING = 'RA/CRUD_UPDATE_MANY_LOADING';
var CRUD_UPDATE_MANY_FAILURE = exports.CRUD_UPDATE_MANY_FAILURE = 'RA/CRUD_UPDATE_MANY_FAILURE';
var CRUD_UPDATE_MANY_SUCCESS = exports.CRUD_UPDATE_MANY_SUCCESS = 'RA/CRUD_UPDATE_MANY_SUCCESS';
var CRUD_UPDATE_MANY_OPTIMISTIC = exports.CRUD_UPDATE_MANY_OPTIMISTIC = 'RA/CRUD_UPDATE_MANY_OPTIMISTIC';

var crudUpdateMany = exports.crudUpdateMany = function crudUpdateMany(resource, ids, data, basePath) {
    var refresh = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    return {
        type: CRUD_UPDATE_MANY,
        payload: { ids: ids, data: data },
        meta: {
            resource: resource,
            fetch: _dataFetchActions.UPDATE_MANY,
            cancelPrevious: false,
            onSuccess: {
                notification: {
                    body: 'ra.notification.updated',
                    level: 'info',
                    messageArgs: {
                        smart_count: ids.length
                    }
                },
                basePath: basePath,
                refresh: refresh,
                unselectAll: true
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                },
                refresh: true
            }
        }
    };
};

var CRUD_DELETE = exports.CRUD_DELETE = 'RA/CRUD_DELETE';
var CRUD_DELETE_LOADING = exports.CRUD_DELETE_LOADING = 'RA/CRUD_DELETE_LOADING';
var CRUD_DELETE_FAILURE = exports.CRUD_DELETE_FAILURE = 'RA/CRUD_DELETE_FAILURE';
var CRUD_DELETE_SUCCESS = exports.CRUD_DELETE_SUCCESS = 'RA/CRUD_DELETE_SUCCESS';
var CRUD_DELETE_OPTIMISTIC = exports.CRUD_DELETE_OPTIMISTIC = 'RA/CRUD_DELETE_OPTIMISTIC';

var crudDelete = exports.crudDelete = function crudDelete(resource, id, previousData, basePath) {
    var redirectTo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'list';
    return {
        type: CRUD_DELETE,
        payload: { id: id, previousData: previousData },
        meta: {
            resource: resource,
            fetch: _dataFetchActions.DELETE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.deleted',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1
                    }
                },
                redirectTo: redirectTo,
                basePath: basePath
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                },
                refresh: true
            }
        }
    };
};

var CRUD_DELETE_MANY = exports.CRUD_DELETE_MANY = 'RA/CRUD_DELETE_MANY';
var CRUD_DELETE_MANY_LOADING = exports.CRUD_DELETE_MANY_LOADING = 'RA/CRUD_DELETE_MANY_LOADING';
var CRUD_DELETE_MANY_FAILURE = exports.CRUD_DELETE_MANY_FAILURE = 'RA/CRUD_DELETE_MANY_FAILURE';
var CRUD_DELETE_MANY_SUCCESS = exports.CRUD_DELETE_MANY_SUCCESS = 'RA/CRUD_DELETE_MANY_SUCCESS';
var CRUD_DELETE_MANY_OPTIMISTIC = exports.CRUD_DELETE_MANY_OPTIMISTIC = 'RA/CRUD_DELETE_MANY_OPTIMISTIC';

var crudDeleteMany = exports.crudDeleteMany = function crudDeleteMany(resource, ids, basePath) {
    var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return {
        type: CRUD_DELETE_MANY,
        payload: { ids: ids },
        meta: {
            resource: resource,
            fetch: _dataFetchActions.DELETE_MANY,
            onSuccess: {
                notification: {
                    body: 'ra.notification.deleted',
                    level: 'info',
                    messageArgs: {
                        smart_count: ids.length
                    }
                },
                basePath: basePath,
                refresh: refresh,
                unselectAll: true
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                },
                refresh: true
            }
        }
    };
};

var CRUD_GET_MANY = exports.CRUD_GET_MANY = 'RA/CRUD_GET_MANY';
var CRUD_GET_MANY_LOADING = exports.CRUD_GET_MANY_LOADING = 'RA/CRUD_GET_MANY_LOADING';
var CRUD_GET_MANY_FAILURE = exports.CRUD_GET_MANY_FAILURE = 'RA/CRUD_GET_MANY_FAILURE';
var CRUD_GET_MANY_SUCCESS = exports.CRUD_GET_MANY_SUCCESS = 'RA/CRUD_GET_MANY_SUCCESS';

// Reference related actions

var crudGetMany = exports.crudGetMany = function crudGetMany(resource, ids) {
    return {
        type: CRUD_GET_MANY,
        payload: { ids: ids },
        meta: {
            resource: resource,
            fetch: _dataFetchActions.GET_MANY,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                },
                refresh: true
            }
        }
    };
};

var CRUD_GET_MATCHING = exports.CRUD_GET_MATCHING = 'RA/CRUD_GET_MATCHING';
var CRUD_GET_MATCHING_LOADING = exports.CRUD_GET_MATCHING_LOADING = 'RA/CRUD_GET_MATCHING_LOADING';
var CRUD_GET_MATCHING_FAILURE = exports.CRUD_GET_MATCHING_FAILURE = 'RA/CRUD_GET_MATCHING_FAILURE';
var CRUD_GET_MATCHING_SUCCESS = exports.CRUD_GET_MATCHING_SUCCESS = 'RA/CRUD_GET_MATCHING_SUCCESS';

var crudGetMatching = exports.crudGetMatching = function crudGetMatching(reference, relatedTo, pagination, sort, filter) {
    return {
        type: CRUD_GET_MATCHING,
        payload: { pagination: pagination, sort: sort, filter: filter },
        meta: {
            resource: reference,
            relatedTo: relatedTo,
            fetch: _dataFetchActions.GET_LIST,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                },
                refresh: true
            }
        }
    };
};

var CRUD_GET_MANY_REFERENCE = exports.CRUD_GET_MANY_REFERENCE = 'RA/CRUD_GET_MANY_REFERENCE';
var CRUD_GET_MANY_REFERENCE_LOADING = exports.CRUD_GET_MANY_REFERENCE_LOADING = 'RA/CRUD_GET_MANY_REFERENCE_LOADING';
var CRUD_GET_MANY_REFERENCE_FAILURE = exports.CRUD_GET_MANY_REFERENCE_FAILURE = 'RA/CRUD_GET_MANY_REFERENCE_FAILURE';
var CRUD_GET_MANY_REFERENCE_SUCCESS = exports.CRUD_GET_MANY_REFERENCE_SUCCESS = 'RA/CRUD_GET_MANY_REFERENCE_SUCCESS';

var crudGetManyReference = exports.crudGetManyReference = function crudGetManyReference(reference, target, id, relatedTo, pagination, sort, filter, source) {
    return {
        type: CRUD_GET_MANY_REFERENCE,
        payload: { target: target, id: id, pagination: pagination, sort: sort, filter: filter, source: source },
        meta: {
            resource: reference,
            relatedTo: relatedTo,
            fetch: _dataFetchActions.GET_MANY_REFERENCE,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning'
                },
                refresh: true
            }
        }
    };
};