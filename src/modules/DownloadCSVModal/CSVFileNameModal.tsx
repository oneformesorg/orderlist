import { clothings, cyclingClothings } from '@config/static';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { OrderOptions } from '@shared/utils/orderList';
import { useTranslation } from 'next-i18next';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export type CSVModalRef = {
  handleOpen: () => void
}
type Props = {
  onSubmit: (name: string, orderBy?: string, orderType?: OrderOptions) => void
}

const orderListType:OrderOptions[] = ['INCREASING', 'DECREASING'];

const CSVFileNameModal = forwardRef<CSVModalRef, Props>(function CSVFileNameModal({ onSubmit }, ref) {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState(false);
  const [orderingOpt, setOrderingOpt] = useState<string>();
  const [orderType, serOrderType] = useState<OrderOptions>();
  const handleClose = () => setModalState(false);
  const handleOpen = () => setModalState(true);
  const inputForNameRef = useRef<HTMLInputElement>(null);
  const { isCycling } = useCatalogState();

  useImperativeHandle(ref, () => ({
    handleOpen
  }));
  return (
    <Modal show={modalState} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('DOWNLOAD_TITLE')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(inputForNameRef.current.value, orderingOpt, orderType);
          handleClose();
        }}>
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
          <section className='mt-2'>
            {t('ORGANIZE_BY')}:
            <section className="d-flex gap-3 mb-3 flex-wrap justify-content-center">
              {isCycling ? (
                <>
                  {cyclingClothings.map((clothe, i) => (
                    <Form.Group key={`ordering#${i}`} controlId="formBasicCheckbox">
                      <Form.Check onClick={() => setOrderingOpt(clothe)} type="radio" name="clothe" id={`ordering#${i}`} label={t(`CSVID_${clothe.toUpperCase()}`)} />
                    </Form.Group>
                  ))}
                </>
              ) : (
                <>
                  {clothings.map((clothe, i) => (
                    <Form.Group key={`ordering#${i}`} controlId="formBasicCheckbox">
                      <Form.Check onClick={() => setOrderingOpt(clothe)} type="radio" name="clothe" id={`ordering#${i}`} label={t(`CSVID_${clothe.toUpperCase()}`)} />
                    </Form.Group>
                  ))}
                </>
              )}
            </section>
            <section className='d-flex justify-content-center my-3 gap-4'>
              {orderListType.map((orderType, i) => (
                <Form.Group key={`orderOpt#${i}`} controlId="formBasicCheckbox">
                  <Form.Check 
                    onClick={() => serOrderType(orderType)} 
                    type="radio" 
                    name="orderOpt" 
                    id={`orderOpt#${i}`} 
                    label={t(orderType)} 
                  />
                </Form.Group>
              ))}
            </section>
          </section>
          <div className="d-flex justify-content-end gap-3">
            <Button variant="secondary" type='reset' onClick={handleClose}>
              {t('CLOSE')}
            </Button>
            <Button variant="primary" type='submit'>
              {t('CONFIRM')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
});

export {
  CSVFileNameModal
};