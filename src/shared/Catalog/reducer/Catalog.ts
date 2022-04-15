import { useReducer } from 'react';
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
  default:
    throw new Error();
  }
}

const initialCatalog: CatalogContent = {
  companyEmail: '',
  projectName: '',
  priceTableChildish: {
    pants: [0,0,0,0,0,0,0,0],
    shorts: [0,0,0,0,0,0,0,0],
    tanktop: [0,0,0,0,0,0,0,0],
    tshirt: [0,0,0,0,0,0,0,0],
    tshirtLong: [0,0,0,0,0,0,0,0],
    vest: [0,0,0,0,0,0,0,0],
  },
  priceTableFemale: {
    pants: [0,0,0,0,0,0,0,0,0],
    shorts: [0,0,0,0,0,0,0,0,0],
    tanktop: [0,0,0,0,0,0,0,0,0],
    tshirt: [0,0,0,0,0,0,0,0,0],
    tshirtLong: [0,0,0,0,0,0,0,0,0],
    vest: [0,0,0,0,0,0,0,0,0],
  },
  priceTableMale: {
    pants: [0,0,0,0,0,0,0,0,0],
    shorts: [0,0,0,0,0,0,0,0,0],
    tanktop: [0,0,0,0,0,0,0,0,0],
    tshirt: [0,0,0,0,0,0,0,0,0],
    tshirtLong: [0,0,0,0,0,0,0,0,0],
    vest: [0,0,0,0,0,0,0,0,0],
  },
  priceTableUnique: {
    socks: [0]
  }
};

export function CatalogReducer() {
  const [state, dispatch] = useReducer(reducer, initialCatalog);
  return { state, dispatch };
}