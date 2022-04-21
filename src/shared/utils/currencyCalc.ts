import { childSize } from '@config/static';
import { CatalogContent } from '@shared/Catalog';
import { AdultCLothStructure, ChildishClothStructure } from '@shared/List';

export function sanitizeValue(
  catalog: CatalogContent,
  gender:  'MALE' | 'FEMALE' | 'CHILDISH',
  isCycling: boolean,
  clothes: AdultCLothStructure | ChildishClothStructure
){
  const priceCatalog = {
    'MALE': () => isCycling ? catalog.cyclingPriceTableMale : catalog.priceTableMale,
    'FEMALE': () => isCycling ? catalog.cyclingPriceTableFemale : catalog.priceTableFemale,
    'CHILDISH': () => isCycling ? catalog.cyclingPriceTableChildish : catalog.priceTableChildish
  };

  if(gender === 'CHILDISH'){
    const clothesObj = clothes as ChildishClothStructure;
    return Object.entries(clothesObj).reduce((prev, [key, { quantity, size }]) => {
      if(quantity){
        const constSizePos = childSize.reduce((prev, curr, i) => curr === size ? i : 0, 0);
        
        return prev += priceCatalog[gender]()[key][constSizePos] * quantity;
      }
      return prev;
    }, 0);
  }
  const clothesObj = clothes as AdultCLothStructure;
  return Object.entries(clothesObj).reduce((prev, [key, { quantity, size }]) => {
    if(quantity){
      const constSizePos = childSize.reduce((prev, curr, i) => curr === size ? i : 0, 0);
      
      if(key === 'socks'){
        
        return prev += catalog.priceTableUnique.socks[0] * quantity;
      }
      return prev += priceCatalog[gender]()[key][constSizePos] * quantity;
    }
    return prev;
  }, 0);
}
export function currencyConvert(locale: string, currency: 'USD' | 'BRL'){
  return (value: number) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}