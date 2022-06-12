import { faCoins, faEdit, faEye, faHandHoldingUsd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClothingParts } from '@shared/Catalog';
import { useCatalog } from '@shared/Catalog/context/catalog';
import { ListItem, useList } from '@shared/List';
import { currencyConvert, sanitizeValue } from '@shared/utils/currencyCalc';
import { generateId } from '@shared/utils/generateId';
import { orderList, OrderOptions } from '@shared/utils/orderList';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import DeleteListAndItems from './DeleteListAndItems';
import style from './tableStyle.module.css';
import { ViewAndEditItem } from './VIewItem';

type Props = {
  clothings: string[]
  clothingsInPrint: string[]
  list: ListItem[]
  isCycling?: boolean
  isPrinted: boolean
  listName: string
  clothingList: ClothingParts[]
}

function TableComponent({
  clothings, 
  isCycling, 
  isPrinted, 
  list, 
  clothingsInPrint, 
  listName,
  clothingList
}: Props) {
  const { t, i18n } = useTranslation();
  const [pieces, setPieces] = useState(0);
  const { state: catalogState } = useCatalog();
  const { dispatch } = useList();
  const [tablePrice, setTablePrice] = useState(0);
  const [listForRender, setListForRender] = useState(() => list);
  const [currentOrder, setCurrentOrder] = useState<[string, OrderOptions]>();
  const renderSize = (quantity: number, size: string, clothName: string, gender: string) => {
    if(!size || !quantity){
      return '-';
    }
    if(clothName === 'socks'){
      if(gender === 'FEMALE' && quantity){
        return `${quantity}-FEM`;
      }
      if(gender === 'CHILDISH' && quantity){
        return `${quantity}-INF`;
      }
      return quantity || '-';
    }
    if(gender === 'FEMALE' && quantity){
      return `${quantity}-FEM-${catalogState.sizeList.female[size]}`;
    }
    if(gender === 'CHILDISH' && quantity){
      return `${quantity}-INF-${catalogState.sizeList.childish[size]}`;
    }
    return `${quantity}-${catalogState.sizeList.male[size]}`;
  };

  useEffect(() => {
    setTablePrice(list.reduce((prev ,{ clothes, isCycling, gender }) => {
      return prev += sanitizeValue(catalogState, gender, isCycling, clothes);
    }, 0));
  }, [catalogState, list]);
  
  const currencyConv = currencyConvert(
    i18n.language,
    i18n.language === 'pt-BR' ? 'BRL' : 'USD'
  );

  const [deleteList, setDeleteList] = useState<string[]>([]);
  const changeOrderList = useCallback((clothe: string, orderType: OrderOptions) => {
    const orderedList = orderList(orderType, list, clothe);
    setListForRender(orderedList);
  }, [list]);

  const countPieces = useMemo(() => (
    list.reduce((prev, { clothes }) => {
      const clotheCount = Object.entries(clothes)
        .reduce((prev, [,{ quantity }]) => prev+quantity, 0);
      return prev + clotheCount;
    }, 0)
  ), [list]);
  useEffect(() => {
    setPieces(countPieces);
    currentOrder ? changeOrderList(currentOrder[0], currentOrder[1]) : setListForRender(list);
  }, [changeOrderList, countPieces, currentOrder, list]);

  useEffect(() => {
    currentOrder?.length > 0 ?? 
      changeOrderList(currentOrder[0], currentOrder[1]);
  }, [changeOrderList, currentOrder]);

  return (
    <table>
      <thead>
        <tr className='totalPieces'>
          <td colSpan={14} className="text-end p-2">
            {`${t('CONTAINS_N_UNITS')} ${pieces}`}
          </td>
        </tr>
        <tr className="text-center">
          <th style={{ maxWidth: '50px' }}>
            <FontAwesomeIcon icon={faHandHoldingUsd} />
          </th>
          <th className="text-left">{t('NAME')}</th>
          <th>{t('NUMBER')}</th>
          {isPrinted ? (
            <>
              {clothingsInPrint.map((cloth, i) => (
                <th key={`${i}_${cloth}`} className="d-none d-md-table-cell d-flex align-items-center p-1">
                  <Image
                    alt={'cloths illustration'}
                    src={
                      isCycling && cloth !== 'socks' ? `/images/cycling/${cloth}.png` : `/images/${cloth}.png`
                    }
                    height={25}
                    width={25}
                  />
                </th>
              ))}
            </>
          ) : (
            <>
              {clothings.map((cloth, i) => (
                <th key={`${i}_${cloth}`} className="d-none d-md-table-cell d-flex align-items-center p-1">
                  <OverlayTrigger 
                    placement='top'
                    delay={{ show: 200, hide: 400 }}
                    overlay={
                      <Tooltip>
                        {t('ORGANIZE_BY')} {t(`CSVID_${cloth.toUpperCase()}`)}
                      </Tooltip>
                    }
                  >
                    <button onClick={() => {
                      if(!currentOrder){
                        changeOrderList(cloth, 'DECREASING');
                        setCurrentOrder([cloth, 'DECREASING']);
                        return;
                      }
                      if(currentOrder[0] === cloth){
                        if(currentOrder[1] === 'DECREASING'){
                          setCurrentOrder([cloth, 'INCREASING']);
                          changeOrderList(cloth, 'INCREASING');
                        }else {
                          setCurrentOrder([cloth, 'DECREASING']);
                          changeOrderList(cloth, 'DECREASING');
                        }
                      }else {
                        changeOrderList(cloth, 'DECREASING');
                        setCurrentOrder([cloth, 'DECREASING']);
                      }
                    }} aria-label='order list'>
                      <Image
                        alt={'cloths illustration'}
                        src={
                          isCycling && cloth !== 'socks' ? `/images/cycling/${cloth}.png` : `/images/${cloth}.png`
                        }
                        height={25}
                        width={25}
                      />
                    </button>
                  </OverlayTrigger>
                </th>
              ))}
            </>
          )
          }
          <th>
            <FontAwesomeIcon icon={faCoins} />
          </th>
          {!isPrinted && (
            <>
              <th className='d-none d-md-table-cell'>
                <FontAwesomeIcon icon={faEdit} />
              </th>
              <th className='d-none d-md-table-cell'>
                <DeleteListAndItems listName={listName}/>
              </th>
              <th className='d-table-cell d-md-none'>
                <FontAwesomeIcon icon={faEye} />
              </th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {list.length === 0 ? (
          <tr>
            <td colSpan={99} className='text-center'>
              {t('LIST_EMPTY')}
            </td>
          </tr>
        ) : (
          <>
            {listForRender.map((props) => (
              <tr key={`${generateId()}_checkbox`}>
                <td className={style.tableCell}>
                  <label className={style.ghostLabel} htmlFor={`checkbox_${props.id}`} />
                  <input
                    id={`checkbox_${props.id}`}
                    type="checkbox"
                    onChange={e => (
                      e.target.checked 
                        ? setDeleteList(old => [...old, props.id])
                        : setDeleteList(old => old.filter(id => id !== props.id))
                    )}
                    checked={deleteList.some(id => id === props.id)}
                  />
                </td>
                <td className={style.tableCell}>
                  {props.name}
                </td>
                <td className={style.tableCell}>
                  {props.number || ''}
                </td>
                {isPrinted ? (
                  <>
                    {clothingsInPrint.map((currCloth, i) => (
                      <td className={`${style.tableCell} d-none d-md-table-cell`} key={`clothing_${i}_quantity`}>
                        {
                          renderSize(
                            props.clothes[currCloth].quantity,
                            props.clothes[currCloth].size,
                            currCloth,
                            props.gender
                          )
                        }
                      </td>
                    ))}
                  </>
                ) : (
                  <>
                    {clothingList.map((currCloth, i) => (
                      <td className={`${style.tableCell} d-none d-md-table-cell`} key={`clothing_${i}_quantity`}>
                        {
                          renderSize(
                            props.clothes[currCloth].quantity,
                            props.clothes[currCloth].size,
                            currCloth,
                            props.gender
                          )
                        }
                      </td>
                    ))}
                  </>
                )}
                <td className={style.tableCell}>
                  {currencyConv(sanitizeValue(catalogState, props.gender, props.isCycling, props.clothes))}              
                </td>
                {!isPrinted && (
                  <>
                    <td className={`${style.tableCell} d-none d-md-table-cell`}>
                      {/* <FontAwesomeIcon icon={faEdit} /> */}
                      <ViewAndEditItem id={props.id} icon={faEdit}/>
                    </td>
                    <td className={`${style.tableCell} text-danger d-none d-md-table-cell`}>
                      {/* <FontAwesomeIcon icon={faTrash} /> */}
                      <ConfirmDeleteModal id={props.id} />
                    </td>
                    <th className={`${style.tableCell} d-table-cell d-md-none`}>
                      {/* <FontAwesomeIcon icon={faEye} /> */}
                      <ViewAndEditItem id={props.id} icon={faEye}/>
                    </th>
                  </>
                )}
              </tr>
            ))}
          </>
        )}
      </tbody>
      <tfoot>
        <tr>
          {
            deleteList?.length ? (
              <td colSpan={99} className='p-2'>
                <button 
                  onClick={() => {
                    dispatch({
                      type: 'deleteMultipleItems',
                      payload: deleteList
                    });
                    setDeleteList([]);
                  }}
                  className='ms-auto btn btn-danger d-flex align-items-center gap-2'
                >
                  <FontAwesomeIcon icon={faTrash}/>
                  {t('DELETE')}
                </button>
              </td>
            ) : null
          }
        </tr>
        <tr>
          {isPrinted && (
            <td colSpan={99} className={'text-align-end'}>
              <p className='d-flex m-0 justify-content-end'>
              Total:
                <span className='mx-2'>
                  {currencyConv(tablePrice)}
                </span>
              </p>
            </td>
          )}
        </tr>
      </tfoot>
    </table>
  );
}
export const Table = memo(TableComponent, (
  { ...prevProps }, 
  { ...nextProps }
) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});
