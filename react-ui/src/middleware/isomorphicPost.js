/**
 * Created by Duncan on 8/10/2016.
 */
import * as types from '../constants/actionTypes'
import * as actions from '../actions/appActions'
import fetch from 'isomorphic-fetch'
import helperFunctions from '../utils/helperFunctions'
import { jwt, url } from '../constants/env'

export const postCustomer = store => next => action => {
  if (action.type === types.ADD_NEW_STATIC_CUSTOMER) {
    let result = next(action)
    let form = {}
    store.getState().appData.customerFields.map(field => {
      form = Object.assign({}, form, {[field]: store.getState().appData.newStaticCustomer[field]})
    })
    store.dispatch(actions.requestCustomerPost())
    fetch(url + `/customers`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwt
      }
    })
      .then(response => {
          if (response.status >= 400){
            store.dispatch(actions.customerPostResult(false, new Error("Bad response from server")))
          } else {
            store.dispatch(actions.customerPostResult(true, null))
            fetch(url + `/customers`, {headers: {'Authorization': 'JWT ' + jwt}})
              .then(response => response.json())
              .then(json => store.dispatch(actions.receiveCustomers(json)))
          }
          store.dispatch(actions.resetNewCustomer())
        }
      )


    return result
  } else if (action.type === types.DELETE_CUSTOMER) {
    let result = next(action)
    let form = {id: action.id}
    store.dispatch(actions.makeLoading())
    fetch(url + `/customers`, {
      method: 'DELETE',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwt
      }
    })
      .then(response => {
        if (response.status >= 400){
          store.dispatch(actions.customerPostResult(false, new Error("Bad response from server")))
        } else {
          fetch(url + `/customers`, {headers: {'Authorization': 'JWT ' + jwt}})
            .then(response => response.json())
            .then(json => {
              store.dispatch(actions.receiveCustomers(json))
              store.dispatch(actions.mount())
            })
        }
      })
  }
  else {
    return next(action)
  }
}

export const postCustomerLead = store => next => action => {
  if (action.type === types.ADD_NEW_STATIC_CUSTOMER_LEADS) {
    let result = next(action)
    let cust = {}
    store.getState().appData.customerFields.map(field => {
      cust = Object.assign({}, cust, {[field]: store.getState().appData.newStaticCustomer[field]})
    })
    const scout_id = action.scout_id
    const form = {cust: cust, scout_id: scout_id}

    store.dispatch(actions.makeLoading())

    fetch(url + `/customers/addlead`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwt
      }
    })
      .then(response => {
          if (response.status >= 400){
            store.dispatch(actions.customerPostResult(false, new Error("Bad response from server")))
          } else {
            store.dispatch(actions.customerPostResult(true, null))
            fetch(url + `/customers`, {headers: {'Authorization': 'JWT ' + jwt}})
              .then(response => response.json())
              .then(json => {
                store.dispatch(actions.receiveCustomers(json))
                store.dispatch(actions.mount())
                location.reload()
              })
          }
          store.dispatch(actions.resetNewCustomer())
        }
      )


    return result
  } else {
    return next(action)
  }
}

export const postScout = store => next => action => {
  if (action.type === types.SUBMIT_NEW_USER) {
    const state = store.getState().appData

    const scout_id = helperFunctions.generateScoutID(state)
    const sheet_id = helperFunctions.generateSheetID(state)
    const date = state.year
    let result = next(action)

    let form = {name: helperFunctions.encodeStr(state.newScout.name), id: scout_id, years: {['' + date]: sheet_id}, customerIDs: []}

    fetch(url + `/scouts`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwt
      }
    })
      .then(json => store.dispatch(actions.requestScoutPost()))
      .then(response => {
        if (response.status >= 400) {
          store.dispatch(actions.scoutPostResult(false, new Error("Bad response from server")))
        } else {
          store.dispatch(actions.scoutPostResult(true, null))
          fetch(url + `/scouts`, {headers: {'Authorization': 'JWT ' + jwt}})
            .then(response => response.json())
            .then(json => store.dispatch(actions.receiveScouts(json)))

          form = helperFunctions.preStringifySheet({sales: helperFunctions.copy(state.newScout.sales)}, sheet_id)
          console.log('form: ', form)

          fetch(url + `/sheets`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
              'Content-Type': 'application/json',
              'submitted-by': 'postScout sheet fetch',
              'Authorization': 'JWT ' + jwt
            }
          })
            .then(json => store.dispatch(actions.requestSheetPost()))
            .then(response => {
              if (response.status >= 400){
                store.dispatch(actions.sheetPostResult(false, new Error("Bad response from server")))
              } else {
                store.dispatch(actions.sheetPostResult(true, null))
                fetch(url + `/sheets`, {headers: {'Authorization': 'JWT ' + jwt}})
                  .then(response => response.json())
                  .then(json => store.dispatch(actions.receiveSalesheets(json)))
              }
            })
        }
      })



    return result
  } else {
    return next(action)
  }
}

