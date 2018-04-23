'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var CRUD_CHANGE_LIST_PARAMS = exports.CRUD_CHANGE_LIST_PARAMS = 'RA/CRUD_CHANGE_LIST_PARAMS';
var SET_LIST_SELECTED_IDS = exports.SET_LIST_SELECTED_IDS = 'RA/SET_LIST_SELECTED_IDS';
var TOGGLE_LIST_ITEM = exports.TOGGLE_LIST_ITEM = 'RA/TOGGLE_LIST_ITEM';

var changeListParams = exports.changeListParams = function changeListParams(resource, params) {
    return {
        type: CRUD_CHANGE_LIST_PARAMS,
        payload: params,
        meta: { resource: resource }
    };
};

var setListSelectedIds = exports.setListSelectedIds = function setListSelectedIds(resource, ids) {
    return {
        type: SET_LIST_SELECTED_IDS,
        payload: ids,
        meta: { resource: resource }
    };
};

var toggleListItem = exports.toggleListItem = function toggleListItem(resource, id) {
    return {
        type: TOGGLE_LIST_ITEM,
        payload: id,
        meta: { resource: resource }
    };
};