import { ListReducerType } from '../interfaces';

export const listActionReducer:ListReducerType = (state, { type, payload }) => {
  switch (type) {
  case 'add':
    return { ...state, items: [...state.items, payload] };
  case 'delete':
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
  default:
    return state;
  }
};

