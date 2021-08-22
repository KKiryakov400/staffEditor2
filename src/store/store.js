import { createStore } from 'redux';
import { reducer } from './reducer.js';
import data from '../employees.json';



var store = createStore(reducer);

store.dispatch({
  type: "ADD_DATA",
  state: {staff: data}
});

export default store;
