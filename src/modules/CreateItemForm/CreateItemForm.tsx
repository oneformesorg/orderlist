import { faPlus, faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem, useList } from '@shared/List';
import { generateId } from '@shared/utils/generateId';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { ButtonGroup, Form, Col, Row, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FormModal, FormModalRef } from './components/FormModal/FormModal';
import { MicInput } from './components/MicInput/MicInput';

export const numberAndNameContext = createContext<{
  setName: React.Dispatch<React.SetStateAction<string>>
  setNumber: React.Dispatch<React.SetStateAction<string>>
}>(null);

export function CreateItemForm() {
  const { t, i18n } = useTranslation();
  const [hasWindow, setHasWindow] = useState(false);
  const formModalRef = useRef<FormModalRef>(null);
  const { query: { list } } = useRouter();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { dispatch } = useList();
  const addNewItem = useCallback((JSONItems: unknown) => {
    dispatch({
      type: 'deleteAllItems'
    });
    dispatch({
      type: 'addItems',
      payload: JSONItems as ListItem[]
    });
  }, [dispatch]);

  useEffect(() => {
    if(list){
      fetch(`/api/list/${list}`)
        .then(r => r.json())
        .then(r => {
          const parsed = r;
          if(!parsed?.message){
            addNewItem(JSON.parse(parsed.items));
          }
        });
    }
  }, [addNewItem, list]);
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
      <numberAndNameContext.Provider value={{
        setName,
        setNumber
      }}>
        {hasWindow && <MicInput locale={i18n.language}/>}
      </numberAndNameContext.Provider>
      <Row>
        <Col xs="6" sm="6" md="5" lg="5" xl="5">
          <Form.Group>
            <Form.Label>{t('NAME')}</Form.Label>

            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faUser} />
              </InputGroup.Text>
              <FormControl
                value={name}
                onChange={e => setName(e.target.value)}
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
                value={number}
                onChange={e => setNumber(e.target.value)}
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
      <FormModal ref={formModalRef} sendForList={(cloth, gender, list, isCycling) => {
        if(gender === 'CHILDISH'){
          return dispatch({
            type: 'addItem',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            payload: {
              list,
              isCycling,
              name,
              number,
              id: generateId(),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              clothes: Object.entries(cloth).reduce((prev,[key, value]) => ({ ...prev, [key]: { ...value } }), {}),
              gender: gender,
            }
          });
        }
        dispatch({
          type: 'addItem',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          payload: {
            list,
            isCycling,
            name,
            number,
            id: generateId(),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            clothes: Object.entries(cloth).reduce((prev,[key, value]) => ({ ...prev, [key]: { ...value } }), {}),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            gender: gender,
          }
        });
        setName('');
        setNumber('');
      }}/>
    </form>
  );
}
