import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useList } from '@shared/List';
import { ListItem, ListState } from '@shared/List/interfaces';
import { useTranslation } from 'next-i18next';
import React from 'react';
import JsZip from 'jszip';
import { useCatalogState } from '@shared/Catalog/context/catalog';

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

export function DownloadCSVModal() {
  const { t } = useTranslation();
  const { state: listState } = useList();
  const catalogState = useCatalogState();
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
  
  function sanitizeCSV(list: ListItem[]){
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
          return prev += `${curr},`;
        },
        `${csvHeader.join(',')}\n`
      );
  }
  const createCSV = (list: ListState) => {

    const listItems = catalogState.list.map((listName) => {
      return [listName, list.items.filter(({ list }) => listName === list)];
    });
    const defaultList = list.items.filter(({ list }) => !list);

    const jsZip = new JsZip();
    const csvFolder = jsZip.folder('csv');

    const defaultCSVSanitize = sanitizeCSV(defaultList);
    csvFolder.file('list.csv', `${defaultCSVSanitize}`);
    listItems.forEach(([key, list]) => {
      csvFolder.file(`${key}.csv`, `${sanitizeCSV(list as ListItem[])}`);
    });

    jsZip.generateAsync({ type:'base64' })
      .then(function(content) {
        window.location.href = 'data:application/zip;base64,' + content;
      });
  };
  return (
    <button 
      className='btn btn-success btn-sm d-flex align-items-center gap-2'
      onClick={() => createCSV(listState)}
    >
      <FontAwesomeIcon icon={faFileCsv} />
      <span className='ml-1 d-none d-md-inline'>
        {t('DOWNLOAD')}
      </span>
    </button>
  );
}
