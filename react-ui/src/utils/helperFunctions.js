/**
 * Created by Duncan on 7/22/2016.
 */
import objectAssign from 'object-assign';
import AuthService from '../utils/AuthService'

export default class helperFunctions {

  static findUses (state, name) {
    let result = 0
    for (let i = 0; i < Object.keys(state.scouts).length; i++){
      for (let x = 0; x < Object.keys(state.scouts[Object.keys(state.scouts)[i]].sales).length; x++){
        if (Object.keys(state.scouts[Object.keys(state.scouts)[i]].sales)[x] === name) {
          result++
        }
      }
    }
    return result
  }

  static copy (obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    let temp = obj.constructor(); // give temp the original obj's constructor
    for (let key in obj) {
      temp[key] = this.copy(obj[key]);
    }

    return temp;
  }

  static generateInitialProducts (types) {
    return types.map(type => ({type: type, num: 0}))
  }

  static getProduct (products, name) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].type === name){
        return products[i]
      }
    }
    throw new Error("Product " + name + " not found. Valid products are: " + products)
  }

  static updateProduct (products, name, amt) {
    let newProducts = this.copy(products)
    let index
    for (let i = 0; i < products.length; i++) {
      if (products[i].type === name){
        index = i
      }
    }
    if (index)
      newProducts[index] = objectAssign(products[index], {num: amt})
    return newProducts
  }

  static numProduct (scout, type) {
    let total = 0
    Object.keys(scout.sales).map((saleKey) => {
      scout.sales[saleKey].products.map(product =>{
        if (product.type === type) {total += product.num}
      })

    })
    return total
  }

  static customerValue (state, sheetID, custName) {
    let total = 0
    let products = state.sheets[sheetID].sales[custName].products
    products.map(product => {total += (product.num * state.types[product.type] || 0)})
    return total
  }

  static scoutValue (state, sheetID) {
    let total = 0
    Object.keys(state.sheets[sheetID].sales).map(custName => {
      let products = state.sheets[sheetID].sales[custName].products
      products.map(product => {
        total += (product.num * state.types[product.type] || 0)
      })
    })
    return total
  }

  static findCustomer (state, custName) {
    let result = null
    state.customers.map(cust => {
      if (cust['Customer Name'] === custName){
        result = cust
      }
    })
    return result
  }

  static findCustomerByID (state, id) {
    let result = null
    state.customers.map(cust => {
      if (cust._id === id){
        result = cust
      }
    })
    return result
  }

  static findCurrentSheetID (state, username, year) {
    if (!username) return 0
    let id = 0
    const strYear = '' + year
    state.scoutList.map(scout => {
      if (scout.name === username){
        id = scout.years[strYear] || 0
      }
    })
    return id
  }

  static findCurrentScoutID (state) {
    let id = null
    state.scoutList.map(scout => {
      if (scout.name === state.username){
        id = scout.id
      }
    })
    return id || 0
  }

  static lookupScoutByID (state, id) {
    let result = {name: '', id: 0, years: {}, customerIDs: []}
    state.scoutList.map(scout => {
      if (scout.id === id) {
        result = scout
      }
    })
    return result
  }

  static lookupScoutByName (state, name) {
    let result = {name: '', id: 0, years: {}, customerIDs: []}
    state.scoutList.map(scout => {
      if (scout.name === name) {
        result = scout
      }
    })
    return result
  }

  static updateScoutArray (state, id, key, val) {
    let result = state.scoutList
    result.map(scout => {
      if (scout.id === id) {
        scout[key].splice(0, 0, val)
      }
    })
    return result
  }

  static removeLead (state, id, val) {
    let result = state.scoutList
    result.map(scout => {
      if (scout.id === id) {
        for(var i = scout.customerIDs.length - 1; i >= 0; i--) {
          if(scout.customerIDs === val) {
            scout.customerIDs.splice(i, 1);
          }
        }
      }
    })
    return result
  }

  static generateSheetID (state) {
    const ids = Object.keys(state.sheets).map(str => (parseInt(str)))
    return Math.max(...ids) + 1
  }

  static generateScoutID (state) {
    const ids = state.scoutList.map(scout => (parseInt(scout.id)))
    return Math.max(...ids) + 1
  }

  static preStringifySheet (sheet, key) {
    let newSheet = this.copy(sheet)
    Object.keys(newSheet.sales).map(saleKey => {
      let data = newSheet[saleKey]
      delete newSheet[saleKey]
      newSheet[this.encodeStr(saleKey)] = data
    })
    return objectAssign({id: key, sheet: newSheet})
  }

  static postParseSheets (sheets) {
    let result = {}
    result = objectAssign({}, result, {0: {sales: {}}})
    sheets.map(sheet => {
      let newSheet = this.copy(sheet.sheet)
      Object.keys(newSheet.sales).map(saleKey => {
        let data = newSheet[saleKey]
        delete newSheet[saleKey]
        newSheet[this.decodeStr(saleKey)] = data
      })
      result = objectAssign({}, result, {['' + sheet.id]: newSheet})
    })
    return result
  }

  static findUnassignedCustomers (state) {
    let result = []
    state.customers.map(cust => {
      let used = false
      state.scoutList.map(scout => {
        scout.customerIDs.map(id => {
          if (id === cust._id) {
            used = true
          }
        })
      })
      if (used === false) result.splice(0, 0, cust)
    })
    return result
  }

  static getLeads (state, ids) {
    let leads = []
    state.customers.map(cust => {
      ids.map(id => {
        if (cust._id === id){
          leads.splice(0, 0, cust)
        }
      })
    })
    return leads
  }

  static compare (a, b) {
    if (a.toLowerCase() < b.toLowerCase()) return -1
    else if (a.toLowerCase() > b.toLowerCase()) return 1
    else return 0
  }

  static sortByKey (objArray, key) {
    let sortArray = this.copy(objArray)
    let newArray = sortArray.map(element => (element[key]))
    newArray.sort(this.compare)
    let finalArray = newArray.map(element => {
      let innerResult = {}
      objArray.map(obj => {
        if (obj[key] === element) innerResult = obj
      })
      return innerResult
    })
    return finalArray
  }

  static getProp (user, prop, alt) {
    return user[prop] || alt
  }

  static getMetadata (user, prop, alt) {
    if (user['user_metadata']){
      return user['user_metadata'][prop] || alt
    } else {
      return alt
    }
  }

  static getName (user) {
    if (user['user_metadata']){
      if (user['user_metadata'].name) return user['user_metadata'].name
    }
    if (user.name) return user.name
    else return ''
  }

  static validateSheet (state, scoutName, year) {
    const scout = this.lookupScoutByName(state, scoutName)
    if (!scout.years[year]) return false
    else {
      const id = scout.years[year]
      if (state.sheets[id]) {
        return true
      }
    }
    return false
  }

  static encodeStr (str) {
    return encodeURI(str.split(' ').join('+').split('.').join('^p^'))
  }

  static decodeStr (str) {
    return str.split('+').join(' ').split('^p^').join('.')
  }

  static getStats (email, list) {
    let result = {email: email, name: 'Unknown', superuser: false}
    list.map(entry => {
      if (entry.email === email) {console.log(entry); result = entry}
    })
    return result
  }

  static getCustomers (superuser, scout, customers) {
    if (superuser) return customers
    let final = []
    customers.map(cust => {
      scout.customerIDs.map(id => {
        if (id === cust._id){
          final.push(cust)
        }
      })
    })
    return final
  }

  static removeCustomer(customers, custID){
    let result = []
    customers.map(cust => {
      if (cust._id === custID) {
        result.push(cust)
      }
    })
    return result
  }
}
