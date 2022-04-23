import { generateId } from '@shared/utils/generateId';
const sizesForTranslate: [string, [string, string, string]][] = [
  ['T-PP', ['XS', 'XS', 'PP']],
  ['T-P', ['S', 'S', 'P']],
  ['T-M', ['M', 'M', 'M']],
  ['T-G', ['L', 'L', 'G']],
  ['T-GG', ['XL', 'XL', 'GG']],
  ['T-XG', ['XXL', 'XXL', 'XG']],
  ['T-2XG', ['2XL', '2XL', '2XG']],
  ['T-3XG', ['3XL', '3XL', '3XG']],
  ['T-4XG', ['4XL', '4XL', '4XG']],
  ['T-2A', ['2-3', '2 años', '2 anos']],
  ['T-4A', ['4-5', '4 años', '4 anos']],
  ['T-6A', ['6-6X', '6 años', '6 anos']],
  ['T-8A', ['7-8', '8 años', '8 anos']],
  ['T-10A', ['10', '10 años', '10 anos']],
  ['T-12A', ['12', '12 años', '12 anos']],
  ['T-14A', ['14', '14 años', '14 anos']],
  ['T-16A', ['16', '16 años', '16 anos']],
  
];

function verifySizeForTranslation(dirtySize: string) {
  const size = dirtySize.replace(' ', '');
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
        size: isSelected ? verifySizeForTranslation(size) : '', 
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