import React, { useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { useList } from '@shared/List';

type Props = {
  id: string
}

export default function ConfirmDeleteModal({ id }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { dispatch: listDispatch } = useList();
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <button className="text-danger" onClick={() => onOpen()}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('MAIN_TITLE')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{t('CONFIRM_DELETE_ITEM_MODAL')}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>{t('NO')}</Button>
          <Button 
            onClick={() => {
              listDispatch({
                type: 'deleteItem',
                payload: id
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
  );
}


