import { GenericClothStructure, useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useCallback } from 'react';
import styles from './ticket.module.css';

type Props = {
  tagSize: {
    width: number
    height: number
  }
}

export function Tickets({ tagSize }: Props) {
  const { state: { items } } = useList();
  const { t } = useTranslation();
  
  const calcClothe = useCallback((clothe: GenericClothStructure) => (
    Object.entries(clothe).reduce((prev, [,{ size }]) => (
      size ? [...prev, size] : prev
    ),[])
  ), []);
  return (
    <section className='d-flex flex-wrap justify-content-center'>
      {
        items?.map(({ clothes, gender, name, number }, i) => (
          <div 
            key={`tag__${i}`} 
            className={styles.card}
            style={{
              minWidth: tagSize.width,
              minHeight: tagSize.height
            }}
          >
            <section>
              <p>
                {name}
              </p>
              <p>
                {number}
              </p>
            </section>
            <section className='d-flex align-items-center flex-wrap'>
              {calcClothe(clothes).map((size, i, arr) => (
                <span key={i}>
                  {t(`${gender}-${size}`)}
                  {i !== arr.length-1 ? '-' : ''}
                </span>
              ))}
            </section>
            <p>
              {t(gender)}
            </p>
          </div>
        ))
      }
    </section>
  );
}
