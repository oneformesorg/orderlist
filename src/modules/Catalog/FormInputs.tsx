import { useTranslation } from 'next-i18next';
import React from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';

export function FormInputs() {
  const { t } = useTranslation();
  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>{t('BUDGET_IDENTIFICATION')}:</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('UNTITLED')}
                value={''}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>{t('COMPANY_EMAIL')}:</Form.Label>
              <Form.Control
                type="email"
                placeholder="sample@server.com"
                value={''}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
