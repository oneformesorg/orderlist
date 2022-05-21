import { useCatalogState } from '@shared/Catalog/context/catalog';
import { ListItem, useList } from '@shared/List';
import React, { useEffect, useRef, useState } from 'react';
import { DownloadCSVModal } from '@modules/DownloadCSVModal/DownloadCSVModal';
import { SendEmailModal } from '@modules/SendEmailModal/SendEmailModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';
import { Table } from './components/Table';
import { clothings, cyclingClothings } from '@config/static';

// * [namelist, casualCLothing, cyclingCLothing][]
type Lists = [string, [ListItem[], ListItem[]]][]
const selectedClothes = (list: ListItem[]) => {
  return list.reduce((prev, list) => {
    return [
      ...prev,
      ...Object.entries(list.clothes)
        .filter(([, { quantity }]) => quantity > 0)
        .map(([key]) => key)
    ];
  }, [])
    .filter((cloth,pos, arr) => arr.indexOf(cloth) === pos);
};

export function OrderTable() {
  const { state } = useList();
  const { t } = useTranslation();
  const [sublists, setSublist] = useState<Lists>([]);
  const [isPrinted, setIsPrinted] = useState(false);
  const [normalList, setNormalList] = useState([]);
  const [cyclingList, setCyclingList] = useState([]);
  const catalogState = useCatalogState();
  const [sublistsCloths, setSublistCloths] = useState<{[key: string]: [string[], string[]]}>({});
  const [clothList, setClothList] = useState<string[]>([]);
  const [cyclingClothList, setCyclingClothList] = useState<string[]>([]);
  const defaultListNameRef = useRef<HTMLInputElement>(null);

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
    setNormalList(state.items.filter(({ isCycling, list }) => !isCycling && !list));
    setCyclingList(state.items.filter(({ isCycling, list }) => isCycling && !list));
  }, [catalogState, state]);
  
  useEffect(() => {
    setClothList(selectedClothes(normalList));
    setCyclingClothList(selectedClothes(cyclingList));
  },[cyclingList, normalList]);

  useEffect(() => {
    setSublistCloths(sublists.reduce((prev, [key, [normalList, cyclingList]]) => {
      prev[key] = [selectedClothes(normalList), selectedClothes(cyclingList)];
      return prev;
    }, {}));
  }, [sublists]);

  return (
    <section id='tables-container'>
      {normalList.length > 0 && !catalogState.isCycling && (
        <>

          {isPrinted && !defaultListNameRef.current?.value ? null : (
            <h4 className={`mt-2 ${isPrinted ? 'text-center' : ''}`}>
              <input 
                placeholder={t('DOWNLOAD_DEFAULT')}
                type="text"
                className={`${isPrinted ? 'text-center pt-2 border-0' : ''}`}
                ref={defaultListNameRef}
              />
            </h4>
          )}
          <Table 
            listName='' 
            isPrinted={isPrinted} 
            list={normalList} 
            clothingsInPrint={clothList} 
            clothings={clothings} 
            isCycling={false} 
            clothingList={clothings}
          />
          
        </>
      )}
      {cyclingList.length > 0 && catalogState.isCycling && (
        <>
          {isPrinted && !defaultListNameRef.current?.value ? null : (
            <h4 className={`mt-2 ${isPrinted ? 'text-center p-5' : ''}`}>
              <input 
                placeholder={t('DOWNLOAD_DEFAULT')}
                type="text"
                className={`${isPrinted ? 'text-center pt-2 border-0' : ''}`}
                ref={defaultListNameRef}
              />
            </h4>
          )}
          <Table 
            listName=''
            isPrinted={isPrinted}
            list={cyclingList}
            clothingsInPrint={cyclingClothList}
            clothings={cyclingClothings}
            isCycling={true}
            clothingList={cyclingClothings}
          />
        </>
      )}
      {sublists?.map(([name, [normal, cycling]], i) => (
        <section key={`section_mai--${i}`}>
    
          {catalogState.isCycling ? (
            <>
              {cycling.length > 0 ? (
                <>
                  <h4 className='text-center mt-2' key={`${name}_${i}`}>{name}</h4>
                  <Table 
                    listName={name} 
                    isPrinted={isPrinted} 
                    list={cycling} 
                    clothingsInPrint={sublistsCloths[name] ? sublistsCloths[name][1] : []} 
                    clothings={cyclingClothings} 
                    isCycling={true}
                    clothingList={cyclingClothings}
                  />
                </>
              ) : null}
            </>  
          ) : (
            <>
              {normal.length > 0 ? (
                <>
                  <h4 className='text-center mt-2' key={`${name}_${i}`}>{name}</h4>
                  <Table
                    listName={name} 
                    isPrinted={isPrinted} 
                    list={normal} 
                    clothingsInPrint={sublistsCloths[name] ? sublistsCloths[name][0] : []} 
                    clothings={clothings}
                    isCycling={false}
                    clothingList={clothings}
                  />
                </>
              ) : null}
            </>
          )}
          
        </section>
      ))}
      {(sublists?.length > 0 || normalList.length > 0 || cyclingList.length > 0) && !isPrinted ? (
        <div className="position-relative d-flex justify-content-center mt-2 mb-3 p-3">
          <section className='position-relative d-flex justify-content-center gap-3'>
            <DownloadCSVModal/>
            <SendEmailModal />
          </section>
          <section
            className='position-absolute w-100 d-flex align-items-center justify-content-end'
          >
            <button 
              className='btn btn-primary d-flex align-items-center'
              onClick={async () => {
                setIsPrinted(true);
                import('./printScreen')
                  .then(mod => mod.PrintTable(t))
                  .finally(() => {
                    setIsPrinted(false);
                  });
              }}
            >
              <FontAwesomeIcon icon={faCamera} />
            </button>
          </section>
        </div>
      ) : null}
    </section>
  );
}
