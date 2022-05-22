import { GenericClothStructure } from '@shared/List';

type OrderedFunction = {
  clothes: GenericClothStructure[]
}

export function orderedItems({ clothes }: OrderedFunction){
  const items = clothes.reduce((acc, item) => {
    Object.entries(item).forEach(([k, v]) => {
      if (!acc[k]) {
        acc[k] = [];
      }
  
      acc[k].push(v);
    });
  
    return acc;
  }, {});

  const countedItems = Object.entries<{quantity: number, size: string}[]>(items).reduce((acc, [k, v]) => {

    acc[k] = v.reduce((acc, item) => {
      if(!item.quantity){
        return acc;
      }
      if (!acc[item.size] && item.quantity) {
        acc[item.size] = (acc[item.size] || 0) + item.quantity;
        return acc;
      }
  
      acc[item.size] += item.quantity;
  
      return acc;
    }, {});
  
    return acc;
  }, {}); 
  
  return Object.entries(countedItems).filter(([,v]) => JSON.stringify(v) !== '{}');
}
/**
 * 
 const ordenedItems = items.reduce((acc, item) => {
   Object.entries(item).forEach(([k, v]) => {
     if (!acc[k]) {
       acc[k] = [];
     }
 
     acc[k].push(v);
   });
 
   return acc;
 }, {});
 const countedItems = Object.entries(ordenedItems).reduce((acc, [k, v]) => {
   acc[k] = v.reduce((acc, item) => {
     if (!acc[item.size]) {
       acc[item.size] = 0;
     }
 
     acc[item.size] += item.quantity;
 
     return acc;
   }, {});
 
   return acc;
 }, {});
 const listedItems = Object.entries(countedItems).reduce((acc, [k, v]) => {
   acc[k] = Object.entries(v).map(([size, quantity]) => [size, quantity]);
 
   return acc;
 }, {});
 */