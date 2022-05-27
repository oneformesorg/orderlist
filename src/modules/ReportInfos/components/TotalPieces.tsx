import { useCatalogState } from '@shared/Catalog/context/catalog';
import { useList } from '@shared/List';
import { generateId } from '@shared/utils/generateId';
import { orderedItems } from '@shared/utils/groupItemsBySize';
import { TFunction, useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type ListProps = {
  arr:  [string, unknown][]
  t: TFunction
  gender?: 'MALE' | 'CHILDISH'
}
type ListSizeClothe = Record<string, Record<string, number>>
const List = ({ arr, t, gender = 'MALE' }: ListProps) => {
  const [head, setHed] = useState<string[]>();
  const [sizeSidebar, setSizeSidebar] = useState<string[]>();
  const [sizeCothe, setSizeClothe] = useState<ListSizeClothe>();
  const { isCycling } = useCatalogState();
  useEffect(() => {
    setHed(arr.map(i => i[0]));
    setSizeSidebar(
      arr
        .reduce((prev,i) => [...prev, ...Object.entries(i[1]).reduce((prev, [key]) => [...prev,key], [])],[])
        .filter((i,index, arr) => arr.indexOf(i) === index)
    );
    setSizeClothe(arr.reduce((prev, [key, value]) => {
      prev[key] = value;
      return prev;
    },{}));
  }, [arr]);

  return (
    <table>
      <thead>
        <tr>
          <td className='p-2 text-center'> -</td>
          {head?.map(cloth => (
            <td className='p-2 text-center' key={generateId()}>
              <Image
                alt={'cloths illustration'}
                src={
                  isCycling && cloth !== 'socks' ? `/images/cycling/${cloth}.png` : `/images/${cloth}.png`
                }
                height={25}
                width={25}
              />
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {sizeSidebar?.map(size => (
          <React.Fragment key={generateId()}>
            <tr>
              <td className='p-2 text-center'>
                {
                  `${t(`${gender}-${size}`)}`
                }
              </td>
              {head?.map(clotheName => (
                <td className='p-2 text-center' key={generateId()}>
                  {sizeCothe[clotheName][size]}
                </td>
              ))}
              
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export function TotalPieces() {
  const { t } = useTranslation();
  const { state: listState } = useList();
  const [female, setFemale] = useState<[string, unknown][]>([]);
  const [childish, setChildish] = useState<[string, unknown][]>([]);
  const [male, setMale] = useState<[string, unknown][]>([]);
  useEffect(() => {
    setMale(
      orderedItems({
        clothes: listState.items.filter(i => i.gender === 'MALE').map(i => i.clothes)
      })
    );
    setFemale(
      orderedItems({
        clothes: listState.items.filter(i => i.gender === 'FEMALE').map(i => i.clothes)
      })
    );
    setChildish(
      orderedItems({
        clothes: listState.items.filter(i => i.gender === 'CHILDISH').map(i => i.clothes)
      })
    );
  }, [listState.items]);
  return (
    <>
      <section className='d-flex gap-2 justify-content-center'>
        {male.length > 0 && (
          <section>
            <p className='m-0'>{t('MALE').toUpperCase()}</p>
            <List t={t} arr={male}/>
          </section >
        )}
        {female.length > 0 && (
          <section>
            <p className='m-0'>{t('FEMALE').toUpperCase()}</p>
            <List t={t} arr={female}/>
          </section >
        )}
        {childish.length > 0 && (
          <section>
            <p className='m-0'>{t('CHILDISH').toUpperCase()}</p>
            <List t={t} arr={childish} gender="CHILDISH"/>
          </section >
        )}
      </section>
    </>
  );
}
