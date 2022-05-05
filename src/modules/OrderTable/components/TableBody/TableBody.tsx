import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClothingParts } from '@shared/Catalog';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { ListItem, useList } from '@shared/List';
import { currencyConvert, sanitizeValue } from '@shared/utils/currencyCalc';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import { ViewAndEditItem } from '../VIewItem';
import style from './style.module.css';

type Props = {
  list: Array<ListItem>
  clothingsInPrint: string[]
  clothingList: ClothingParts[]
  isPrinted: boolean
}

export function TableBody({ list, clothingList, isPrinted, clothingsInPrint }: Props) {
  const { t, i18n } = useTranslation();
  const catalogState = useCatalogState();
  const { dispatch } = useList();
  const [totalValue, setTotalValue] = useState(0);
  useEffect(() => {
    const value = list.reduce((prev, props) => (
      prev+sanitizeValue(catalogState, props.gender, props.isCycling, props.clothes)
    ), 0);

    setTotalValue(value);
  }, [list, catalogState]);
  const currencyConv = currencyConvert(
    i18n.language,
    i18n.language === 'pt-BR' ? 'BRL' : 'USD'
  );
  const [deleteList, setDeleteList] = useState<string[]>([]);
  if(list.length === 0){
    return (
      <tbody>
        <tr>
          <td colSpan={99} className='text-center'>
            {t('LIST_EMPTY')}
          </td>
        </tr>
      </tbody>
    );
  }
  
  return (
    <>
      <tbody>
        {list.map((props) => (
          <tr key={`${props.id}_checkbox`}>
            <td className={style.tableCell}>
              <input
                type="checkbox"
                onChange={e => (
                  e.target.checked 
                    ? setDeleteList(old => [...old, props.id])
                    : setDeleteList(old => old.filter(id => id !== props.id))
                )}
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
                      currCloth === 'socks' ?
                        `${props.clothes[currCloth].quantity || '-'}` :
                        `${props.clothes[currCloth].quantity || ''} - ${t(props.clothes[currCloth].size)}`
                    }
                  </td>
                ))}
              </>
            ) : (
              <>
                {clothingList.map((currCloth, i) => (
                  <td className={`${style.tableCell} d-none d-md-table-cell`} key={`clothing_${i}_quantity`}>
                    {
                      currCloth === 'socks' ?
                        `${props.clothes[currCloth].quantity || '-'}` :
                        `${props.clothes[currCloth].quantity || ''} - ${t(props.clothes[currCloth].size)}`
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
                  {currencyConv(totalValue)}
                </span>
              </p>
            </td>
          )}
        </tr>
      </tfoot>
    </>
  );
}
