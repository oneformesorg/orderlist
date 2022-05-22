import { useList } from '@shared/List';
import { generateId } from '@shared/utils/generateId';
import { orderedItems } from '@shared/utils/groupItemsBySize';
import { TFunction, useTranslation } from 'next-i18next';
import React, { useState } from 'react';

type ListProps = {
  arr:  [string, unknown][]
  t: TFunction
  gender?: 'MALE' | 'CHILDISH'
}

const List = ({ arr, t, gender = 'MALE' }: ListProps) => (
  <>
    {arr.map((arr) => (
      <>
        {Object.entries(arr[1]).map(([size, quantity], mainIndex, arrComplete) => (
          <React.Fragment key={generateId()}>
            <>
              {t(`CSVID_${arr[0].toUpperCase()}`)}-{quantity}-{t(`${gender}-${size}`)}
              {arrComplete.length-1 === mainIndex  ? '' : ', '} 
            </>
          </React.Fragment>
        ))}
      </>  
    )
    )}
  </>
);

export function TotalPieces() {
  const { t } = useTranslation();
  const { state: listState } = useList();
  const [female] = useState(() => (
    orderedItems({
      clothes: listState.items.filter(i => i.gender === 'FEMALE').map(i => i.clothes)
    })
  ));
  const [childish] = useState(() => (
    orderedItems({
      clothes: listState.items.filter(i => i.gender === 'CHILDISH').map(i => i.clothes)
    })
  ));
  const [male] = useState(() => (
    orderedItems({
      clothes: listState.items.filter(i => i.gender === 'MALE').map(i => i.clothes)
    })
  ));

  return (
    <table style={{ margin: 'auto', marginBottom: '12px', width: '100%' }}>
      <tbody>
        {male.length > 0 && (
          <tr style={{
            border: '1px solid #000'
          }}>
            <td style={{
              padding: '4px 12px',
            }}>{t('MALE')}</td>
            <td style={{
              padding: '4px 12px',
            }}>
              <List t={t} arr={male}/>
            </td>
          </tr>
        )}
        {female.length > 0 && (
          <tr style={{
            border: '1px solid #000'
          }}>
            <td style={{
              padding: '4px 12px',
            }}>{t('FEMALE')}</td>
            <td style={{
              padding: '4px 12px',
              fontSize: '1.2rem'
            }}>
              <List t={t} arr={female}/>
            </td>
          </tr>
        )}
        {childish.length > 0 && (
          <tr style={{
            border: '1px solid #000'
          }}>
            <td style={{
              padding: '4px 12px'
            }}>{t('CHILDISH')}</td>
            <td style={{
              padding: '4px 12px'
            }}>
              <List t={t} arr={childish} gender="CHILDISH"/>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
