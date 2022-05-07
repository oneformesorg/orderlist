import { ListReducerType } from '../interfaces';

export const listActionReducer:ListReducerType = (state, { type, payload }) => {
  switch (type) {
  case 'addItem':
    return { ...state, items: [...state.items, payload] };
  case 'deleteItem':
    return {
      ...state, items: state.items.filter(({ id }) => id !== payload)
    };
  case 'changeList':
    return {
      ...state, listsArray: state.items.map((item) => {
        if(item.id === payload.id) return { ...item, list: payload.list };
        return item;
      })
    };
  case 'deleteMultipleItems':
    return { ...state, items: payload.reduce((prev, curr) => {
      return prev.filter(({ id }) => id !== curr);
    }, state.items) };
  case 'editItem':
    return { ...state, items: state.items.map((current) => {
      if(current.id === payload.id){
        return { id: current.id, ...payload.listItem };
      }
      return current;
    }) };
  case 'addItems':
    return { ...state, items: [...state.items, ...payload] };
  case 'clearList':
    return {
      ...state, items: state.items.filter(
        ({ list }) => list !== (payload ? payload : '')
      )  
    };
  default:
    return state;
  }
};

