import { useCatalogState } from '@shared/Catalog/context/catalog';
import { createCSV } from '@shared/csv/csvCreate';
import { useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

export type ModalEMailRef = {
  showModal: () => void
}

const timestampForTitle = (locale: string) => (
  new Intl.DateTimeFormat(locale, { 
    dateStyle: 'short',
    timeStyle: 'short' 
  }).format(new Date)
);

const ModalEmail = forwardRef<ModalEMailRef>(function ModalEmail(props, ref){
  const { t, i18n } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaCode, setCaptchaCode] = useState('');
  
  const { state: listState } = useList();
  const catalogState = useCatalogState();
  
  const showModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const sendEmail = async () => {
    if(captchaCode){
      const file = await createCSV(
        listState,
        catalogState,
        t,
        `order-list ${timestampForTitle(i18n.language)}`,
        'BASE64'
      );
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      const response = await fetch('/api/email/send', {
        method: 'POST',
        body: JSON.stringify({
          key: captchaCode,
          file,
          email: emailRef.current.value,
          name: nameRef.current.value
        }),
        headers
      });
      const status = response.status;
      if(status === 200){
        closeModal();
      }
      
      return response.status;
    }
    return; 
  };
  const submitHandler = async () => {
    const statusCode = await sendEmail();
    if(statusCode === 200){
      closeModal();
    }
  };
  useImperativeHandle(ref, () => ({
    showModal
  }));

  const onReCAPTCHAChange = (captchaCode: string) => {
    if(!captchaCode){
      return;
    }
    setCaptchaCode(captchaCode);
    recaptchaRef.current.reset();
  };

  return (
    <Modal show={modalIsOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('MODAL_TITLE_SENT_VIA_EMAIL')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          ref={formRef}
          onSubmit={async (e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <Form.Group className='mb-2'>
            <Form.Label>
              {t('ASK_DESTINATION_EMAIL')}
            </Form.Label>
            <Form.Control
              type='email'
              ref={emailRef}
              placeholder={'sample@server.com'}
              required
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {t('ASK_CLIENT_NAME')}
            </Form.Label>
            <Form.Control
              type='text'
              ref={nameRef}
              placeholder={t('NAME_PLACEHOLDER')}
              required
            >
            </Form.Control>
          </Form.Group>
          <Alert variant={!termsAccepted ? 'danger' : 'success'} className='mt-2'>
            <Alert.Heading>{t('ACCEPTANCE_TERM_TITLE')}</Alert.Heading>
            <p>{t('ACCEPTANCE_TERM_TEXT')}</p>
            <hr />
            <Form.Check type="checkbox" id="checkbox-accept-terms">
              <Form.Check.Input
                type="checkbox"
                isValid={termsAccepted}
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <Form.Check.Label>
                {t('ACCEPTANCE_CHECKBOX_LABEL')}
              </Form.Check.Label>
              <Form.Control.Feedback type="valid">
                {t('ACCEPTANCE_CHECKBOX_CHECKED')}
              </Form.Control.Feedback>
            </Form.Check>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onReCAPTCHAChange}
            />
          </Alert>
          <section className="d-flex justify-content-end gap-3">
            <Button variant="secondary" onClick={closeModal}>
              {t('CLOSE')}
            </Button>
            {termsAccepted ? (
              <Button 
                type="submit"
                variant="primary"
                onClick={() => recaptchaRef.current.execute()}
              >
                {t('CONFIRM')}
              </Button>
            ) : null}

          </section>
        </Form>
      </Modal.Body>
    </Modal>
  );
});

export {
  ModalEmail
};