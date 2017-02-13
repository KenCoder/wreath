import {createStore} from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

  let firstState = initialState

  const store = createStore(rootReducer, {appData: firstState});

  return store;
}
