import { useTranslation } from 'next-i18next';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export type ModalEMailRef = {
  showModal: () => void
}

/**
 const postData = {
   token: HCaptchaToken,
   uuidPriceTable: settings.uuidFromLoadedPriceTable,
   zipfile: zipData,
   email: targetEmail,
   client: clientName,
   translatedText: JSON.stringify({
     emailTitle: Translator('MAIN_TITLE'),
     emailBody: Translator('EMAIL_BODY'),
     labelClient: Translator('CLIENT'),
   }),
 };
 
 const postFormData = new FormData();
 Object.keys(postData).map((key) => postFormData.append(key, postData[key]));
 
 const serverResponse = await axios
   .post(HCAPTCHA_SERVER_CHECK, postFormData, {
     headers: {'Content-Type': 'multipart/form-data'},
     timeout: 15000,
   })

 */

const ModalEmail = forwardRef<ModalEMailRef>(function ModalEmail(props, ref){
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const closeModal = () => setModalIsOpen(false);
  const showModal = () => setModalIsOpen(true);

  useImperativeHandle(ref, () => ({
    showModal
  }));

  return (
    <Modal show={modalIsOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('MODAL_TITLE_SENT_VIA_EMAIL')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Form.Group className='mb-2'>
            <Form.Label>
              {t('ASK_DESTINATION_EMAIL')}
            </Form.Label>
            <Form.Control
              type='email'
              placeholder={'sample@server.com'}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              {t('ASK_CLIENT_NAME')}
            </Form.Label>
            <Form.Control
              type='text'
              placeholder={t('NAME_PLACEHOLDER')}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t('ASK_NOT_ROBOT')}</Form.Label>
            {/* HCAPTCHA */}
            <HCaptcha
              sitekey="3bb7ba5e-5cba-4ef6-88ca-8577ac7d5236"
              onVerify={(token) => {
                console.log(token);
              }}
            />
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
          </Alert>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          {t('CLOSE')}
        </Button>
        {termsAccepted ? (
          <Button variant="primary" onClick={closeModal}>
            {t('CONFIRM')}
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
});

export {
  ModalEmail
};