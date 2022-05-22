import { ListItem } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

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
  list: ListItem[]
}

export function TableForPrint({ list }: Props) {
  const { t } = useTranslation();
  const [clotheList, setClotheList] = useState<string[]>([]);

  const renderSize = (quantity: number, size: string, clothName?: string) => {
    if(clothName === 'socks'){
      return quantity || '-';
    }
    if(!size || !quantity){
      return '-';
    }
    return `${quantity}-${t(size)}`;
  };

  useEffect(() => {
    const sanitizedList = list.reduce((prev, list) => {
      return [
        ...prev,
        ...Object.entries(list.clothes)
          .filter(([, { quantity }]) => quantity > 0)
          .map(([key]) => key)
      ];
    }, []);
    const uniqueList = sanitizedList.filter((cloth, pos) => (
      sanitizedList.indexOf(cloth) === pos
    ));
    setClotheList(uniqueList);
  }, [list]);
  return (
    <table className='mx-auto'>
      <thead>
        <td>
        -
        </td>
        <td className='text-center'>
          {t('GENDER')}
        </td>
        <td className='text-center'>{t('NAME')}</td>
        <td className='text-center'>{t('NUMBER')}</td>
        { clotheList.map((clotheName, i) => (
          <td 
            key={`${clotheName}_${i}`}
            className='text-center'
          >
            {t(clotheTranslated[clotheName])}
          </td>
        )) }
        <td>
          Observações
        </td>
      </thead>
      <tbody>
        {list.map(({ gender, name, number, clothes, id }) => (
          <tr key={id}>
            <td>
        ⠀
            </td>
            <td className='text-center px-2'>
              {t(gender)}
            </td>
            <td className='text-center px-2'>
              {name}
            </td>
            <td className='text-center px-2'>
              {number}
            </td>
            {clotheList.map((clotheName, i) => (
              <td 
                className='text-center px-2'
                key={`${i}_${clotheName}`}
              >
                {
                  renderSize(
                    clothes[clotheName].quantity,
                    `${gender}-${clothes[clotheName].size}`,
                    clotheName  
                  )
                }
              </td>
            ))}
            <td>ㅤ</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
