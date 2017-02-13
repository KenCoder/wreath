// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  postCustomer,
  postScout,
  postLeads,
  postCustomerLead,
  postProducts
} from '../middleware/isomorphicPost'
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  let firstState =  initialState

  const store = createStore(rootReducer, {appData: firstState}, compose(
    applyMiddleware(postCustomer, postScout, postLeads, postCustomerLead, postProducts),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
