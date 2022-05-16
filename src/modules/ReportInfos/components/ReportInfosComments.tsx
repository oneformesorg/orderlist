import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { CommentsModal, CommentsModalRef } from './CommentsModal';

type Comments = {
  title: string
  body: string
}

export function ReportInfosComments() {
  const modalRef = useRef<CommentsModalRef>(null);
  const [comments, setComments] = useState<Comments[]>([]);
  
  const deleteComments = (position: number) => (
    setComments(old => old.filter((props, i) => i !== position))
  );

  return (
    <section className='d-flex flex-column align-items-center justify-content-center h-100'>
      <section className='w-100 mb-3'>
        {comments.map(({ title, body }, i) => (
          <div
            className='position-relative border-bottom' 
            key={`comments__key--${i}`}
          >
            <div className='d-flex gap-2 align-items-center'>
              <p 
                className='mb-0 py-2'
                style={{
                  fontWeight: 600,
                  fontSize: '18px'
                }}
              >
                {title}
              </p>
              <p className='mb-0 py-2'>
                {body}
              </p>
            </div>
            <button 
              onClick={() => deleteComments(i)}
              style={{
                position: 'absolute',
                right: 0,
                top: 0
              }}
              className='invisible-for-print btn btn-sm btn-danger rounded'
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </section>
      <button 
        className='rounded btn btn-primary invisible-for-print'
        onClick={() => modalRef.current.handleShow()}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <CommentsModal 
        onSubmit={(title, body) => {
          setComments(old => [...old, { body, title }]);
        }}
        ref={modalRef}
      />
    </section>
  );
}
