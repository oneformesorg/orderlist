import { useReducer } from 'react';
import { ListItem } from '../interfaces';
import { listActionReducer } from './List.action';

export function ListReducer() {
  const [state, dispatch] = useReducer(listActionReducer, {
    lists: ['default'],
    items: [] as Array<ListItem>
  });

  return { state, dispatch };
}