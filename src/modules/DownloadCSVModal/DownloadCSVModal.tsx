import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import React from 'react';

export function DownloadCSVModal() {
  const { t } = useTranslation();
  return (
    <button className='btn btn-secondary btn-sm d-flex align-items-center gap-2'>
      <FontAwesomeIcon icon={faFileCsv} />
      <span className='ml-1 d-none d-md-inline'>
        {t('DOWNLOAD')}
      </span>
    </button>
  );
}
