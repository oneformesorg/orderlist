import { useEffect, useReducer } from 'react';
import { ListItem } from '../interfaces';
import { listActionReducer } from './List.action';

export function ListReducer() {
  const [state, dispatch] = useReducer(listActionReducer, {
    items: [] as Array<ListItem>
  });
  useEffect(() => {
    const list = localStorage.getItem('@orderlist/list');
    if(list){
      dispatch({ type: 'addItems', payload: JSON.parse(list) as unknown as ListItem[] });
    }
  }, []);
  useEffect(() => {
    if(JSON.stringify(state) !== JSON.stringify({ items: [] })){
      localStorage.setItem('@orderlist/list', JSON.stringify(state.items));
    }
  }, [state]);

  return { state, dispatch };
}