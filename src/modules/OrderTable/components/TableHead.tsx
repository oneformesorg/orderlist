import { faCoins, faEdit, faEye, faHandHoldingUsd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClothingParts } from '@shared/Catalog';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';

type Props = {
  listLength: number
  clothings: ClothingParts[]
  isCycling?: boolean
  isPrinted: boolean
}

export function TableHead({ listLength, clothings, isCycling, isPrinted }: Props) {
  const { t } = useTranslation();
  return (
    <thead>
      <tr>
        <td colSpan={14} className="text-center">
          <strong>
            {t('MAIN_TITLE')} -{' '}
            {`${t('CONTAINS_N_UNITS')} ${listLength}`}
          </strong>
        </td>
      </tr>
      <tr className="text-center">
        <th style={{ maxWidth: '50px' }}>
          <FontAwesomeIcon icon={faHandHoldingUsd} />
        </th>
        <th className="text-left">{t('NAME')}</th>
        <th>{t('NUMBER')}</th>
        {clothings.map((cloth, i) => (
          <th key={`${i}_${cloth}`} className="d-none d-md-table-cell">
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
