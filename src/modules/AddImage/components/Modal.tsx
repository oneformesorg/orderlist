import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';

export type ModalImageAddRef = {
  openModal: () => void
}

type Props = {
  onSubmit: (currentFile: string, description: string, widthPercent: string) => void
}

const ModalImageAdd = forwardRef<ModalImageAddRef, Props>(function ModalImageAdd({ onSubmit }, ref) {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRangeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);
  const [currentFileName, setCurrentFileName] = useState('');
  const [currentFile, setCurrentFile] = useState('');
  useImperativeHandle(ref, () => ({
    openModal
  }));

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('REPORT_MODAL_PREVIEW_TITLE')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className='d-flex justify-content-center align-items-center my-4 flex-column'>
          <button 
            onClick={() => inputRef.current.click()}
            className='btn btn-primary d-flex align-items-center gap-2'
          >
            <FontAwesomeIcon icon={faImage} />
            {t('REPORT_MODAL_PREVIEW_CHOOSE_IMAGE')}
          </button>
          <span className='text-secondary'>
            <small>
              {currentFileName}
            </small>
          </span>
          <input
            hidden
            type="file" 
            accept="image/png, image/jpeg, image/svg"
            ref={inputRef}
            onChange={(e) => {
              const reader = new FileReader();
              const file = e.target.files[0];
              const name = e.target.files[0]?.name;
              setCurrentFileName(name);
              reader.readAsDataURL(file);
              reader.onload = () => setCurrentFile(reader.result as unknown as string);
            }}
          />
          <div className='w-100 mt-2'>
            <label htmlFor="size-image" className='form-label mb-0'>{t('SIZE')}</label>
            <input 
              ref={inputRangeRef}
              type="range" 
              id="size-image" 
              className="form-range" 
              defaultValue={30} 
              min={10} 
              max={100}
            />
          </div>
        </section>
        <section className="form-floating">
          <textarea ref={descriptionRef} className="form-control" id="floatingTextarea"></textarea>
          <label htmlFor="floatingTextarea">{t('DESCRIPTION')}</label>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          {t('CLOSE')}
        </Button>
        <Button 
          variant="primary"
          disabled={!currentFile}
          onClick={() => {
            const widthPercent = `${inputRangeRef.current.value}%`;
            onSubmit(
              currentFile,
              descriptionRef.current.value,
              widthPercent
            );
            setCurrentFile('');
            setCurrentFileName('');
            closeModal();
          }}
        >
          {t('CONFIRM')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
);

export {
  ModalImageAdd
};