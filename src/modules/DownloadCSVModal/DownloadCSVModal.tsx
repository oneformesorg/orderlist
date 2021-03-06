import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useRef } from 'react';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { CSVFileNameModal, CSVModalRef } from './CSVFileNameModal';
import { orderList } from '@shared/utils/orderList';

const timestampForTitle = (locale: string) => (
  new Intl.DateTimeFormat(locale, { 
    dateStyle: 'short',
    timeStyle: 'short' 
  }).format(new Date)
);

export function DownloadCSVModal() {
  const { t, i18n } = useTranslation();
  const { state: listState } = useList();
  const catalogState = useCatalogState();
  const modalRef = useRef<CSVModalRef>(null);

  return (
    <>
      <button
        className='btn btn-secondary btn-sm d-flex align-items-center gap-2'
        style={{
          zIndex: '2'
        }}
        onClick={() => modalRef.current.handleOpen()}
      >
        <FontAwesomeIcon icon={faFileCsv} />
        <span className='ml-1 d-none d-md-inline'>
          {t('DOWNLOAD')}
        </span>
      </button>
      <CSVFileNameModal 
        ref={modalRef}
        onSubmit={(name, orderBy, orderType) => {
          if(orderBy){
            const orderedList = orderList(orderType || 'INCREASING', listState.items, orderBy);
            import('@shared/csv/csvCreate')
              .then(mod => mod.createCSV({ items: orderedList }, catalogState, t, `${name} ${timestampForTitle(i18n.language)}`));
            return; 
          }
          import('@shared/csv/csvCreate')
            .then(mod => mod.createCSV(listState, catalogState, t, `${name} ${timestampForTitle(i18n.language)}`));
        }}
      />
    </>
  );
}
