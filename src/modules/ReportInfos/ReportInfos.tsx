import { ClothingParts } from '@shared/Catalog';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import styles from './ReportInfos.module.css';

const formatTimestamp = (locale: string) => (
  new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeStyle: 'short' }).format(new Date)
);

const clothes: ClothingParts[] = ['pants', 'shorts', 'tanktop', 'tshirt', 'tshirtLong', 'vest', 'socks'];
const cyclingClothes = ['pants', 'shorts', 'tshirt', 'tshirtLong', 'socks'];

export function ReportInfos() {
  const { t, i18n } = useTranslation();
  const { projectName, isCycling } = useCatalogState();
  const { state: listState } = useList();
  const { list } = useCatalogState();
  useEffect(() => {
    const defaultList = listState.items.filter(item => item.list === '');
    const sublists = list.reduce((prev, curr) => ({
      ...prev, [curr]: listState.items.filter(item => item.list === curr)
    }),{});

    console.log(defaultList, sublists);
  }, [listState, list]);
  return (
    <section className={`container-sm ${styles.docA4}`} id='docForPrint'>
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
      <h1>
        {
          isCycling ? t('CYCLING_CLOTHING') : t('CLOTHES')
        }
      </h1>
      <table className='reportTable'>
        <thead>
          <th>
            {t('GENDER')}
          </th>
          <th></th>
        </thead>
      </table>
    </section>
  );
}
