import { createContext, Dispatch, ReactNode, useContext } from 'react';
import { ListReducer } from '../reducer/List.reducer';
import { ListAction, ListState } from '../interfaces';

type Props = {
  children: ReactNode
}

const listContext = createContext<{
  dispatch: Dispatch<ListAction>
  state: ListState
}>(null);
export function ListActionProvider({ children }: Props){
  const { dispatch, state } = ListReducer();
  return(
    <listContext.Provider value={{ dispatch, state }}>
      {children}
    </listContext.Provider>
  );
}

export function useList(){
  const dispatch = useContext(listContext);

  return dispatch;
}