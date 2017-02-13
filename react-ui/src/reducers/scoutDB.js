/**
 * Created by Duncan on 7/29/2016.
 */
import * as actionTypes from '../constants/actionTypes';

import objectAssign from 'object-assign';
import initialState from './initialState';
import helperFunctions from '../utils/helperFunctions'

function scoutDB (state = helperFunctions.copy(initialState.appData.scoutFetch), action) {
  switch (action.type) {

    case actionTypes.REQUEST_SCOUT:
      return objectAssign({}, state, {
        isFetching: true
      })

    case actionTypes.RECEIVE_SCOUT:
      return objectAssign({}, state, {
        isFetching: false,
        items: action.scout,
        lastUpdated: action.receivedAt
      })

    default:
      return state
  }
}

export default function scouts (state = { }, action) {
  switch (action.type) {
    case actionTypes.REQUEST_SCOUT:
    case actionTypes.RECEIVE_SCOUT:
      return objectAssign({}, state, {
        scoutList: scoutDB(state.scoutFetch)
      })
  }
}
