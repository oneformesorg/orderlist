import { ListReducerActions } from '../interfaces';

export const listAction:ListReducerActions = (state, { type, payload }) => {
  switch (type) {
  case 'add':
    return [...state, payload ];
  case 'delete':
    return state.filter(({ id }) => id !== payload.id);
  default:
    return state;
  }
};

