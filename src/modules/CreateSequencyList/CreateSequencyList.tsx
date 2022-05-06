/* eslint-disable @next/next/no-img-element */
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClothingParts } from '@shared/Catalog';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { Gender, useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import Switch from 'react-switch';
import Select from 'react-select';
import { adultSizes, childSize } from '@config/static';
import { generateId } from '@shared/utils/generateId';

const clothes: ClothingParts[] = ['pants', 'shorts', 'tanktop', 'tshirt', 'tshirtLong', 'vest', 'socks'];
const cyclingClothes = ['pants', 'shorts', 'tshirt', 'tshirtLong', 'socks'];
const sizes = {
  adult: adultSizes,
  childish: childSize
};
const clotheInitialState: [string, boolean][] = [
  ['pants', false],
  ['shorts', false],
  ['tanktop', false],
  ['tshirt', false],
  ['tshirtLong', false],
  ['vest', false],
  ['socks', false]
];

export function CreateSequencyList() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const [selectedClothes, SetSelectedClothes] = useState<[string, boolean][]>(clotheInitialState);
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'CHILDISH'>('MALE');
  const [minNumber, setMinNumber] = useState(0);
  const [maxNumber, setMaxNumber] = useState(0);
  const [clothSize, setClothSize] = useState('');

  const { t } = useTranslation();
  const { dispatch: listDispatch } = useList();
  const { isCycling, list: catalogList } = useCatalogState();
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const switchIsChecked = (clotheName: string) => (
    selectedClothes.find(([name]) => name === clotheName)[1]
  );
  const setSwitch = (clotheName: string, index:number, isSelected: boolean) => { 
    SetSelectedClothes(old => old.map((infos) => (
      clotheName === infos[0] ? [clotheName, isSelected] : infos
    )));
  };

  const buttonSubmitDisable = () => {
    const onlySelectedClothes = selectedClothes.filter(([,bool]) => bool);
    if(
      (onlySelectedClothes.length === 1 && onlySelectedClothes[0][0] === 'socks') &&
      minNumber < maxNumber
    ) return false;
    return minNumber > maxNumber ||
    selectedClothes.every(([, isActive]) => !isActive) || !clothSize;
  
  };

  return (
    <>
      <button 
        className='btn d-flex gap-3 align-items-center'
        onClick={onOpen}
      >
        <FontAwesomeIcon icon={faBolt} />
        <span className="ml-1 d-none d-md-inline-block">
          {t('SEQUENCY')}
        </span>
      </button>

      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('SEQUENCIAL_LIST')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{t('SEQUENCIAL_LIST_DESCRIPTION')}</p>      
          <Row className="mt-4 mb-2">
            { isCycling ? (
              <>
                {cyclingClothes.map((cyclingClothe, i) => (
                  <Col xs={4} sm={2} className="mb-4" key={`${i}_icon`}>
                    <div className="d-flex flex-column align-items-center">
                      <img
                        src={
                          cyclingClothe === 'socks' ?
                            `/images/${cyclingClothe}.png` :
                            `/images/cycling/${cyclingClothe}.png`
                        }
                        className="mb-2"
                        alt="icon cloth"
                        width={40}
                        height={40}
                      />
                      <Switch
                        onChange={(e) => setSwitch(cyclingClothe, i, !!e) }
                        checked={switchIsChecked(cyclingClothe)}
                        height={22}
                        width={45}
                        
                      />
                    </div>
                  </Col>
                ))}
              </>
            ) : (
              <>
                {clothes.map((clothe, i) => (
                  <Col xs={4} sm={2} className="mb-4" key={`${i}_icon`}>
                    <div className="d-flex flex-column align-items-center">
                      <label className="d-flex flex-column align-items-center">
                        <img
                          src={`/images/${clothe}.png`}
                          className="mb-2"
                          alt="icon clothe"
                          width={40}
                          height={40}
                        />
                        <Switch
                          onChange={(e) => setSwitch(clothe, i, !!e)}
                          checked={switchIsChecked(clothe)}
                          height={22}
                          width={45}
                        />
                      </label>
                    </div>
                  </Col>
                ))}
              </>
            )}

          </Row>
          <section>
            <section  className='d-flex gap-2 mb-2'>
              <div>
                <label htmlFor="minNumber" className="form-label">{t('SEQUENCY_START_NUMBER')}</label>
                <input 
                  type="number" 
                  min={0}
                  className="form-control"
                  id="minNumber"
                  aria-describedby="minNumber"
                  value={minNumber}
                  onChange={e => setMinNumber(e.target.valueAsNumber)}
                />
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
              </div>
              <div>
                <label htmlFor="maxNumber" className="form-label">{t('SEQUENCY_END_NUMBER')}</label>
                <input 
                  type="number"
                  min={minNumber+1}
                  className="form-control" 
                  id="maxNumber"
                  aria-describedby="maxNumber"
                  value={maxNumber}
                  onChange={e => setMaxNumber(e.target.valueAsNumber)}  
                />
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
              </div>

            </section>
            <section className="d-flex gap-2 flex-wrap">
              <Form.Group style={{ width: '100%' }}>
                <Form.Label>
                  {t('GENDER')}
                </Form.Label>
                <Form.Control
                  as="select"
                  size="lg"
                  aria-label="select gender"
                  onChange={({ target }) => setGender(target.value as Gender)}
                  placeholder={t('CSVID_GENDER')}
                >
                  <option value="MALE">{t('MALE')}</option>
                  <option value="FEMALE">{t('FEMALE')}</option>
                  <option value="CHILDISH">{t('CHILDISH')}</option>
                </Form.Control>
              </Form.Group>
              {catalogList.length > 0 && (
                <Form.Group style={{ width: '100%' }}>
                  <Form.Label>
                    {t('LIST')}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    size="lg"
                    aria-label="select list"
                    onChange={({ target }) => {
                      setSelectedList(target.value);
                    }}
                  >
                    <option value=''></option>
                    {catalogList.map((listName, i) => (
                      <option key={`${i}_listName`} value={listName}>{listName}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}
              <section style={{ width: '100%' }}>
                <label htmlFor="size">{t('SIZE')}</label>
                <Select isSearchable={false} options={
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
                  setClothSize(e.value);
                }}
                />
              </section>
            </section>
          </section>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>{t('CLOSE')}</Button>
          <Button 
            onClick={() => {
              // listDispatch({
              //   type: 'clearList'
              // });
              // onClose();
              const listItem = [];
              
              for (let i = minNumber; i <= maxNumber; i++) {
                listItem.push({
                  gender,
                  clothes: selectedClothes.reduce((prev, [key, bool]) => {
                    if (key === 'socks') {
                      return {
                        ...prev,
                        [key]: {
                          quantity: bool ? 1 : 0,
                          size: ''
                        }
                      
                      };
                    }
                    return {
                      ...prev,
                      [key]: {
                        quantity: bool ? 1 : 0,
                        size: bool ? clothSize : ''
                      }
                    };
                  }, {}),
                  id: generateId(),
                  number: String(i),
                  isCycling,
                  list: selectedList,
                  name: ''
                });
                
                // listDispatch({
                //   type: 'addItem'
                // });
                
              }
              listDispatch({
                type: 'addItems',
                payload: listItem 
              });
            }}
            variant="primary"
            disabled={buttonSubmitDisable()}
          >
            {t('GENERATE')}
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
}
