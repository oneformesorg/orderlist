import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import React, { useRef } from 'react';
import { ModalEmail, ModalEMailRef } from './components/Modal';

export function SendEmailModal() {
  const { t } = useTranslation();
  const modalRef = useRef<ModalEMailRef>(null);
  return (
    <>
      <button 
        onClick={() => modalRef.current.showModal()}
        style={{
          zIndex: '2'
        }}
        className='btn btn-secondary btn-sm d-flex align-items-center gap-2'
      >
        <FontAwesomeIcon icon={faEnvelope} />
        <span className='ml-1 d-none d-md-inline'>
          {t('SEND_MAIL')}
        </span>
      </button>
      <ModalEmail ref={modalRef} />
    </>
  );
}
