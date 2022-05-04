/* eslint-disable @next/next/no-img-element */
import { ClothingParts } from '@shared/Catalog';
import { ListItem } from '@shared/List';
import { useTranslation } from 'next-i18next';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import Switch from 'react-switch';
import { sanitizeText } from '../utils/TextForItem';

const clothes: ClothingParts[] = ['pants', 'shorts', 'tanktop', 'tshirt', 'tshirtLong', 'vest', 'socks'];
const cyclingClothes = ['pants', 'shorts', 'tshirt', 'tshirtLong', 'socks'];

export type ModalPasteListRef = {
  showModal: () => void
}

type Props = {
  isCycling: boolean
  lists: string[]
  onSubmit: (lists: ListItem[]) => void
}

const clotheInitialState: [string, boolean][] = [
  ['pants', false],
  ['shorts', false],
  ['tanktop', false],
  ['tshirt', false],
  ['tshirtLong', false],
  ['vest', false],
  ['socks', false]
];

const ModalPasteList = forwardRef<ModalPasteListRef, Props>(function ModalPasteList({ isCycling, lists, onSubmit }, ref){
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [textArea, setTextArea] = useState('');
  const [selectedList, setSelectedList] = useState(lists[0] || '');
  const [selectedClothes, SetSelectedClothes] = useState<[string, boolean][]>(clotheInitialState);
  const [gender, setGender] = useState('MALE');
  
  const closeModal = () => setModalIsOpen(false);
  const showModal = () => setModalIsOpen(true);
  useImperativeHandle(ref, () => ({
    showModal
  }));
  const switchIsChecked = (clotheName: string) => (
    selectedClothes.find(([name]) => name === clotheName)[1]
  );
  const setSwitch = (clotheName: string, index:number, isSelected: boolean) => { 
    SetSelectedClothes(old => old.map((infos) => (
      clotheName === infos[0] ? [clotheName, isSelected] : infos
    )));
  };

  return (
    <Modal show={modalIsOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('PASTE_LIST')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={e => {
            e.preventDefault();
            try {
              const listItem = sanitizeText(textArea, selectedClothes, isCycling, gender, selectedList);
              onSubmit(listItem as unknown as ListItem[]);
              setTextArea('');
              closeModal();
            }
            catch(e) {
              alert(e.message);
            }
          }}
        >
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
          <Form.Group className="mb-3">
            <Form.Control
              as="select"
              size="lg"
              aria-label="select gender"
              onChange={({ target }) => setGender(target.value)}
              placeholder={t('CSVID_GENDER')}
            >
              <option value="MALE">{t('MALE')}</option>
              <option value="FEMALE">{t('FEMALE')}</option>
              <option value="CHILDISH">{t('CHILDISH')}</option>
            </Form.Control>
          </Form.Group>
          {lists.length > 0 && (
            <Form.Group>
              <Form.Control
                as="select"
                size="lg"
                aria-label="select list"
                onChange={({ target }) => {
                  setSelectedList(target.value);
                }}
              >
                {lists.map((listName, i) => (
                  <option key={`${i}_listName`} value={listName}>{listName}</option>
                ))}
              </Form.Control>
            </Form.Group>
          )}
          <Form.Group>
            <Form.Control
              name="list"
              as="textarea"
              className="mt-4"
              placeholder={t('TEXTAREA_PLACEHOLDER_LIST')}
              style={{ height: '100px' }}
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
            />
            <span className='text-secondary'>
              <small>
                Name, number, size
              </small>
            </span>
          </Form.Group>
          <Button
            disabled={selectedClothes.every((item) => !item[1]) && gender !== 'default'}
            size="lg"
            type="submit"
            className="d-block w-100 mt-3"
          >
            {t('PASTE_LIST')}
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={() => {
            SetSelectedClothes(clotheInitialState);
            setTextArea('');
            closeModal();
          }}
        >
          {t('CLOSE')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export {
  ModalPasteList
};