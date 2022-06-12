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
  case 'setCompany':
    return action.payload;
  case 'setSizeList':
    return {
      ...state, 
      sizeList: {
        ...state.sizeList, 
        [action.payload.target]: action.payload.sizeList
      }
    };
  default:
    throw new Error('Invalid action type');
  }
}

const initialCatalog: CatalogContent = {
  list: [],
  companyEmail: '',
  whatsappContact: '',
  projectName: '',
  isCycling: false,
  sizeList: {
    childish: {
      '2A': '2A', 
      '4A': '4A', 
      '6A': '6A', 
      '8A': '8A', 
      '10A': '10A', 
      '12A': '12A',
      '14A': '14A', 
      '16A': '16A'
    },
    female: {
      'PP': 'PP', 
      'P': 'P', 
      'M': 'M', 
      'G': 'G', 
      'GG': 'GG', 
      'XG': 'XG', 
      '2XG': '2XG', 
      '3XG': '3XG', 
      '4XG': '4XG'
    },
    male: {
      'PP': 'PP', 
      'P': 'P', 
      'M': 'M', 
      'G': 'G', 
      'GG': 'GG', 
      'XG': 'XG', 
      '2XG': '2XG', 
      '3XG': '3XG', 
      '4XG': '4XG'
    },
  },
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
    if(catalog && catalog !== JSON.stringify(initialCatalog)){
      dispatch({ type: 'setCompany', payload: JSON.parse(catalog) as unknown as CatalogContent });
    }
  }, []);
  useEffect(() => {
    const catalog = localStorage.getItem('@orderlist/catalog');
    if(
      catalog !== JSON.stringify(state) || JSON.stringify(state) !== JSON.stringify(initialCatalog) 
    ){
      localStorage.setItem('@orderlist/catalog', JSON.stringify(state));
    }
  }, [state]);

  return { state, dispatch };
}