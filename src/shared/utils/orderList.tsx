import { ListItem } from '@shared/List';

const sizeListForHighToLow = {
  'PP': 0, 
  'P': 1, 
  'M': 2, 
  'G': 3, 
  'GG': 4, 
  'XG': 5, 
  '2XG': 6, 
  '3XG': 7, 
  '4XG': 8, 
  '2A': 9, 
  '4A': 10, 
  '6A': 11, 
  '8A': 12, 
  '10A': 13, 
  '12A': 14, 
  '14A': 15, 
  '16A': 16,
  'empty': -999
};

const sizeListForLowToHigh = {
  'PP': 0, 
  'P': 1, 
  'M': 2, 
  'G': 3, 
  'GG': 4, 
  'XG': 5, 
  '2XG': 6, 
  '3XG': 7, 
  '4XG': 8, 
  '2A': 9, 
  '4A': 10, 
  '6A': 11, 
  '8A': 12, 
  '10A': 13, 
  '12A': 14, 
  '14A': 15, 
  '16A': 16,
  'empty': 100
};

export type OrderOptions = 'LowToHigh' | 'HighToLow'
type orderListFunction = (
  type: OrderOptions, 
  listItems: ListItem[],
  clotheSelected: string
) => ListItem[]

export const orderList:orderListFunction = (orderType, listItems, clotheSelected) => {
  if(orderType === 'LowToHigh') {
    const orderedList = listItems.sort((a,b) => (
      sizeListForLowToHigh[a.clothes[clotheSelected].size || 'empty'] - 
      sizeListForLowToHigh[b.clothes[clotheSelected].size || 'empty']
    ));
    
    return orderedList; 
  }
  const orderedList = listItems.sort((a,b) => (
    sizeListForHighToLow[b.clothes[clotheSelected].size || 'empty'] - 
    sizeListForHighToLow[a.clothes[clotheSelected].size || 'empty']
  ));
  
  return orderedList;
};