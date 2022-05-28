import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ClearList() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { dispatch: listDispatch } = useList();
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <>
        <button className="btn gap-3 d-flex align-items-center" onClick={() => onOpen()}>
          <FontAwesomeIcon icon={faTrash} />
          {t('CLEAR')}
        </button>
        <Modal show={isOpen} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('MAIN_TITLE')}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{t('CONFIRM_DELETE_ALL_ORDERITEMS')}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => onClose()}>{t('NO')}</Button>
            <Button 
              onClick={() => {
                listDispatch({
                  type: 'deleteAllItems'
                });
                onClose();
              }}
              variant="danger"
            >
              {t('YES')}
            </Button>
          </Modal.Footer>
        </Modal >
      </>
    </>
  );
}
