import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useCatalogAction } from '@shared/Catalog/context/catalog';
import { useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
  listName: string;
}

export default function DeleteListAndItems({ listName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { dispatch: listDispatch } = useList();
  // const catalogDispatch = useCatalogAction();
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <>
      <button className="btn p-0" onClick={onOpen}>
        <FontAwesomeIcon icon={faTrash} />
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
              if(listName === ''){
                listDispatch({
                  type: 'clearList'
                });
              } else {
                // catalogDispatch({
                //   type: 'deleteList',
                //   payload: listName
                // });
                listDispatch({
                  type: 'clearList',
                  payload: listName
                });
              }
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
