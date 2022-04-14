import { useCatalog } from '@shared/Catalog/context/catalog';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Container, Form, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { CatalogTable } from './components/CatalogTable/CatalogTable';

export function FormInputs() {
  const { t } = useTranslation();
  const { state } = useCatalog();
  const emailCompanyRef = React.useRef<HTMLInputElement>(null);
  const nameCompanyRef = React.useRef<HTMLInputElement>(null);
  const tabList = [
    {
      eventKey:'male',
      title: t('MALE'),
      list: state.priceTableMale,
      sizes: ['T-PP', 'T-P', 'T-M', 'T-G', 'T-GG', 'T-XG', 'T-2XG', 'T-3XG', 'T-4XG'],
      reference: 'priceTableMale'
    },
    {
      eventKey:'female',
      title: t('FEMALE'),
      list: state.priceTableFemale,
      sizes: ['T-PP', 'T-P', 'T-M', 'T-G', 'T-GG', 'T-XG', 'T-2XG', 'T-3XG', 'T-4XG'],
      reference: 'priceTableFemale'
    },
    {
      eventKey:'childish',
      title: t('CHILDISH'),
      list: state.priceTableChildish,
      sizes: ['T-2A', 'T-4A', 'T-6A', 'T-8A', 'T-10A', 'T-12A','T-14A', 'T-16A'],
      reference: 'priceTableChildish'
    },
  ];

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>{t('BUDGET_IDENTIFICATION')}:</Form.Label>
              <Form.Control
                ref={nameCompanyRef}
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
          {tabList.map(({ list, sizes, reference, ...props }, i) => (
            <Tab {...props} key={`${i}_`}>
              <CatalogTable prices={list} sizes={sizes} reference={reference} />
            </Tab>
          ))}
        </Tabs>
      </Form>
    </Container>
  );
}
