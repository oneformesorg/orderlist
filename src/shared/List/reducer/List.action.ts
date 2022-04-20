import { ListReducerType } from '../interfaces';

export const listActionReducer:ListReducerType = (state, { type, payload }) => {
  switch (type) {
  case 'addItem':
    return { ...state, items: [...state.items, payload] };
  case 'deleteItem':
    return {
      ...state, listsArray: state.items.filter(({ id }) => id !== payload.id)
    };
  case 'changeList':
    return {
      ...state, listsArray: state.items.map((item) => {
        if(item.id === payload.id) return { ...item, list: payload.list };
        return item;
      })
    };
  case 'deleteList':
    return { 
      items: state.items.map(({ list, ...item }) => {
        if(list === payload) return { ...item, list: '' };
        return { ...item, list };
      }),
      lists: state.lists.filter(list => list !== payload)
    };
  case 'addList':
    if(state.lists.some(listName => listName === payload)){
      return { ...state }; 
    }
    return { ...state, lists: [...state.lists, payload] };
  default:
    return state;
  }
};

