import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useCatalogState } from '@shared/Catalog/context/catalog';

export function DownloadCSVModal() {
  const { t } = useTranslation();
  const { state: listState } = useList();
  const catalogState = useCatalogState();

  return (
    <button 
      className='btn btn-success btn-sm d-flex align-items-center gap-2'
      onClick={() => {
        import('@shared/csv/csvCreate')
          .then(mod => mod.createCSV(listState, catalogState, t));
      }}
    >
      <FontAwesomeIcon icon={faFileCsv} />
      <span className='ml-1 d-none d-md-inline'>
        {t('DOWNLOAD')}
      </span>
    </button>
  );
}
