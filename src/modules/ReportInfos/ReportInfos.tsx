import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCatalogState } from '@shared/Catalog/context/catalog';
import { ListItem, useList } from '@shared/List';
import { useTranslation } from 'next-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { imagesCardContext } from '@pages/catalog/relatorio';
import styles from './ReportInfos.module.css';
import Image from 'next/image';
import { TableForPrint } from './components/TableForPrint';
import autosize from 'autosize';
import { ReportInfosComments } from './components/ReportInfosComments';

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
  const [uniqueList, setUniqueList] = useState<string[]>([]);

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
    autosize(document.querySelectorAll('textarea'));
  }, []);
  useEffect(() => {
    autosize(document.querySelector('textarea.form-control'));
    const sanitizedList = listState.items.reduce((prev, list) => {
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
    setUniqueList(uniqueList);
  }, [listState]);
  useEffect(() => {
    setDefaultList(listState.items.filter(item => item.list === ''));
    setSublists(list.reduce((prev, curr) => ({
      ...prev, [curr]: listState.items.filter(item => item.list === curr)
    }),{}));
  }, [listState, list]);
  return (
    <section className={`${styles.docA4} container-sm`} id='docForPrint'>
      <div className={styles.headerA4}>
        <section>
          <input 
            aria-describedby='productTitle' 
            alt='Company name input' type="text" 
            placeholder={t('COMPANY_NAME')}
          />
          <h1 className={styles.reportTitle}>
            {t('PROCESSING_REPORT_TITLE')}
          </h1>
          <p>
            {formatTimestamp(i18n.language)}
          </p>
        </section>

        <table>
          <tbody>
            <tr>
              <td className={styles.orderInfoLabel}>
                Pedido
              </td>
              <td className={styles.orderInfoFields}>
                <input type="text" name="" id="" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <section className={styles.orderInfo}>
        <table>
          <tbody>
            <tr>
              <td>Cor meião</td>
              <td colSpan={2}><input type="text" name="" id="" /></td>
              
              <td>Marca meião</td>
              <td colSpan={2}><input type="text" name="" id="" /></td>
            </tr>
            <tr>
              <td>Tecido calção</td>
              <td><input type="text" name="" id="" /></td>
              <td>largura</td>
              <td><input type="text" name="" id="" /></td>
              <td 
                colSpan={2}
                rowSpan={3}
              >
                <p className="text-center">Prova de cor</p>
                <div className='d-flex gap-2 justify-content-center'>
                  <div className='d-inline-flex align-items-center'>
                    <input 
                      type="radio"
                      name="teste"
                      id="yes"
                    />
                    <label 
                      htmlFor="yes"
                      style={{
                        marginLeft: '4px'
                      }}
                    >
                      Sim
                    </label>
                  </div>
                  <div className='d-inline-flex align-items-center'>
                    <input 
                      type="radio"
                      name="teste"
                      id="no"
                    />
                    <label 
                      htmlFor="no"
                      style={{
                        marginLeft: '4px'
                      }}
                    >
                      Não
                    </label>
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid #000',
                    height: '24px'
                  }}
                >
                  {' '}
                </div>
              </td>
            </tr>
            <tr>
              <td>Tecido camisa</td>
              <td><input type="text" name="" id="" /></td>
              <td>Largura</td>
              <td><input type="text" name="" id="" /></td>
            </tr>
            <tr>
              <td>Papel</td>
              <td><input type="text" name="" id="" /></td>
              <td>Largura</td>
              <td><input type="text" /></td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>Client</td>
              <td><input type="text" name="" id="" /></td>
            </tr>
            <tr>
              <td>Request date</td>
              <td><input type="date" name="" id="" /></td>
            </tr>
            <tr>
              <td>Delivery date</td>
              <td><input type="date" name="" id="" /></td>
            </tr>
            <tr>
              <td>Vendedor</td>
              <td><input type="text" name="" id="" /></td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className={styles.orderComments}>
        <section className={`form-floating ${textArea ? '' : styles.textArea}`}>
          <textarea 
            className="form-control" placeholder="" id="floatingTextarea"
            value={textArea}
            onChange={e => setTextArea(e.target.value)}
          ></textarea>
          <label htmlFor="floatingTextarea">{t('ANNOTATIONS')}</label>
        </section>
        <ReportInfosComments />
      </section>
      
      <section className="clothesTable">
        <h1 className='mt-3'>
          {
            isCycling ? t('CYCLING_CLOTHING') : t('CLOTHES')
          }
        </h1>
        {defaultList.length > 0 && (
          <TableForPrint list={defaultList}/>
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
                  <TableForPrint list={listItems}/>
                </section>
              ) : null}
            </section> 
          ))
        }
        <section className='my-4'>
          <h4>{t('REPORT_PIECES_COUNTING')}</h4>
          <table className='mx-auto'>
            <tbody>
              {uniqueList.map((clothe, i) => (
                <React.Fragment key={`${clothe}__${i}`}>
                  {countPieces(clothe) ? (
                    <>
                      <td className='p-4'>
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
                      <td className='p-4'>
                        {countPieces(clothe)}
                      </td>
                    </>
                  ): null}
                </React.Fragment>
              ))}
              <td className='p-3'>
                Total
              </td>
              <td className='p-4'>
                {totalCountPieces()}
              </td>
            </tbody>
          </table>
        </section>

        <section className='mb-5'>
          {images.length > 0 && (
            <h2 className='border-bottom'>Images</h2>
          )}
          <section className={`d-flex gap-2 flex-wrap ${styles.cardContainer}`}>
            {images.map(({ image, description, width }, i) => (
              <section 
                key={`card-image__${i}`}
                className={`card ${styles.imageCard} align-self-start`}
                style={{ width }}
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
    </section>
  );
}