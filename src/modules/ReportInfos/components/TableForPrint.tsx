import { ListItem } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { clotheSwitch } from '../utils/clotheSwitch';

const clotheTranslated = {
  'pants': 'CSVID_PANTS', 
  'shorts': 'CSVID_SHORTS', 
  'tanktop': 'CSVID_TANKTOP', 
  'tshirt': 'CSVID_TSHIRT', 
  'tshirtLong': 'CSVID_TSHIRTLONG', 
  'vest': 'CSVID_VEST', 
  'socks': 'CSVID_SOCKS'
};

type Props = {
  isCycling: boolean
  list: ListItem[]
}

export function TableForPrint({ isCycling , list }: Props) {
  const { t } = useTranslation();
  return (
    <table className='mx-auto'>
      <thead>
        <td className='text-center'>
          {t('GENDER')}
        </td>
        <td className='text-center'>{t('NAME')}</td>
        <td className='text-center'>{t('NUMBER')}</td>
        { clotheSwitch(isCycling).map((clotheName, i) => (
          <td 
            key={`${clotheName}_${i}`}
            className='text-center'
          >
            {t(clotheTranslated[clotheName])}
          </td>
        )) }
      </thead>
      <tbody>
        {list.map(({ gender, name, number, clothes, id }) => (
          <tr key={id}>
            <td className='text-center px-2'>
              {t(gender)}
            </td>
            <td className='text-center px-2'>
              {name}
            </td>
            <td className='text-center px-2'>
              {number}
            </td>
            {clotheSwitch(isCycling).map((clotheName, i) => (
              <td 
                className='text-center px-2'
                key={`${i}_${clotheName}`}
              >
                {
                  clotheName === 'socks' 
                    ? (
                      clothes[clotheName].quantity || '-'
                    ) 
                    : `${clothes[clotheName].quantity || ''}-${t(clothes[clotheName].size)}`
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
