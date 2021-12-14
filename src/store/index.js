import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contact';
import selectedIdReducer from './selectedId';

const store = configureStore({
  reducer: { contact: contactReducer, selectedId: selectedIdReducer },
});

export default store;
