import { CatalogContent } from '@shared/Catalog';
import { ListItem } from '@shared/List';
import { ListState } from '@shared/List/interfaces';
import { TFunction } from 'next-i18next';
import JsZip from 'jszip';

const clothingCSV = {
  'tshirt': 'CSVID_TSHIRT', 
  'tshirtLong': 'CSVID_TSHIRTLONG',
  'shorts': 'CSVID_SHORTS',
  'pants': 'CSVID_PANTS', 
  'tanktop' : 'CSVID_TANKTOP', 
  'vest': 'CSVID_VEST', 
  'socks': 'CSVID_SOCKS'
};
const csvGender = {
  'CHILDISH': 'c',
  'MALE': 'MA',
  'FEMALE': 'FE'
};


function sanitizeCSV(list: ListItem[], t: TFunction){
  const csvHeader = [
    t('CSVID_GENDER'),
    t('CSVID_NAME'),
    t('CSVID_NUMBER'),
    t('CSVID_TSHIRT'),
    t('CSVID_TSHIRTLONG'),
    t('CSVID_SHORTS'),
    t('CSVID_PANTS'),
    t('CSVID_TANKTOP'),
    t('CSVID_VEST'),
    t('CSVID_SOCKS')
  ];
  const clothArr = ['tshirt', 'tshirtLong', 'shorts', 'pants', 'tanktop', 'vest', 'socks'];
  


  return list.map(({ gender, name, number, clothes }) => {
    const clothings = clothArr.map((currCloth) => {
      if(currCloth === 'socks') return `${t(clothingCSV[currCloth])}=${clothes[currCloth].quantity || ''}`;
      
      if(clothes[currCloth].quantity === 0) return `${t(clothingCSV[currCloth])}=`;
      
      return `${t(clothingCSV[currCloth])}=${clothes[currCloth].quantity || ''}-${t(clothes[currCloth].size)}`;
    });
    return [csvGender[gender], name, number, ...clothings];
  })
    .map((item) => item.join(','))
    .reduce(
      (prev, curr, i) => {
        if(i === (list.length - 1)){
          return prev += `${curr}`;
        }
        return prev += `${curr}\n`;
      },
      `${csvHeader.join(',')}\n`
    );
}

type CSVTypeOutput = 'DOWNLOAD' | 'BASE64'
export const createCSV = (
  list: ListState,
  catalogState: CatalogContent,
  t: TFunction,
  title: string,
  outputType:CSVTypeOutput = 'DOWNLOAD'
) => {
  const listItems = catalogState.list.map((listName) => {
    return [listName, list.items.filter(({ list }) => listName === list)];
  });
  const defaultList = list.items.filter(({ list }) => !list);

  const jsZip = new JsZip();
  const csvFolder = jsZip.folder('csv');

  const defaultCSVSanitize = sanitizeCSV(defaultList, t);
  if(defaultList.length > 0){
    csvFolder.file('list.csv', `${defaultCSVSanitize}`);
  }
  listItems.forEach(([key, list]) => {
    if(list.length > 0){
      csvFolder.file(`${key}.csv`, `${sanitizeCSV(list as ListItem[], t)}`);
    }
  });

  return jsZip.generateAsync({ type:'base64' })
    .then(function(content) {
      if(outputType === 'BASE64'){
        return content;
      }
      const anchor = document.createElement('a');
      anchor.href = 'data:application/zip;base64,' + content;
      anchor.download = `${title}.zip`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });
};