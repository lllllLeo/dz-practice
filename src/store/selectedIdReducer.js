const initialState = null;

export const selectedIdReducer = (state = initialState, action) => {
  if (action.type === 'SET_SELECTED_ID') {
    return action.selectedId;
  }
  return state;
};
