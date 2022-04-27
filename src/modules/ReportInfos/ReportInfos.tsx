import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { ListItem, useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { imagesCardContext } from '@pages/catalog/relatorio';
import styles from './ReportInfos.module.css';
import { clotheSwitch } from './utils/clotheSwitch';
import Image from 'next/image';
import { TableForPrint } from './components/TableForPrint';

const formatTimestamp = (locale: string) => (
  new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeStyle: 'short' }).format(new Date)
);

export type ReportInfosProps = {
  onDelete: (id: number) => void
}

export function ReportInfos({ onDelete }: ReportInfosProps) {
  const { t, i18n } = useTranslation();
  const { projectName, isCycling } = useCatalogState();
  const { state: listState } = useList();
  const { list } = useCatalogState();
  const [defaultList, setDefaultList] = useState<ListItem[]>([]);
  const [sublists, setSublists] = useState<Record<string, ListItem[]>>({});
  const { images } = useContext(imagesCardContext);
  const [textArea, setTextArea] = useState('');

  const countPieces = (piece: string) => {
    return listState.items
      .filter(({ isCycling: cyclingMode }) => cyclingMode === isCycling)
      .reduce((prev, { clothes }) => {
        return prev + (clothes[piece].quantity | 0) ;
      }, 0);
    return 0;
  };
  const totalCountPieces = () => {
    return listState.items
      .filter(({ isCycling: cyclingMode }) => cyclingMode === isCycling)
      .reduce((prev, { clothes }) => {
        const clotheCount = Object.entries(clothes)
          .reduce((prev, [,{ quantity }]) => prev+=(quantity | 0), 0);
        return prev += clotheCount;
      }, 0);
    return 0;
  };

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
      {defaultList.length > 0 && (
        <TableForPrint isCycling={isCycling} list={defaultList}/>
      )}
      {
        Object.entries(sublists).map(([key, listItems], i) =>(
          <section key={`sublist__item__${i}`}>
            {listItems.length > 0 ? (
              <section
                className='mt-4'
                key={`${key}__section__${i}`}
              >
                <h4 className='text-center'>{key}</h4>
                <TableForPrint isCycling={isCycling} list={listItems}/>
              </section>
            ) : null}
          </section> 
        ))
      }
      <section className='my-4'>
        <h4>{t('REPORT_PIECES_COUNTING')}</h4>
        <table className='mx-auto'>
          <tbody>
            {clotheSwitch(isCycling).map((clothe, i) => (
              <React.Fragment key={`${clothe}__${i}`}>
                <td className='p-2'>
                  <Image
                    src={
                      isCycling 
                        ? `/images/cycling/${clothe}.png`
                        : `/images/${clothe}.png`
                    }
                    alt={`${clothe} illustration`}
                    height={25}
                    width={25}
                  />
                </td>
                <td className='p-3'>
                  {countPieces(clothe)}
                </td>
              </React.Fragment>
            ))}
            <td className='font-weight-bold p-3'>
              Total
            </td>
            <td className='p-3'>
              {totalCountPieces()}
            </td>
          </tbody>
        </table>
      </section>
      <section className={`m-3 mt-5 form-floating ${textArea ? '' : styles.textArea}`}>
        <textarea 
          className="form-control" placeholder="" id="floatingTextarea"
          value={textArea}
          onChange={e => setTextArea(e.target.value)}
        ></textarea>
        <label htmlFor="floatingTextarea">{t('ANNOTATIONS')}</label>
      </section>
      <section className='mb-5'>
        {images.length > 0 && (
          <h2 className='border-bottom'>Images</h2>
        )}
        <section className="d-flex gap-2 flex-wrap ">
          {images.map(({ image, description }, i) => (
            <section 
              key={`card-image__${i}`}
              className={`card ${styles.imageCard} align-self-start`}
              style={{ width: '30%' }}
            >
              <button 
                onClick={() => onDelete(i)}
                className={`${styles.deleteImageButton} btn btn-danger rounded`}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>    
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} className="card-img-top" alt="..." />
              {description && (
                <section className="card-body">
                  <p className="card-text">
                    {description}
                  </p>
                </section>
              )}
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}