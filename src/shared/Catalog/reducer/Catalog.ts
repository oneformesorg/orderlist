import { useEffect, useReducer } from 'react';
import { CatalogContent, CatalogReducerAction } from '../interfaces';

function reducer(state: CatalogContent, action: CatalogReducerAction): CatalogContent {
  switch (action.type) {
  case 'setCompanyInfos':
    return { 
      ...state, ...action.payload
    };
  case 'setPriceTables':
    return {
      ...state, 
      [action.payload.target]: action.payload.priceTable 
    };
  case 'setPriceUniqueTables':
    return {
      ...state, ...action.payload
    };
  case 'currentInfos':
    action.stateFunction(state);
    return {
      ...state
    };
  case 'cyclingMode':
    return { ...state, isCycling: action.payload };
  case 'addList':
    if(state.list.some(listName => listName === action.payload)){
      return { ...state };
    }
    return { ...state, list: [...state.list, action.payload] };
  case 'deleteList':
    return { ...state, list: state.list.filter((listName) => listName !== action.payload) || [] };
  default:
    throw new Error();
  }
}

const initialCatalog: CatalogContent = {
  list: [],
  companyEmail: '',
  projectName: '',
  isCycling: false,
  priceTableChildish: {
    pants: [0, 0, 0, 0, 0, 0, 0, 0],
    shorts: [0, 0, 0, 0, 0, 0, 0, 0],
    tanktop: [0, 0, 0, 0, 0, 0, 0, 0],
    tshirt: [0, 0, 0, 0, 0, 0, 0, 0],
    tshirtLong: [0, 0, 0, 0, 0, 0, 0, 0],
    vest: [0, 0, 0, 0, 0, 0, 0, 0],
  },
  priceTableFemale: {
    pants: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    shorts: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    tanktop: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    tshirt: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    tshirtLong: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    vest: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  priceTableMale: {
    pants: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    shorts: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    tanktop: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    tshirt: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    tshirtLong: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    vest: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  priceTableUnique: {
    socks: [0]
  },
  cyclingPriceTableFemale: {
    pants: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    shorts: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    tshirt: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    tshirtLong: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  cyclingPriceTableMale: {
    pants: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    shorts: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    tshirt: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    tshirtLong: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  cyclingPriceTableChildish: {
    pants: [0, 0, 0, 0, 0, 0, 0, 0],
    shorts: [0, 0, 0, 0, 0, 0, 0, 0],
    tshirt: [0, 0, 0, 0, 0, 0, 0, 0],
    tshirtLong: [0, 0, 0, 0, 0, 0, 0, 0]
  }
};

export function CatalogReducer() {
  const [state, dispatch] = useReducer(reducer, initialCatalog);
  useEffect(() => {
    const catalog = localStorage.getItem('@orderlist/catalog');
    if(catalog){
      dispatch({ type: 'setCompanyInfos', payload: JSON.parse(catalog) as unknown as CatalogContent });
    }
  }, []);
  useEffect(() => {
    const catalog = localStorage.getItem('@orderlist/catalog');
    if(catalog){
      localStorage.setItem('@orderlist/catalog', JSON.stringify(state));
    }
  }, [state]);

  return { state, dispatch };
}