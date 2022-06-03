import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { CommentsModal, CommentsModalRef } from './CommentsModal';

type Comments = {
  title: string
  body: string
}

export function ReportInfosComments() {
  const modalRef = useRef<CommentsModalRef>(null);
  const [comments, setComments] = useState<Comments[]>([]);
  const [canReset, setCanReset] = useState(0);

  useEffect(() => {
    const comments = localStorage.getItem('@orderlist/reportInfosComments');
    if(comments){
      setComments(JSON.parse(comments));
      setCanReset(1);
    }
  }, []);
  useEffect(() => {
    if(canReset || comments.length){
      localStorage
        .setItem('@orderlist/reportInfosComments', JSON.stringify(comments));
    }
  }, [canReset, comments]);

  const deleteComments = (position: number) => (
    setComments(old => old.filter((props, i) => i !== position))
  );

  return (
    <section className='d-flex flex-column align-items-center justify-content-center w-100'>
      <section style={{ width: '100%' }} className='mb-3 d-flex flex-wrap align-items-center'>
        {comments.map(({ title, body }, i) => (
          <div
            className='position-relative' 
            key={`comments__key--${i}`}
            style={{ width: '50%' }}
          >
            <table style={{ width: '100%' }}>
              <tr>
                <td className='p-3' style={{ width: '30%' }}>
                  <b>
                    {title}
                  </b>
                </td>
                <td
                  style={{
                    paddingRight: '38px',
                    paddingLeft: '8px'
                  }}
                >
                  {body}  
                  <button 
                    onClick={() => deleteComments(i)}
                    style={{
                      position: 'absolute',
                      right: '4px',
                    }}
                    className='invisible-for-print btn btn-sm btn-danger rounded'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            </table>
            
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
