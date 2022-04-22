import { ClothingParts, CyclingClothingParts } from '@shared/Catalog';
import { useTranslation } from 'next-i18next';
import React, { useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';
import { Modal, Button, Row, Col, InputGroup, Form } from 'react-bootstrap';
import Select from 'react-select';
import { adultSizes, childSize } from '@config/static';
import { useList } from '@shared/List';
import { FormNameNumber, FormNameNumberRef } from './components/FormNameNumber/FormNameNumber';
import { verifyClothList } from '@shared/utils/verifyClothList';

export type EditItemModalRef = {
  showModal: () => void
}
const clothes: ClothingParts[] = ['pants', 'shorts', 'tanktop', 'tshirt', 'tshirtLong', 'vest'];
const cyclingClothes: CyclingClothingParts[] = ['pants', 'shorts', 'tshirt', 'tshirtLong'];
const sizes = {
  adult: adultSizes,
  childish: childSize
};
type Gender = 'MALE' | 'FEMALE' | 'CHILDISH'
type ClothList = Record<ClothingParts, {
  quantity: number
  size: string
}>
type Props = {
  id: string
}

// TODO: Improve this component!!
export const EditItemModal = React.forwardRef<EditItemModalRef, Props>(function EditItemModal({ id }, ref) {
  const { state: listState } = useList();
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'CHILDISH'>('MALE');
  const [currentItem] = useState(listState.items.filter(({ id: currId }) => id === currId)[0]);
  const [list, setList] = useState(currentItem.list);
  const [clothList, setClothList] = useState<ClothList>(
    listState.items.filter(({ id: currId }) => id === currId)[0].clothes
  );
  console.log(currentItem.isCycling);
  const [isCycling, setIsCycling] = useState(currentItem.isCycling);
  const formNumberNameRef = useRef<FormNameNumberRef>(null);
  const { t } = useTranslation();
  const genderList = [
    { value: 'MALE', label: t('MALE') },
    { value: 'FEMALE', label: t('FEMALE') },
    { value: 'CHILDISH', label: t('CHILDISH') }
  ];

  const handleClose = () => setShow(false);
  const showModal = () => setShow(true);
  useImperativeHandle(ref, () => ({
    showModal
  }));

  const { state, dispatch: listDispatch } = useList();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('CHOOSE_CLOTHES_ADD')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('HEADER_PHRASE_NO_NAME')}
        </p>
        <FormNameNumber name={currentItem.name} number={Number(currentItem.number)} ref={formNumberNameRef}/>
        <InputGroup className='d-flex flex-column mb-3'>
          <label>{t('LIST')}:</label>
          <Select
            defaultValue={{ value: list, label: list }}
            options={state.lists.map(item => ({ value: item, label: item }))}
            onChange={(e) => setList(e.value)}
          />
        </InputGroup>
        <InputGroup className='d-flex flex-column mb-3'>
          <label>{t('GENDER')}</label>
          <Select
            options={genderList}
            defaultValue={[{ value: currentItem.gender as string, label: t(currentItem.gender) }]}
            onChange={(e) => setGender(e.value as Gender)}
          />
        </InputGroup>
        <InputGroup className='d-flex flex-column mb-3'>
          <label>{t('CYCLING_CLOTHING')}</label>
          <Select
            value={isCycling ? { value: 'YES', label: t('YES') } : { value: '', label: t('NO') }}
            options={[
              { value: 'YES', label: t('YES') },
              { value: '', label: t('NO') }
            ]}
            onChange={(e) => setIsCycling(!!e.value)}
          />
        </InputGroup>
        {isCycling ? (
          <>
            {cyclingClothes.map((clothe, i) => (
              <Row className="align-items-center mb-2" key={`${i}_${clothe}`}>
                <Col xs={2}>
                  <Image 
                    src={`/images/cycling/${clothe}.png`}
                    alt="Clothe illustration"
                    height={32}
                    width={32}
                  />
                </Col>
                <Col xs={5}>
                  <Select options={
                    gender !== 'CHILDISH' ? (
                      sizes.adult.map((size) => ({
                        value: size, label: t(size)
                      }))
                    ) : (
                      sizes.childish.map((size) => ({
                        value: size, label: t(size)
                      }))
                    )
                  }
                  onChange={e => {
                    setClothList(list => ({ ...list, [clothe]: {
                      size: e.value, quantity: list[clothe].quantity === 0 ? 1 : list[clothe].quantity
                    } }));
                  }}
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type='number'
                    className="my-1 mr-sm-2"
                    defaultValue={0}
                    value={clothList[clothe].quantity}
                    onChange={e => {
                      setClothList(list => ({ ...list, [clothe]: {
                        ...list[clothe], quantity: Number(e.target.value)
                      } }));
                    }}
                  />
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <>
            {clothes.map((clothe, i) => (
              <Row className="align-items-center mb-2" key={`${i}_${clothe}`}>
                <Col xs={2}>
                  <Image 
                    src={`/images/${clothe}.png`}
                    alt="Clothe illustration"
                    height={32}
                    width={32}
                  />
                </Col>
                <Col xs={5}>
                  <Select options={
                    gender !== 'CHILDISH' ? (
                      sizes.adult.map((size) => ({
                        value: size, label: t(size)
                      }))
                    ) : (
                      sizes.childish.map((size) => ({
                        value: size, label: t(size)
                      }))
                    )
                  }
                  onChange={e => {
                    setClothList(list => ({ ...list, [clothe]: {
                      size: e.value, quantity: list[clothe].quantity === 0 ? 1 : list[clothe].quantity
                    } }));
                  }}
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type='number'
                    className="my-1 mr-sm-2"
                    defaultValue={0}
                    value={clothList[clothe].quantity}
                    onChange={e => {
                      setClothList(list => ({ ...list, [clothe]: {
                        ...list[clothe], quantity: Number(e.target.value)
                      } }));
                    }}
                  />
                </Col>
              </Row>
            ))}
          </>
        )}
        <Row className="align-items-center mb-2">
          <Col xs={2}>
            <Image 
              src={'/images/socks.png'}
              alt="Clothe illustration"
              height={32}
              width={32}
            />
          </Col>
          <Col xs={5}>
            {t('T-UNIQ-FULL')}
          </Col>
          <Col xs={5}>
            <Form.Control
              type='number'
              className="my-1 mr-sm-2"
              defaultValue={0}
              value={clothList['socks'].quantity}
              onChange={e => {
                setClothList(list => ({ ...list, ['socks']: {
                  ...list['socks'], quantity: Number(e.target.value)
                } }));
              }}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('CLOSE')}
        </Button>
        <Button
          disabled={!verifyClothList(clothList)}
          variant="primary" 
          onClick={() => {
            const { nameRef, numberRef } = formNumberNameRef.current;
            // sendForList(clothList, gender, list, isCycling);
            console.log('foi?');
            listDispatch({
              type: 'editItem',
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              payload: {
                id,
                listItem: {
                  clothes: clothList,
                  gender,
                  isCycling,
                  list,
                  name: nameRef.current.value,
                  number: numberRef.current.valueAsNumber
                }
              }
            });
            setIsCycling(false);
            handleClose();
          }}>
          {t('SAVE_CHANGES')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
