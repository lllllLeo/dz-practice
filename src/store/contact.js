import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [] };

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContact(state, action) {
      state.items = action.payload;
    },
    addContact(state, action) {
      state.items.unshift(action.payload);
    },
    deleteContact(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const contactActions = contactSlice.actions;

export default contactSlice.reducer;
