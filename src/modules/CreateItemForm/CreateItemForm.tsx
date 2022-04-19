import { faPlus, faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect, useRef } from 'react';
import { ButtonGroup, Form, Col, Row, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FormModal, FormModalRef } from './components/FormModal/FormModal';
import { MicInput } from './components/MicInput/MicInput';

export function CreateItemForm() {
  const { t, i18n } = useTranslation();
  const [hasWindow, setHasWindow] = useState(false);
  const formModalRef = useRef<FormModalRef>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if(typeof window !== 'undefined'){
      setHasWindow(true);
    }
  }, []);

  return (
    <form 
      className='d-flex gap-2 flex-wrap align-items-center justify-content-center'
      onSubmit={e => e.preventDefault()}
    >
      {hasWindow && <MicInput locale={i18n.language}/>}
      <Row>
        <Col xs="6" sm="6" md="5" lg="5" xl="5">
          <Form.Group>
            <Form.Label>{t('NAME')}</Form.Label>

            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <FormControl
                ref={nameRef}
                placeholder={`${t('EXAMPLE_ABBREV')} ${t('NAME_PLACEHOLDER')}`}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col xs="6" sm="6" md="3" lg="4" xl="4">
          <Form.Group>
            <Form.Label>{t('NUMBER')}</Form.Label>

            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faPen} />
              </InputGroup.Text>
              <FormControl
                ref={numberRef}
                type='number'
                placeholder={`${t('EXAMPLE_ABBREV')} 256`}
              />
            </InputGroup>
          </Form.Group>
        </Col>

        <Col xs="12" sm="12" md="4" lg="3" xl="3">
          <Form.Group>
            <Form.Label>{`${t('CLOTHES')}:`}</Form.Label>
            {/* Hide labels on mobile */}
            <ButtonGroup className="d-flex">
              <Button
                onClick={() => formModalRef.current.showModal()}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span className="d-none d-sm-inline"> {t('ADD')}</span>
              </Button>
            </ButtonGroup>
          </Form.Group>
        </Col>
      </Row>
      <FormModal ref={formModalRef} sendForList={(cloth, gender, list) => {
        console.log(cloth, gender, list, nameRef.current.value, numberRef.current.value);
      }}/>
    </form>
  );
}
