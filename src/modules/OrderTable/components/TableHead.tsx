import { faCoins, faEdit, faEye, faHandHoldingUsd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem } from '@shared/List';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
  clothings: string[]
  clothingsInPrint: string[]
  list: ListItem[]
  isCycling?: boolean
  isPrinted: boolean
}

export function TableHead({ clothings, isCycling, isPrinted, list, clothingsInPrint }: Props) {
  const { t } = useTranslation();
  const [pieces, setPieces] = useState(0);
  
  useEffect(() => {
    const countedPieces = list.reduce((prev, { clothes }) => {
      const clotheCount = Object.entries(clothes)
        .reduce((prev, [,{ quantity }]) => prev+quantity, 0);
      return prev + clotheCount;
    }, 0);
    setPieces(countedPieces);
  }, [list]);
  return (
    <thead>
      <tr className='totalPieces'>
        <td colSpan={14} className="text-center p-2">
          {t('MAIN_TITLE')} -{' '}
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
              <FontAwesomeIcon icon={faTrash} />
            </th>
            <th className='d-table-cell d-md-none'>
              <FontAwesomeIcon icon={faEye} />
            </th>
          </>
        )}
      </tr>
    </thead>
  );
}
