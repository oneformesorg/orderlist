import { useTranslation } from 'next-i18next';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export type CommentsModalRef = {
  handleShow: () => void
}

type Props = {
  onSubmit: (title: string, body: string) => void
}

const CommentsModal = forwardRef<
  CommentsModalRef,
  Props
>(function CommentsModal({ onSubmit }, ref) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');

  const handleClose = () => {
    resetFields();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    handleShow
  }));

  const resetFields = () => {
    setComments('');
    setTitle('');
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group mb-3">
          <span 
            className="input-group-text" 
            id="title"
          >
            Title
          </span>
          <input 
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            className="form-control"
            placeholder="Gola, Escudo, Etiqueta"
            aria-label="title for comments"
            aria-describedby="title"
          />
        </div>
        <div className="input-group mb-3">
          <span 
            className="input-group-text" 
            id="comments"
          >
            Comments
          </span>
          <input 
            value={comments}
            onChange={({ target }) => setComments(target.value)}
            type="text"
            className="form-control"
            placeholder="Add some comments"
            aria-label="comments"
            aria-describedby="comments"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('CLOSE')}
        </Button>
        <Button 
          variant="primary"
          onClick={() => {
            onSubmit(title, comments);
            handleClose();
          }}
          disabled={!(comments && title)}
        >
          {t('CONFIRM')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export { CommentsModal };