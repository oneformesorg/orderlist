import { useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './ticket.module.css';

type Props = {
  tagSize: {
    width: number
    height: number
  }
}

export function Tickets({ tagSize }: Props) {
  const { state: { items } } = useList();
  const [listItems, setListItems] = useState<string[][]>();
  const { t } = useTranslation();
  useEffect(() => {
    const sanitizedItems = items.reduce((prev, curr) => {
      const arr = Object.entries(curr.clothes).map(([key, { quantity, size }]) => {
        if(quantity > 0){
          return [key, size, curr.gender];
        }
        return;
      }).filter(item => item);

      return [...prev, ...arr];
    }, []);

    setListItems(sanitizedItems);
  }, [items]);

  return (
    <section className='d-flex flex-wrap justify-content-center'>
      {
        listItems?.map(([clothe, size, gender], i) => (
          <div 
            key={`tag__${i}`} 
            className={styles.card}
            style={tagSize}
          >
            <p>
              {t(size)}
            </p>
            <Image 
              src={`/images/${clothe}.png`}
              height={54}
              width={54}
              alt=''
            />
            <p>
              {t(gender)}
            </p>
          </div>
        ))
      }
    </section>
  );
}
