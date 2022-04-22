import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import React, { useRef } from 'react';
import { ModalList, ModalRef } from './components/ModalList';

export function CreateListModal(){
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);
  return (
    <>
      <button 
        onClick={() => modalRef.current.openModal()}
        className='btn btn-secondary btn-sm d-flex gap-2 align-items-center'
      >
        <FontAwesomeIcon icon={faList} />
        <span className='ml-1 d-none d-md-inline'>
          {t('LIST_MANAGER')}
        </span>
      </button>
      <ModalList ref={modalRef}/>
    </>
  );
}
