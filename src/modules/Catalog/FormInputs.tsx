import { useCatalog } from '@shared/Catalog/context/catalog';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Form, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { CatalogRef, CatalogTable } from './components/CatalogTable/CatalogTable';

const adultSizes = ['T-PP', 'T-P', 'T-M', 'T-G', 'T-GG', 'T-XG', 'T-2XG', 'T-3XG', 'T-4XG'];
const childSize = ['T-2A', 'T-4A', 'T-6A', 'T-8A', 'T-10A', 'T-12A','T-14A', 'T-16A'];

export function FormInputs() {
  const { t } = useTranslation();
  const { state, dispatch } = useCatalog();
  const maleTableRef = React.useRef<CatalogRef>(null);
  const femaleTableRef = React.useRef<CatalogRef>(null);
  const childishTableRef = React.useRef<CatalogRef>(null);
  const emailCompanyRef = React.useRef<HTMLInputElement>(null);
  const projectNameRef = React.useRef<HTMLInputElement>(null);

  return (
    <Container>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          childishTableRef.current.submitEvent();
          maleTableRef.current.submitEvent();
          femaleTableRef.current.submitEvent();
          dispatch({
            type: 'setCompanyInfos',
            payload: {
              companyEmail: emailCompanyRef.current.value,
              projectName: projectNameRef.current.value,
            }
          });
        }}
      >
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
        <button 
          className="btn btn-secondary d-flex gap-2 align-items-center m-auto"
          type="submit"
        >
          <FontAwesomeIcon icon={faLink} />
          {t('GENERATE_LINK')}
        </button>
      </Form>
    </Container>
  );
}
