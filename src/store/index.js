import { createStore, combineReducers } from 'redux';
import { contactReducer } from './contactReducer';
import { selectedIdReducer } from './selectedIdReducer';

const store = createStore(
  combineReducers({ contact: contactReducer, selectedId: selectedIdReducer })
);

export default store;
