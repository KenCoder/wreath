import * as types from '../constants/actionTypes';
// import fetch from 'isomorphic-fetch';

export function changeUsername(settings, fieldName, value) {
  return {type: types.CHANGE_USERNAME, settings, fieldName, value};
}

export function changeYear(value) {
  return {type: types.CHANGE_YEAR, value}
}

export function changeData(name, value) {
  return {type: types.CHANGE_DATA, name, value};
}

export function changeSheetEntry(custName, key, value) {
  return {type: types.CHANGE_SHEET_ENTRY, custName, key, value}
}

export function changeNewUser(name) {
  return {type: types.CHANGE_NEW_USER, name};
}

export function submitNewScout() {
  return {type: types.SUBMIT_NEW_USER}
}

export function addCustomer() {
  return {type: types.ADD_CUSTOMER}
}

export function deleteCustomer(id) {
  return {type: types.DELETE_CUSTOMER, id}
}

export function changeNewCustomer(name) {
  return {type: types.CHANGE_CUSTOMER_NAME, name}
}

export function removeCustomer(key) {
  return {type: types.REMOVE_CUSTOMER, key}
}

export function changeStaticCustomerData(key, name) {
  return {type: types.CHANGE_STATIC_CUSTOMER_DATA, key, name}
}

export function addNewStaticCustomer() {
  return {type: types.ADD_NEW_STATIC_CUSTOMER}
}

export function addNewStaticCustomerLead() {
  return {type: types.ADD_NEW_STATIC_CUSTOMER_LEADS}
}

export function getScoutInfo (name) {
  return {type: types.GET_SCOUT_INFO, name}
}

export function changeCustomerProperty (name, value) {
  return {type: types.CHANGE_CUSTOMER_PROPERTY, name, value}
}

export function addLead (custID, scoutID) {
  return {type: types.ADD_LEAD, custID, scoutID}
}

export function removeLead (custID, scoutID) {
  return {type: types.REMOVE_LEAD, custID, scoutID}
}

/////////////////Products///////////////////////////////////////////////////////

export function receiveProducts(products) {
  return {type: types.RECEIVE_PRODUCTS, products}
}

export function changeProductCost(name, cost) {
  return {type: types.CHANGE_PRODUCT_COST, name, cost}
}

export function removeProduct(name) {
  return {type: types.REMOVE_PRODUCT, name}
}

export function changeNewProductName(name) {
  return {type: types.CHANGE_NEW_PRODUCT_NAME, name}
}

export function changeNewProductCost(name, cost) {
  return {type: types.CHANGE_NEW_PRODUCT_COST, cost}
}

export function pushNewProduct () {
  return {type: types.PUSH_NEW_PRODUCT}
}

/////////////////Asynchronous Customer Actions//////////////////////////////////

export function requestCustomerPost () {
  return {type: types.REQUEST_CUSTOMER_POST}
}

export function customerPostResult (success, error) {
  return {type: types.CUSTOMER_POST_RESULT, success, error}
}

export function resetNewCustomer () {
  return {type: types.RESET_NEW_STATIC_CUSTOMER}
}

export function receiveCustomers (json) {
  return {
    type: types.RECEIVE_CUSTOMERS,
    customers: json,
    receivedAt: Date.now()
  }
}
// /////////////////Asynchronous Scout Actions//////////////////////////////////

export function requestScoutPost () {
  return {type: types.REQUEST_SCOUT_POST}
}

export function scoutPostResult (success, error) {
  return {type: types.SCOUT_POST_RESULT, success, error}
}

export function receiveScouts (json) {
  return {
    type: types.RECEIVE_SCOUT,
    scouts: json,
    receivedAt: Date.now()
  }
}

export function requestLeadPost () {
  return {type: types.REQUEST_LEAD_POST}
}

export function leadPostResult (success, error) {
  return {type: types.LEAD_POST_RESULT, success, error}
}

// /////////////////Asynchronous Sheet Actions//////////////////////////////////

export function requestSheetPost () {
  return {type: types.REQUEST_SHEET_POST}
}

export function sheetPostResult (success, error) {
  return {type: types.SHEET_POST_RESULT, success, error}
}

export function receiveSalesheets (json) {
  return {
    type: types.RECEIVE_SALESHEETS,
    sheets: json,
    receivedAt: Date.now()
  }
}

// /////////////////Asynchronous User Actions//////////////////////////////////
export function receiveUser (json, email) {
  return {
    type: types.RECEIVE_USER,
    name: json.name,
    superuser: json.superuser,
    receivedAt: Date.now()
  }
}

/////////////////////Authentication Actions//////////////////////////////////////

export function populateA0User (user) {
  return {type: types.POPULATE_NEW_USER, user}
}

export function changeA0User (field, val) {
  return {type: types.CHANGE_NEW_USER, field, val}
}


// /////////////////Asynchronous User Actions//////////////////////////////////
export function makeLoading () {
  return {type: types.MAKE_LOADING}
}

export function mount () {
  return {type: types.MOUNT}
}

// export function requestScout (id) {
//   return {type: types.REQUEST_SCOUT, id}
// }
//

//
// export function fetchScout (id) {
//   return dispatch => {
//     dispatch(requestScout(id))
//     return fetch(`powerful-sea-27631.herokuapp.com/customers/subset?ids=${ids}`)
//       .then(response => response.json())
//       .then(json => dispatch(receiveScout(json)))
//   }
// }
//
// function shouldFetchScout (state, id) {
//   const scout = state.scoutList[id]
//   return !scout
//
// }
//
// export function fetchScoutIfNeeded (id) {
//   return (dispatch, getState) => {
//     if (shouldFetchScout(getState(), id)) {
//       return dispatch(fetchScout(id))
//     }
//   }
// }
//


// export function requestSalesheets (scoutId, year) {
//   return {type: types.REQUEST_SALESHEETS, scoutId, year}
// }
//
//
// export function fetchSalesheets (scoutId, year) {
//   return dispatch => {
//     dispatch(requestSalesheets(scoutId, year))
//     return fetch(`powerful-sea-27631.herokuapp.com/customers/subset?scoutId=${scoutId},year=${year}`)
//       .then(response => response.json())
//       .then(json => dispatch(receiveScout(json)))
//   }
// }
//
// function shouldFetchScout (state, id) {
//   const scout = state.scoutList[id]
//   return !scout
//
// }
//
// export function fetchScoutIfNeeded (id) {
//   return (dispatch, getState) => {
//     if (shouldFetchScout(getState(), id)) {
//       return dispatch(fetchScout(id))
//     }
//   }
// }
