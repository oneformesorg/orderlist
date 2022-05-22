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
      <section className='w-100 mb-3 d-flex justify-content-center flex-wrap align-items-center'>
        {comments.map(({ title, body }, i) => (
          <div
            className='position-relative d-inline' 
            key={`comments__key--${i}`}
          >
            <table>
              <tr>
                <td className='p-3'>
                  {title}  
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
