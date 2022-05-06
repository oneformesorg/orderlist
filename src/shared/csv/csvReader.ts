import { GenericClothStructure, ListItem } from '@shared/List';
import { generateId } from '@shared/utils/generateId';

const genderCSV = {
  'c': 'CHILDISH',
  'ma': 'MALE',
  'fe': 'FEMALE'
};

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
  ['PP', ['BL-XS', 'BL-XS', 'BL-PP']],
  ['P', ['BL-S', 'BL-S', 'BL-P']],
  ['M', ['BL-M', 'BL-M', 'BL-M']],
  ['G', ['BL-L', 'BL-L', 'BL-G']],
  ['GG', ['BL-XL', 'BL-XL', 'BL-GG']],
  ['XG', ['BL-XXL', 'BL-XXL', 'BL-XG']],
  ['2XG', ['BL-2XL', 'BL-2XL', 'BL-2XG']],
  ['3XG', ['BL-3XL', 'BL-3XL', 'BL-3XG']],
  ['4XG', ['BL-4XL', 'BL-4XL', 'BL-4XG']],
  ['CHILDISH-2A', ['2-3', '2 años', '2 anos']],
  ['CHILDISH-4A', ['4-5', '4 años', '4 anos']],
  ['CHILDISH-6A', ['6-6X', '6 años', '6 anos']],
  ['CHILDISH-8A', ['7-8', '8 años', '8 anos']],
  ['CHILDISH-10A', ['10', '10 años', '10 anos']],
  ['CHILDISH-12A', ['12', '12 años', '12 anos']],
  ['CHILDISH-14A', ['14', '14 años', '14 anos']],
  ['CHILDISH-16A', ['16', '16 años', '16 anos']],
  
];

const translateSizeForSystem = (size: string[] | string) => {
  const sizeNormalized = typeof size === 'string' ? size : size.join('-');
  console.log(size, sizeNormalized);
  const sizeForSystem = sizesForTranslate.filter(([, langs]) => {
    const [en, es, pt] = langs;
    return sizeNormalized === en || sizeNormalized === es || sizeNormalized === pt;
  });

  return sizeForSystem[0][0];
};

/**
 * This function sanitize list based in ORDER OF CSV, warning when edit csv generator!!
 */
const sanitizeClothes = (cloth: string[]): GenericClothStructure => {
  const sanitizedList = cloth.splice(3).map(item => item.split('=')[1]);
  // translateSizeForSystem(sanitizedList[1].split(/-/).splice(1));
  return {
    tshirt: {
      quantity: Number(sanitizedList[0].split(/-/)[0]),
      size: sanitizedList[0].split(/-/)[1] ? translateSizeForSystem(sanitizedList[0].split(/-/).splice(1)) :''
    },
    tshirtLong: {
      quantity: Number(sanitizedList[1].split(/-/)[0]),
      size: sanitizedList[1].split(/-/)[1] ? translateSizeForSystem(sanitizedList[1].split(/-/).splice(1)) :''
    },
    shorts: {
      quantity: Number(sanitizedList[2].split(/-/)[0]),
      size: sanitizedList[2].split(/-/)[1] ? translateSizeForSystem(sanitizedList[2].split(/-/).splice(1)) :''
    },
    pants: {
      quantity: Number(sanitizedList[3].split(/-/)[0]),
      size: sanitizedList[3].split(/-/)[1] ? translateSizeForSystem(sanitizedList[3].split(/-/).splice(1)) :''
    },
    tanktop: {
      quantity: Number(sanitizedList[4].split(/-/)[0]),
      size: sanitizedList[4].split(/-/)[1] ? translateSizeForSystem(sanitizedList[4].split(/-/).splice(1)) :''
    },
    vest: {
      quantity: Number(sanitizedList[5].split(/-/)[0]),
      size: sanitizedList[5].split(/-/)[1] ? translateSizeForSystem(sanitizedList[5].split(/-/).splice(1)) :''
    },
    socks: {
      quantity: Number(sanitizedList[6].split(/-/)[0]),
      size: ''
    }
  };
};

/**
 * This function returns a list array for use in reducer
 */
export function csvReader(
  header: string[],
  items: string[],
  isCycling: boolean,
  list: string,
  catalogList: string[]
): ListItem[]{
  return items.map((row) => {
    const cells = row.split(',');
    return {
      gender: genderCSV[cells[0].toLocaleLowerCase()],
      name: cells[1],
      number: cells[2],
      isCycling,
      id: generateId(),
      list: catalogList.some(name => name === list) ? list : '',
      clothes: sanitizeClothes(cells)
    };
  });
}
