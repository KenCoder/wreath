export default {
  appData: {

    loading: false,
    customerPost: {
      isWaiting: false
    },
    scoutPost: {
      isWaiting: false,
      requestingLeads: false
    },
    sheetPost: {
      isWaiting: false
    },

    newUserData: {
      name: ''
    },

    lead: {scout: -1, cust: ''},
    scoutList: [{name: "Duncan Vogel", id: 1, years: {'2016': 1}}],
    types: {'Small': 20.00, 'Medium': 40.00},
    pTypes: ['Paid?', 'Delivered?'],
    newScout: {name: 'New Scout Name', sales: {}},
    visible: 'hidden',
    newCustomer: {name: 'New Customer Name', products: [{type: 'Small', num: 0}, {type: 'Medium', num: 0}], properties: {}},
    superuser: false,
    username: 'Duncan Vogel',
    year: 2016,
    scout_id: 1,
    sheets: {
      0: {sales: {}},
      1: {sales:
            {'Jane Smith': {products: [{type: 'Small', num: 3}, {type: 'Medium', num: 2}], properties: {'Paid?': true, 'Delivered?': false}},
              'John Smith': {products: [{type: 'Small', num: 8}, {type: 'Medium', num: 9}], properties: {}}}}
    },
    scouts: {
      'Duncan Vogel': {sales:
          {'Jane Smith': {products: [{type: 'Small', num: 3}, {type: 'Medium', num: 2}], properties: {'Paid?': true, 'Delivered?': false}},
            'John Smith': {products: [{type: 'Small', num: 8}, {type: 'Medium', num: 9}], properties: {}}}},
      'default': {sales: {}}
    },
    customers: [{}],
    customerFields: ['Customer Name', 'Phone Number', 'Active?', 'Address', 'Email'],
    newStaticCustomer: {'Customer Name': '', 'Phone Number': '', 'Active?': false, 'Address': '', 'Email': ''},
    newProduct: {name: '', cost: ''},
    productsToRemove: []
  }
};
