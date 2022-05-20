import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useRef } from 'react';
import { imagesCardContext } from '@pages/catalog/relatorio';
import { ModalImageAdd, ModalImageAddRef } from './components/Modal';
import { useTranslation } from 'next-i18next';

export type ImageState = {image: string, description: string, width: string}[]

export function AddImage() {
  const modal = useRef<ModalImageAddRef>(null);
  const { setImages } = useContext(imagesCardContext);
  const { t } = useTranslation();

  return (
    <>
      <button 
        onClick={() => modal.current.openModal()}
        className='btn btn-secondary btn-sm text-light d-flex align-items-center gap-2'
      >
        <FontAwesomeIcon icon={faImage}/>
        {t('PHOTO')}
      </button>
      <ModalImageAdd ref={modal} onSubmit={(currentFile, description, width) => {
        setImages(old => ([
          ...old, {
            description, 
            image: currentFile,
            width
          }
        ]));
      }}/>
    </>
  );
}

