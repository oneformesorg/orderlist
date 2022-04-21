import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CatalogContent, ClothingParts } from '@shared/Catalog';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { AdultCloths, ChildishCloths, ListItem } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React from 'react';
import style from './style.module.css';

type Props = {
  list: Array<ListItem>
}

function sanitizeValue(
  catalog: CatalogContent,
  gender:  'MALE' | 'FEMALE' | 'CHILDISH',
  isCycling: boolean,
  clothes: ChildishCloths | AdultCloths
){
  const priceCatalog = {
    'MALE': () => isCycling ? catalog.cyclingPriceTableMale : catalog.priceTableMale,
    'FEMALE': () => isCycling ? catalog.cyclingPriceTableFemale : catalog.priceTableFemale,
    'CHILDISH': () => isCycling ? catalog.cyclingPriceTableChildish : catalog.priceTableChildish
  };

  if(gender === 'CHILDISH'){
    //const { clothe, quantity, size } = clothes as ChildishCloths;
    //console.log(priceCatalog[gender][clothe]);
  }
  
  return 0;
}

const clothings:ClothingParts[] = ['pants', 'shorts', 'tanktop', 'tshirt', 'tshirtLong', 'vest', 'socks'];

export function TableBody({ list }: Props) {
  const { t } = useTranslation();
  const catalogState = useCatalogState();
  
  return (
    <tbody>
      {list.map((props) => (
        <tr key={props.id}>
          <td className={style.tableCell}>
            <input
              type="checkbox"
            />
          </td>
          <td className={style.tableCell}>
            {props.name}
          </td>
          <td className={style.tableCell}>
            {props.number}
          </td>
          {clothings.map((currCloth) => (
            <td className={`${style.tableCell} d-none d-md-table-cell`} key={`clothing_${props.id}`}>
              {
                currCloth === 'socks' ?
                  `${props.clothes[currCloth].quantity || '-'}` :
                  `${props.clothes[currCloth].quantity || ''} - ${t(props.clothes[currCloth].size)}`
              }
            </td>
            
          ))}
          <td className={style.tableCell}>
            {/* {sanitizeValue(catalogState, props.gender, props.isCycling, props.clothes)}               */}
          </td>
          <td className={`${style.tableCell} d-none d-md-table-cell`}>
            <FontAwesomeIcon icon={faEdit} />
          </td>
          <td className={`${style.tableCell} text-danger d-none d-md-table-cell`}>
            <FontAwesomeIcon icon={faTrash} />
          </td>
          <th className={`${style.tableCell} d-table-cell d-md-none`}>
            <FontAwesomeIcon icon={faEye} />
          </th>
        </tr>
      ))}
    </tbody>
  );
}