export const postLeads = store => next => action => {
  if (action.type === types.ADD_LEAD){
    const state = store.getState()

    const id = action.scoutID; const lead = action.custID
    let form = {id: id, lead: lead}
    let result = next(action)

    fetch(url + `/leads`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + jwt
      }
    })
      .then(json => store.dispatch(actions.requestLeadPost()))
      .then(response => {
        if (response.status >= 400){
          store.dispatch(actions.leadPostResult(false, new Error("Bad response from server")))
        } else {
          store.dispatch(actions.leadPostResult(true, null))
          fetch(url + `/scouts`, {headers: {'Authorization': 'JWT ' + jwt}})
            .then(response => response.json())
            .then(json => store.dispatch(actions.receiveScouts(json)))
        }
      })
    return result
  } else if (action.type === types.REMOVE_LEAD) {
    console.log('Trying to delete lead')
    const state = store.getState()

    const id = action.scoutID;
    const lead = action.custID
    let form = {id: id, lead: lead}
    let result = next(action)

    fetch(url + `/leads/remove`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(json => store.dispatch(actions.requestLeadPost()))
      .then(response => {
        if (response.status >= 400) {
          store.dispatch(actions.leadPostResult(false, new Error("Bad response from server")))
        } else {
          console.log('status: ', response.status)
          store.dispatch(actions.leadPostResult(true, null))
          fetch(url + `/scouts`, {headers: {'Authorization': 'JWT ' + jwt}})
            .then(response => response.json())
            .then(json => store.dispatch(actions.receiveScouts(json)))
        }
      })
    return result
  } else {
    return next(action)
  }
}


export const postProducts = store => next => action => {
  if (action.type === types.PUSH_NEW_PRODUCT) {
    let result = next(action)
    const state = store.getState().appData
    const newName = state.newProduct.name
    const newCost = state.newProduct.cost
    let forms = []
    if (newName !== '' && newCost !== '') forms.splice(0, 0, {name: newName, cost: newCost})

    store.dispatch(actions.makeLoading())

    let counter = 0
    forms.map(form => {
      fetch(url + `/products`, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + jwt
        }
      })
        .then(response => {
            if (response.status >= 400){
              console.error('Failed to put on form ' + counter + '\n' + form)
            } else {
              counter += 1
              if (counter === forms.length){
                fetch(url + `/products`, {headers: {'Authorization': 'JWT ' + jwt}})
                  .then(response => response.json())
                  .then(json => {
                    store.dispatch(actions.receiveProducts(json))
                    store.dispatch(actions.mount())
                  })
              }
            }
          }
        )
    })


    return result
  } else if (action.type === types.REMOVE_PRODUCT) {
    let result = next(action)
    const state = store.getState()

    const name = action.name
    const form = {name: name}

    store.dispatch(actions.makeLoading())

    fetch(url + `/products`, {
      method: 'DELETE',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status >= 400) {
          console.error('Failed to delete product')
        } else {
          fetch(url + `/products`, {headers: {'Authorization': 'JWT ' + jwt}})
            .then(response => response.json())
            .then(json => {
              store.dispatch(actions.receiveProducts(json))
              store.dispatch(actions.mount())
            })
        }
      })
    return result
  } else {
    return next(action)
  }
}

// export const postLogin = store => next => action => {
//   if (action.type === types.LOGIN_ATTEMPT) {
//     const state = store.getState()
//
//     const creds = action.creds
//     let form = {username: creds.username, password: creds.password}
//     let result = next(action)
//
//     fetch(`http://powerful-sea-27631.herokuapp.com/leads`)
//   }
// }
