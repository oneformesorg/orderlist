import { useTranslation } from 'next-i18next';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export type FormNameNumberRef = {
  nameRef: React.MutableRefObject<HTMLInputElement>
  numberRef: React.MutableRefObject<HTMLInputElement>
}
type Props = {
  name: string
  number: number
}
const FormNameNumber = forwardRef<FormNameNumberRef, Props>(function FormNameNumber({ name, number }, ref){
  const { t } = useTranslation();
  const nameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => ({
    nameRef,
    numberRef
  }));

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>{t('NAME')}</Form.Label>
            <Form.Control
              as="input"
              placeholder={`${t('EXAMPLE_ABBREV')} ${t('NAME_PLACEHOLDER')}`}
              ref={nameRef}
              defaultValue={name}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>{t('NUMBER')}</Form.Label>
            <Form.Control
              as="input"
              type="number"
              placeholder={`${t('EXAMPLE_ABBREV')} 256`}
              ref={numberRef}
              defaultValue={number}
            />
          </Form.Group>
        </Col>
      </Row>
    </form>
  );
});

export { FormNameNumber };