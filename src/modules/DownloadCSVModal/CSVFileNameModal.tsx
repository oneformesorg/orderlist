import { useTranslation } from 'next-i18next';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export type CSVModalRef = {
  handleOpen: () => void
}
type Props = {
  onSubmit: (name: string) => void
}

const CSVFileNameModal = forwardRef<CSVModalRef, Props>(function CSVFileNameModal({ onSubmit }, ref) {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState(false);
  const handleClose = () => setModalState(false);
  const handleOpen = () => setModalState(true);
  const inputForNameRef = useRef<HTMLInputElement>(null); 

  useImperativeHandle(ref, () => ({
    handleOpen
  }));
  return (
    <Modal show={modalState} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('DOWNLOAD_TITLE')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className='form-group'>
          <label htmlFor="fileName" className='form-label'>{t('ASK_FILENAME')}</label>
          <input 
            className='form-control'
            type="text"
            id='fileName'
            aria-describedby="inputHelp"
            ref={inputForNameRef}
            placeholder={t('MAIN_TITLE')}
          />
          <small className="form-text text-muted" id="inputHelp">
            {t('INFOR_TEXT_USING_DEFAULT')}
          </small>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('CLOSE')}
        </Button>
        <Button variant="primary" onClick={() => {
          onSubmit(inputForNameRef.current.value);
          handleClose();
        }}>
          {t('CONFIRM')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export {
  CSVFileNameModal
};