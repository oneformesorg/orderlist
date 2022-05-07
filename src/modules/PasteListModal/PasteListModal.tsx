import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useRef } from 'react';
import { ModalPasteList, ModalPasteListRef } from './components/modal';

export function PasteListModal() {
  const { t } = useTranslation();
  const modalPasteListRef = useRef<ModalPasteListRef>(null);
  const { dispatch: listDispatch } = useList();
  const { isCycling, list } = useCatalogState();
  return (
    <>
      <button 
        className='btn d-flex align-items-center gap-3'
        onClick={() => modalPasteListRef.current.showModal()}
      >
        <FontAwesomeIcon icon={faClipboard} />
        <span className='ml-1'>
          {t('PASTE_LIST')}
        </span>
      </button>
      <ModalPasteList 
        ref={modalPasteListRef}
        isCycling={isCycling}
        lists={list}
        onSubmit={lists => {
          lists.map(list => {
            listDispatch({
              type: 'addItem',
              payload: list
            });
          });
        }}
      />
    </>
  );
}
