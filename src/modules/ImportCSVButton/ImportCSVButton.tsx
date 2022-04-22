import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { csvReader } from '@shared/csv/csvReader';
import { ListItem, useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';

export function ImportCSVButton() {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [csvResult, setCsvResult] = useState('');
  const [csvTitle, setCsvTitle] = useState('');
  const catalogState = useCatalogState();
  const [listItem, setListItem] = useState<ListItem[]>([]);
  const { dispatch: dispatchList } = useList();
  useEffect(() => {
    setListItem(
      csvReader(
        csvResult.split('\n')[0].split(','), 
        csvResult.split('\n').splice(1),
        catalogState.isCycling,
        csvTitle,
        catalogState.list  
      )
    );
  }, [csvResult, csvTitle, catalogState]);
  
  useEffect(() => {
    listItem.map(item => {
      dispatchList({
        type: 'addItem',
        payload: item
      });
    });
  }, [listItem, dispatchList]);

  return (
    <>
      <button 
        onClick={() => inputRef.current.click()}
        className='btn btn-info btn-sm d-flex align-items-center gap-2 text-light'
      >
        <FontAwesomeIcon icon={faDownload} />
        <span className='ml-1 d-none d-md-inline'>
          {t('UPLOAD')}
        </span>
      </button>
      <input 
        onChange={e => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setCsvResult(e.target.result as string);
            reader.abort();
          };
          if(e.target.files){
            setCsvTitle(e.target.files[0].name.replace('.csv', ''));
          }
          reader.readAsText(e.target.files[0]);
        }}
        type="file"
        accept='.csv'
        ref={inputRef}
        hidden
      />
    </>
  );
}
