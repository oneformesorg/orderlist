import { useCatalogState } from '@shared/Catalog/context/catalog';
import { ListItem, useList } from '@shared/List';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';
import { ClothingParts } from '@shared/Catalog';
import { DownloadCSVModal } from '@modules/DownloadCSVModal/DownloadCSVModal';
import { SendEmailModal } from '@modules/SendEmailModal/SendEmailModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';

// * [namelist, casualCLothing, cyclingCLothing][]
type Lists = [string, [ListItem[], ListItem[]]][]

const clothings:ClothingParts[] = ['pants', 'shorts', 'tanktop', 'tshirt', 'tshirtLong', 'vest', 'socks'];
const cyclingClothings:ClothingParts[] = ['pants', 'shorts', 'tshirt', 'tshirtLong', 'socks'];
export function OrderTable() {
  const { state } = useList();
  const { t } = useTranslation();
  const [sublists, setSublist] = useState<Lists>([]);
  const [isPrinted, setIsPrinted] = useState(false);
  const normalList = state.items.filter(({ isCycling, list }) => !isCycling && !list);
  const cyclingList = state.items.filter(({ isCycling, list }) => isCycling && !list);
  const catalogState = useCatalogState();

  useEffect(() => {
    catalogState.list.map((name) => {
      const cycling = state.items.filter(({ list, isCycling }) => list === name && isCycling);
      const normal = state.items.filter(({ list, isCycling }) => list === name && !isCycling);
      setSublist(old => ([
        ...old.filter(([nameList]) => nameList !== name), [name, [normal, cycling]]
      ]
      ));
    });
    setSublist(old => {
      return old.filter(([listName]) => state.items.some(({ list }) => list === listName));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogState, state]);
  return (
    <section id='tables-container'>
      {normalList.length > 0 && !catalogState.isCycling && (
        <Table id="tableOrderListItems" striped bordered hover>
          <TableHead isPrinted={isPrinted} listLength={normalList.length} clothings={clothings}/>
          <TableBody isPrinted={isPrinted} list={normalList} clothingList={clothings}/>
        </Table>
      )}
      {cyclingList.length > 0 && catalogState.isCycling && (
        <Table id="tableOrderListItems" striped bordered hover>
          <TableHead isPrinted={isPrinted} listLength={cyclingList.length} clothings={cyclingClothings} isCycling={true}/>
          <TableBody isPrinted={isPrinted} list={cyclingList} clothingList={cyclingClothings}/>
        </Table>
      )}
      {sublists?.map(([name, [normal, cycling]], i) => (
        <section key={`section_mai--${i}`}>
    
          {catalogState.isCycling ? (
            <>
              <h4 className='text-center mt-2' key={`${name}_${i}`}>{name}</h4>
              {cycling.length > 0 && (
                <Table id="tableOrderListItems" striped bordered hover key={`${i}_sublist--cycling`}>
                  <TableHead isPrinted={isPrinted} listLength={cycling.length} clothings={cyclingClothings} isCycling={true}/>
                  <TableBody isPrinted={isPrinted} list={cycling} clothingList={cyclingClothings}/>
                </Table>
              )}
            </>  
          ) : (
            <>
              {normal.length > 0 && (
                <>
                  <h4 className='text-center mt-2' key={`${name}_${i}`}>{name}</h4>
                  <Table id="tableOrderListItems" striped bordered hover key={`${i}_sublist--normal`}>
                    <TableHead isPrinted={isPrinted} listLength={normal.length} clothings={clothings}/>
                    <TableBody isPrinted={isPrinted} list={normal} clothingList={clothings}/>
                  </Table>
                </>
              )}
            </>
          )}
          
        </section>
      ))}
      {(sublists?.length > 0 || normalList.length > 0 || cyclingList.length > 0) && !isPrinted ? (
        <section className='mt-3 d-flex justify-content-end border-top p-3 gap-3'>
          <DownloadCSVModal />
          <SendEmailModal />
          <button 
            className='btn btn-primary d-flex gap-2 align-items-center'
            onClick={async () => {
              setIsPrinted(true);
              import('./printScreen')
                .then(mod => mod.PrintTable(t));
              setIsPrinted(false);
            }}
          >
            <FontAwesomeIcon icon={faCamera} />
            {t('TAKE_SCREENSHOT')}
          </button>
        </section>
      ) : null}
    </section>
  );
}
