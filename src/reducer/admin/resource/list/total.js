import {
    CRUD_CREATE_SUCCESS,
    CRUD_DELETE_SUCCESS,
    CRUD_GET_MANY_REFERENCE_SUCCESS,
    CRUD_GET_ONE_SUCCESS,
    CRUD_GET_LIST_SUCCESS,
    CRUD_DELETE_OPTIMISTIC,
    CRUD_DELETE_MANY_OPTIMISTIC,
} from '../../../../actions/dataActions';
import isNumber from 'lodash/isNumber'

export default resource => (previousState = 0, { type, payload, meta }) => {
    if (!meta || meta.resource !== resource) {
        return previousState;
    }

    switch(type) {
        case CRUD_GET_ONE_SUCCESS:
            return previousState == 0 ? 1 : previousState;
        case CRUD_GET_LIST_SUCCESS:
            return isNumber(payload.total) ? payload.total : previousState;
        case CRUD_GET_MANY_REFERENCE_SUCCESS:
            return isNumber(payload.total) ? payload.total : previousState;
        case CRUD_CREATE_SUCCESS:
            return previousState + 1;
        case CRUD_DELETE_SUCCESS:
            return previousState - 1;
        case CRUD_DELETE_OPTIMISTIC:
            return previousState - 1;
        case CRUD_DELETE_MANY_OPTIMISTIC:
            return previousState - payload.ids.length;
        default:
            return previousState;
    }
};
