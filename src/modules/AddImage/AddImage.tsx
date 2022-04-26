import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useRef } from 'react';
import { imagesCardContext } from 'src/pages/relatorio';
import { ModalImageAdd, ModalImageAddRef } from './components/Modal';

export type ImageState = {image: string, description: string}[]

export function AddImage() {
  const modal = useRef<ModalImageAddRef>(null);
  const { setImages } = useContext(imagesCardContext);

  return (
    <>
      <button 
        onClick={() => modal.current.openModal()}
        className='btn btn-secondary btn-sm text-light d-flex align-items-center gap-2'
      >
        <FontAwesomeIcon icon={faImage}/>
          Add images
      </button>
      <ModalImageAdd ref={modal} onSubmit={(currentFile, description) => {
        setImages(old => ([
          ...old, {
            description, image: currentFile
          }
        ]));
      }}/>
    </>
  );
}

