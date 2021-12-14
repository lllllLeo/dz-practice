import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: null };

const selectedIdSlice = createSlice({
  name: 'selectedId',
  initialState,
  reducers: {
    setSelectedId(state, action) {
      state.id = action.payload;
    },
  },
});

export const selectedIdActions = selectedIdSlice.actions;

export default selectedIdSlice.reducer;
