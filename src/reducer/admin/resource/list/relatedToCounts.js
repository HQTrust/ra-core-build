import _ from 'lodash'

import {
    CRUD_CREATE_SUCCESS,
    CRUD_DELETE_SUCCESS,
    CRUD_GET_MANY_REFERENCE_SUCCESS,
    CRUD_GET_ONE_SUCCESS,
    CRUD_GET_LIST_SUCCESS,
    CRUD_DELETE_OPTIMISTIC,
    CRUD_DELETE_MANY_OPTIMISTIC,
} from '../../../../actions/dataActions';
import { metaMatchesResource } from '../index'
import { nameRelatedTo, parseNameRelatedTo } from '../../references/oneToMany.js'

export default resource => (previousState = {}, { type, payload, meta }) => {
  if (
    meta === undefined ||
    meta.relatedTo === undefined ||
    !metaMatchesResource(meta, resource) ||
    (type !== CRUD_GET_LIST_SUCCESS && type !== CRUD_GET_MANY_REFERENCE_SUCCESS)
  ) {
    return previousState;
  }

  const {
    reference,
    id,
    resource: relatedResource,
    target,
    filter
  } = parseNameRelatedTo(meta.relatedTo)
  const { pagination, sort, ...relevantFilter } = filter
  const filterSortedByKey = _(relevantFilter).toPairs().sortBy(0).fromPairs().value()

  const relatedTo = nameRelatedTo(
    reference,
    id,
    relatedResource,
    target,
    filterSortedByKey
  )

  switch(type) {
    case CRUD_GET_LIST_SUCCESS:
    case CRUD_GET_MANY_REFERENCE_SUCCESS:
      return _.isNumber(payload.total) ? { ...previousState, [relatedTo]: payload.total } : previousState;
    default:
      return previousState;
  }
};
