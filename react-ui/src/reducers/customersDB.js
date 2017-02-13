/**
 * Created by Duncan on 7/29/2016.
 */
import * as actionTypes from '../constants/actionTypes';

import objectAssign from 'object-assign';
import initialState from './initialState';
import helperFunctions from '../utils/helperFunctions'

function customersDB (state = helperFunctions.copy(initialState.appData.customerFetch), action) {
  switch (action.type) {

    case actionTypes.REQUEST_CUSTOMERS:
      return objectAssign({}, state, {
        isFetching: true
      })

    case actionTypes.RECEIVE_CUSTOMERS:
      return objectAssign({}, state, {
        isFetching: false,
        items: action.customers,
        lastUpdated: action.receivedAt
    })

    default:
      return state
  }
}

export default function customers (state = { }, action) {
  switch (action.type) {
    case actionTypes.REQUEST_CUSTOMERS:
    case actionTypes.RECEIVE_CUSTOMERS:
      return objectAssign({}, state, {
        customers: customersDB(state.customerFetch)
      })
  }
}
