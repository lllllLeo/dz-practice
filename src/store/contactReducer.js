const initialState = { items: [] };

export const contactReducer = (state = initialState, action) => {
  if (action.type === 'SET_DATA') {
    const contacts = [...action.data];
    return {
      items: contacts,
    };
  }

  if (action.type === 'ADD_DATA') {
    const contacts = [action.data, ...state.items];
    return {
      items: contacts,
    };
  }

  if (action.type === 'DELETE_DATA') {
    const contacts = state.items.filter((item) => item.id !== action.deletedContact.id);
    return {
      items: contacts,
    };
  }

  return state;
};
