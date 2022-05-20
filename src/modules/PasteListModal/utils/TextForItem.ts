import { generateId } from '@shared/utils/generateId';
const sizesForTranslate: [string, [string, string, string]][] = [
  ['PP', ['XS', 'XS', 'PP']],
  ['P', ['S', 'S', 'P']],
  ['M', ['M', 'M', 'M']],
  ['G', ['L', 'L', 'G']],
  ['GG', ['XL', 'XL', 'GG']],
  ['XG', ['XXL', 'XXL', 'XG']],
  ['2XG', ['2XL', '2XL', '2XG']],
  ['3XG', ['3XL', '3XL', '3XG']],
  ['4XG', ['4XL', '4XL', '4XG']],
  ['2A', ['2-3', '2 años', '2 anos']],
  ['4A', ['4-5', '4 años', '4 anos']],
  ['6A', ['6-6X', '6 años', '6 anos']],
  ['8A', ['7-8', '8 años', '8 anos']],
  ['10A', ['10', '10 años', '10 anos']],
  ['12A', ['12', '12 años', '12 anos']],
  ['14A', ['14', '14 años', '14 anos']],
  ['16A', ['16', '16 años', '16 anos']],
  
];

function verifySizeForTranslation(dirtySize: string) {
  const size = dirtySize.trim();
  const lang = sizesForTranslate.find(([, dirtyLang]) => {
    return size === dirtyLang[0] || size === dirtyLang[1] || size === dirtyLang[2];
  });
  if(!lang)throw new Error(`"${size}" is not valid size`);
  return lang[0];
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
    const sanitizedQuery = query.split(','); 
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