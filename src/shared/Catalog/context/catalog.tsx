import React, { ReactNode } from 'react';
import { CatalogReducerAction, CatalogReducer, CatalogContent } from '@shared/Catalog';

type CatalogProviderProps = {
  children: ReactNode
}
type AdultSizes = 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG' | '2XG' | '3XG' | '4XG'
type ChildSize = '2' | '4' | '6' | '8' | '10' | '12' |'14' | '16'

const femaleCatalog:[AdultSizes, number][] = [
  ['PP', 0],
  ['P', 0],
  ['M', 0],
  ['G', 0],
  ['GG', 0],
  ['XG', 0],
  ['2XG', 0],
  ['3XG', 0],
  ['4XG', 0],
];
const maleCatalog:[AdultSizes, number][] = [
  ['PP', 0],
  ['P', 0],
  ['M', 0],
  ['G', 0],
  ['GG', 0],
  ['XG', 0],
  ['2XG', 0],
  ['3XG', 0],
  ['4XG', 0],
];
const childCatalog:[ChildSize, number][] = [
  ['2', 0],
  ['4', 0],
  ['6', 0],
  ['8', 0],
  ['10', 0],
  ['12', 0],
  ['14', 0],
  ['16', 0],
];

const catalogContext = React.createContext<{
  dispatch: React.Dispatch<CatalogReducerAction>
  state: CatalogContent
}>(null);
export function CatalogProvider({ children }: CatalogProviderProps) {
  const { dispatch, state } = CatalogReducer();
  return (
    <catalogContext.Provider value={{
      dispatch,
      state
    }}>
      { children }
    </catalogContext.Provider>
  );
}

const catalogActionContext = React.createContext<React.Dispatch<CatalogReducerAction>>(null);
export function CatalogActionProvider({ children }: CatalogProviderProps) {
  const { dispatch } = CatalogReducer();
  return (
    <catalogActionContext.Provider value={dispatch}>
      { children }
    </catalogActionContext.Provider>
  );
}

const catalogStateContext = React.createContext<CatalogContent>(null);
export function CatalogStateProvider({ children }: CatalogProviderProps) {
  const { state } = CatalogReducer();
  return (
    <catalogStateContext.Provider value={state}>
      { children }
    </catalogStateContext.Provider>
  );
}

export function useCatalog(){
  const catalogContent = React.useContext(catalogContext);

  return catalogContent;
}
export function useCatalogAction(){
  const catalogContent = React.useContext(catalogActionContext);

  return catalogContent;
}
export function useCatalogState(){
  const catalogContent = React.useContext(catalogStateContext);
  
  return catalogContent;
}