import { useCatalog } from '@shared/Catalog/context/catalog';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { ComponentProps, useCallback } from 'react';
import { faLink, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Form, Col, Row, Tab, Tabs, Table } from 'react-bootstrap';
import { CatalogRef, CatalogTable } from './components/CatalogTable/CatalogTable'; 
import { OneformesAPI } from '@shared/api/useAxios';
import { CopyToClipboard } from '@modules/CopyToClipboard/CopyToClipboard';
import Switch from 'react-input-switch';
import { CreateListModal } from '@modules/CreateListModal/CreateListModal';
import Link from 'next/link';
import msk from 'msk';

export function FormInputs() {
  const { t } = useTranslation();
  const { state, dispatch } = useCatalog();
  const maleTableRef = React.useRef<CatalogRef>(null);
  const femaleTableRef = React.useRef<CatalogRef>(null);
  const childishTableRef = React.useRef<CatalogRef>(null);
  const cyclingMaleTableRef = React.useRef<CatalogRef>(null);
  const cyclingFemaleTableRef = React.useRef<CatalogRef>(null);
  const cyclingChildishTableRef = React.useRef<CatalogRef>(null);
  const emailCompanyRef = React.useRef<HTMLInputElement>(null);
  const projectNameRef = React.useRef<HTMLInputElement>(null);
  const socksRef = React.useRef<HTMLInputElement>(null);
  const whatsappContactRef = React.useRef<HTMLInputElement>(null);
  const [catalogQuery, setCatalogQuery] = React.useState('');
  const [cyclingMode, setCyclingMode] = React.useState(false);

  React.useEffect(() => {
    setCyclingMode(state.isCycling);
  }, [state]);
  const saveChanges = useCallback(() => {
    if(cyclingMode){
      cyclingMaleTableRef.current.submitEvent();
      cyclingFemaleTableRef.current.submitEvent();
      cyclingChildishTableRef.current.submitEvent();
    } else {
      childishTableRef.current.submitEvent();
      maleTableRef.current.submitEvent();
      femaleTableRef.current.submitEvent();
    }

    dispatch({
      type: 'cyclingMode',
      payload: !!cyclingMode
    });
    dispatch({
      type: 'setPriceUniqueTables',
      payload: {
        priceTableUnique: {
          socks: [socksRef.current.valueAsNumber]
        }
      }
    });
    dispatch({
      type: 'setCompanyInfos',
      payload: {
        companyEmail: emailCompanyRef.current.value,
        projectName: projectNameRef.current.value,
        whatsappContact: whatsappContactRef.current.value
      }
    });
  },[cyclingMode, dispatch]);
  const submitHandler: ComponentProps<'form'>['onSubmit'] = useCallback(e => {
    e.preventDefault();
    saveChanges();
    dispatch({
      type: 'currentInfos',
      stateFunction: (state) => {
        OneformesAPI<string>({
          path: 'generate',
          body: state
        }).then(q => setCatalogQuery(q));
      }
    });
  }, [dispatch, saveChanges]);
  

  return (
    <Container>
      <section className='d-flex justify-content-end gap-3'>
        <Link href="/catalog/relatorio">
          <a className='btn btn-info sm-btn d-flex gap-2 align-items-center text-light'>
            <FontAwesomeIcon icon={faTable} />
            {t('REPORT')}
          </a>
        </Link>
        <CreateListModal />
        <button onClick={() => {
          saveChanges();
          alert(t('TOAST_PRICES_LIST_SAVED'));
        }} className="btn btn-primary sm-btn">
          {t('SAVE_CHANGES')}
        </button>
      </section>
      <Form
        onSubmit={submitHandler}
      >
        <Form.Group className='d-flex gap-2  p-2 align-items-center justify-content-end border-bottom mb-3'>
          <label>{t('CYCLING_CLOTHING')}</label>
          <Switch value={cyclingMode ? 1 : 0} onChange={setCyclingMode}/>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>{t('BUDGET_IDENTIFICATION')}:</Form.Label>
              <Form.Control
                ref={projectNameRef}
                type="text"
                placeholder={t('UNTITLED')}
                defaultValue={state.projectName}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>{t('COMPANY_EMAIL')}:</Form.Label>
              <Form.Control
                ref={emailCompanyRef}
                type="email"
                placeholder="sample@server.com"
                defaultValue={state.companyEmail}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Whatsapp:</Form.Label>
              <Form.Control
                onChange={e => {
                  e.target.value = msk.fit(e.target.value, '(99) 99999-9999');
                }}
                ref={whatsappContactRef}
                type='tel'
                placeholder="(xx) xxxxx-xxxx"
                defaultValue={state.whatsappContact}
              />
            </Form.Group>
          </Col>
        </Row>
        {cyclingMode ? (
          <Tabs defaultActiveKey="male" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="male" title={t('MALE')}>
              <CatalogTable ref={cyclingMaleTableRef} isCycling={true} prices={state.cyclingPriceTableMale} sizes={state.sizeList.male} reference={'cyclingPriceTableMale'} />
            </Tab>
            <Tab eventKey="female" title={t('FEMALE')}>
              <CatalogTable ref={cyclingFemaleTableRef} isCycling={true} prices={state.cyclingPriceTableFemale} sizes={state.sizeList.female} reference={'cyclingPriceTableFemale'} />
            </Tab>
            <Tab eventKey="childish" title={t('CHILDISH')}>
              <CatalogTable ref={cyclingChildishTableRef} isCycling={true} prices={state.cyclingPriceTableChildish} sizes={state.sizeList.childish} reference={'cyclingPriceTableChildish'} />
            </Tab>
          </Tabs>
        ) : (
          <Tabs defaultActiveKey="male" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="male" title={t('MALE')}>
              <CatalogTable ref={maleTableRef} prices={state.priceTableMale} sizes={state.sizeList.male} reference={'priceTableMale'} />
            </Tab>
            <Tab eventKey="female" title={t('FEMALE')}>
              <CatalogTable ref={femaleTableRef} prices={state.priceTableFemale} sizes={state.sizeList.female} reference={'priceTableFemale'} />
            </Tab>
            <Tab eventKey="childish" title={t('CHILDISH')}>
              <CatalogTable ref={childishTableRef} prices={state.priceTableChildish} sizes={state.sizeList.childish} reference={'priceTableChildish'} />
            </Tab>
          </Tabs>
        )}
        <Table bordered hover className='d-inline-block'>
          <tbody>
            <tr className="text-center">
              <td style={{ width: '50px' }}>
                <Image
                  src={'/images/socks.png'}
                  height={25}
                  width={25}
                  alt={'socks illustration'}
                />
              </td>
              <td style={{ width: '100px' }}>
                <input
                  className="tableItemInput"
                  type='number'
                  min={0}
                  defaultValue={state.priceTableUnique.socks[0]}
                  ref={socksRef}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <button 
          className="btn btn-secondary d-flex gap-2 align-items-center m-auto"
          type="submit"
        >
          <FontAwesomeIcon icon={faLink} />
          {t('GENERATE_LINK')}
        </button>
      </Form>
      {catalogQuery ? (
        <CopyToClipboard text={`${window.location.origin}?q=${catalogQuery}`}/>
      ) : null}
    </Container>
  );
}
