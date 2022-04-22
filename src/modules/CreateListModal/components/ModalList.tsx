import { useTranslation } from 'next-i18next';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Modal, Row, Col, Form, ButtonGroup } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListTable } from './ListTable';
import { useCatalog } from '@shared/Catalog/context/catalog';

export type ModalRef = {
  openModal: () => void
}

const ModalList = forwardRef<ModalRef>(function ModalList(props, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const { t } = useTranslation();
  const { dispatch: catalogDispatch, state: catalogState } = useCatalog();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  useImperativeHandle(ref, () => ({
    openModal
  }));
  const isSubmitted = newListName === '';

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        {t('LIST_MANAGER')}
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={e => {
            e.preventDefault();
            if(!isSubmitted){
              catalogDispatch({
                type: 'addList',
                payload: newListName
              });
              setNewListName('');
            }
          }}
        >
          <Row>
            <Col className="col-8 pr-0">
              <Form.Control
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
                as="input"
                placeholder={t('ASK_NEW_LIST_NAME')}
              />
            </Col>
            <Col className="pl-2">
              <ButtonGroup className="d-flex">
                <Button
                  type='submit'
                  disabled={isSubmitted}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span className="d-none d-sm-inline">
                    {t('ADD')}
                  </span>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </form>
        <ListTable 
          onDeleteList={(listName) => {
            catalogDispatch({
              type: 'deleteList',
              payload: listName
            });
          }}
          lists={catalogState.list}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          {t('CLOSE')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export {
  ModalList
};