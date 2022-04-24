import { useCatalog } from '@shared/Catalog/context/catalog';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { ComponentProps } from 'react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Form, Col, Row, Tab, Tabs, Table } from 'react-bootstrap';
import { CatalogRef, CatalogTable } from './components/CatalogTable/CatalogTable';
import { adultSizes, childSize } from '@config/static';
import { OneformesAPI } from '@shared/api/useAxios';
import { CopyToClipboard } from '@modules/CopyToClipboard/CopyToClipboard';
import Switch from 'react-input-switch';
import { CreateListModal } from '@modules/CreateListModal/CreateListModal';

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
  const [catalogQuery, setCatalogQuery] = React.useState('');
  const [cyclingMode, setCyclingMode] = React.useState(false);
  
  React.useEffect(() => {
    setCyclingMode(state.isCycling);
  }, [state]);
  const submitHandler: ComponentProps<'form'>['onSubmit'] = e => {
    e.preventDefault();
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
      }
    });
    dispatch({
      type: 'currentInfos',
      stateFunction: (state) => {
        OneformesAPI<string>({
          path: 'generate',
          body: state
        }).then(q => setCatalogQuery(q));
      }
    });
  }; 
  return (
    <Container>
      <section className='d-flex justify-content-end'>
        <CreateListModal />
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
        </Row>
        {cyclingMode ? (
          <Tabs defaultActiveKey="male" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="male" title={t('MALE')}>
              <CatalogTable ref={cyclingMaleTableRef} isCycling={true} prices={state.cyclingPriceTableMale} sizes={adultSizes} reference={'cyclingPriceTableMale'} />
            </Tab>
            <Tab eventKey="female" title={t('FEMALE')}>
              <CatalogTable ref={cyclingFemaleTableRef} isCycling={true} prices={state.cyclingPriceTableFemale} sizes={adultSizes} reference={'cyclingPriceTableFemale'} />
            </Tab>
            <Tab eventKey="childish" title={t('CHILDISH')}>
              <CatalogTable ref={cyclingChildishTableRef} isCycling={true} prices={state.cyclingPriceTableChildish} sizes={childSize} reference={'cyclingPriceTableChildish'} />
            </Tab>
          </Tabs>
        ) : (
          <Tabs defaultActiveKey="male" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="male" title={t('MALE')}>
              <CatalogTable ref={maleTableRef} prices={state.priceTableMale} sizes={adultSizes} reference={'priceTableMale'} />
            </Tab>
            <Tab eventKey="female" title={t('FEMALE')}>
              <CatalogTable ref={femaleTableRef} prices={state.priceTableFemale} sizes={adultSizes} reference={'priceTableFemale'} />
            </Tab>
            <Tab eventKey="childish" title={t('CHILDISH')}>
              <CatalogTable ref={childishTableRef} prices={state.priceTableChildish} sizes={childSize} reference={'priceTableChildish'} />
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
