import { ClothingParts } from '@shared/Catalog';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { ListItem, useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { TbodyBoilerPlate } from './components/TbodyBoilerPlate';
import { TheadBoilerplate } from './components/TheadBoilerplate';
import styles from './ReportInfos.module.css';

const formatTimestamp = (locale: string) => (
  new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeStyle: 'short' }).format(new Date)
);

export function ReportInfos() {
  const { t, i18n } = useTranslation();
  const { projectName, isCycling } = useCatalogState();
  const { state: listState } = useList();
  const { list } = useCatalogState();
  const [defaultList, setDefaultList] = useState<ListItem[]>([]);
  const [sublists, setSublists] = useState<Record<string, ListItem[]>>({});
  useEffect(() => {
    setDefaultList(listState.items.filter(item => item.list === ''));
    setSublists(list.reduce((prev, curr) => ({
      ...prev, [curr]: listState.items.filter(item => item.list === curr)
    }),{}));
  }, [listState, list]);
  return (
    <section className={`${styles.docA4} container-sm`} id='docForPrint'>
      <section className={styles.headerA4}>
        <section className="companyInfos">
          <input 
            className={styles.companyInfosInput}
            type="text"
            defaultValue={projectName}
            placeholder='Company name'
          />
          <p className={styles.companyInfosParagraph}>
            {t('PROCESSING_REPORT_TITLE')}
          </p>
          <p className={styles.companyInfosTimestamp}>
            {formatTimestamp(i18n.language)}
          </p>
        </section>
        <section className="reportInfos">
          <table>
            <tbody>
              <tr>
                <td className={styles.tdLabel}>
                  <label htmlFor="serviceOrder">{t('SERVICE_ORDER')}</label>
                </td>
                <td><input type="text" id="serviceOrder"/></td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>
                  <label htmlFor="client">{t('CLIENT')}</label>
                </td>
                <td><input type="text" id="client"/></td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>
                  <label htmlFor="requestData">{t('REQUEST_DATE')}</label>
                </td>
                <td><input type="date" id="requestData"/></td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>
                  <label htmlFor="deliveryDate">{t('DELIVERY_DATE')}</label>
                </td>
                <td><input type="date" id="deliveryDate"/></td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>
                  <label htmlFor="responsible">{t('REPONSIBLE')}</label>
                </td>
                <td><input type="text" id="responsible"/></td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>
                  <label htmlFor="payment">{t('PAYMENT_METHOD')}</label>
                </td>
                <td><input type="text" id="payment"/></td>
              </tr>
              <tr>
                <td className={styles.tdLabel}>
                  <label htmlFor="finalValue">{t('ORDERLIST_FINAL_VALUE')}</label>
                </td>
                <td><input type="text" id="finalValue"/></td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
      <h1 className='mt-3'>
        {
          isCycling ? t('CYCLING_CLOTHING') : t('CLOTHES')
        }
      </h1>
      {defaultList && (
        <table className='reportTable mx-auto'>
          <TheadBoilerplate isCycling={isCycling}/>
          <TbodyBoilerPlate isCycling={isCycling} list={defaultList}/>
        </table>
      )}
      {
        Object.entries(sublists).map(([key, listItems], i) =>(
          <>
            {list && (
              <section
                className='mt-4'
                key={`${key}__section__${i}`}
              >
                <h4 className='text-center'>{key}</h4>
                <table
                  className='mx-auto'
                >
                  <TheadBoilerplate isCycling={isCycling}/>
                  <TbodyBoilerPlate isCycling={isCycling} list={listItems}/>
                </table>
              </section>
            )}
          </>
        ))
      }
    </section>
  );
}
