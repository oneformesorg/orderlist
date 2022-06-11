import { generateId } from '@shared/utils/generateId';
const sizesForTranslate: string[] = [
  'PP',
  'P',
  'M',
  'G',
  'GG',
  'XG',
  '2XG',
  '3XG',
  '4XG',
  '2A',
  '4A',
  '6A',
  '8A',
  '10A',
  '12A',
  '14A',
  '16A',
];

function verifySizeForTranslation(dirtySize: string) {
  const size = dirtySize.trim();
  const lang = sizesForTranslate.find(size => dirtySize === size);
  if(!lang)throw new Error(`"${size}" is not valid size`);
  return lang;
}

function createClothList(clothes: [string, boolean][], size=''){
  return clothes.reduce((prev, [clothName, isSelected]) => {
    if(clothName === 'socks'){
      return {
        ...prev,
        [clothName]: {
          size: '', 
          quantity: isSelected ? 1 : 0
        }
      };
    }
    
    return {
      ...prev,
      [clothName]: {
        size: isSelected ? verifySizeForTranslation(size.toUpperCase()) : '', 
        quantity: isSelected ? 1 : 0
      }
    };
  }, {});
}

/**
 * This functions translates textArea string for list items
 * Combinations:
 * 
 * [name, number, size]
 * 
 * [name, size]
 * 
 * [number,size]
 * 
 * [size]
 * @param text textArea content
 */
export function sanitizeText(text: string, clothes: [string, boolean][], isCycling: boolean, gender: string, listItem: string){
  const queryArray = text.split('\n').map((query) => {
    const sanitizedQuery = query.split(/,|-/); 
    if(sanitizedQuery.length > 3) throw new Error('sanitizeText, query out of range!');
    return sanitizedQuery;
  });

  const list = queryArray.map(query => {
    if(query.length === 1){
      const [size] = query;
      const clothesList = createClothList(clothes, size);
      return {
        gender,
        name: '',
        number: '',
        isCycling,
        id: generateId(),
        list: listItem,
        clothes: clothesList
      };
    }
    if(query.length === 2) {
      if(isNaN(Number(query[0]))){
        const [name, size] = query;
        const clothesList = createClothList(clothes, size);
        return {
          gender,
          name: name,
          number: '',
          isCycling,
          id: generateId(),
          list: listItem,
          clothes: clothesList
        };
      }

      const [number, size] = query;
      const clothesList = createClothList(clothes, size);
      return {
        gender,
        name: '',
        number: number,
        isCycling,
        id: generateId(),
        list: listItem,
        clothes: clothesList
      };

    }

    const [name, number, size] = query;
    const clothesList = createClothList(clothes, size);
    return {
      gender,
      name: name,
      number: number,
      isCycling,
      id: generateId(),
      list: listItem,
      clothes: clothesList
    };
  });
  return list;
}