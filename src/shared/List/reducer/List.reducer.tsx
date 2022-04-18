import { useReducer } from 'react';
import { listAction } from './List.action';

export function ListReducer() {
  const [state, dispatch] = useReducer(listAction, []);

  return { state, dispatch };
}