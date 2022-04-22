import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import React from 'react';

export function ImportCSVButton() {
  const { t } = useTranslation();
  return (
    <button className='btn btn-info btn-sm d-flex align-items-center gap-2 text-light'>
      <FontAwesomeIcon icon={faDownload} />
      <span className='ml-1 d-none d-md-inline'>
        {t('UPLOAD')}
      </span>
    </button>
  );
}
