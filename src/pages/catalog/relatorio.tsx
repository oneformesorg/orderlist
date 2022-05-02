import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Menu } from '@modules/Menu/Menu';
import { CatalogStateProvider } from '@shared/Catalog/context/catalog';
import styles from '@styles/relatorio.module.css';
import { ImportCSVButton } from '@modules/ImportCSVButton/ImportCSVButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPrint, faTags } from '@fortawesome/free-solid-svg-icons';
import { AddImage, ImageState } from '@modules/AddImage/AddImage';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import Head from 'next/head';
import { ListActionProvider } from '@shared/List';
import dynamic from 'next/dynamic';
import { ReportInfosProps } from '@modules/ReportInfos/ReportInfos';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

type ImagesContext = {
  images: ImageState
  setImages: Dispatch<SetStateAction<ImageState>>
}

// !dynamic import for remove ssr
const ReportInfosWithoutSSR = dynamic<ReportInfosProps>(
  import('@modules/ReportInfos/ReportInfos').then((mod) => mod.ReportInfos),
  { ssr: false }
);

export const imagesCardContext = createContext<ImagesContext>(null);
const Relatorio:NextPage = () => {
  const [images, setImages] = useState<ImageState>([]);
  const { t } = useTranslation();
  
  return(
    <>
      <Head>
        <title>List</title>
      </Head>
      <Menu />
      <ListActionProvider>
        <imagesCardContext.Provider value={{
          images, setImages
        }}>
          <section className='d-flex container-lg'>
            <Link href="/catalog">
              <a
                className="btn btn-primary d-flex gap-2 align-items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                {t('GOBACK')}
              </a>
            </Link>
          </section>
          <section className={`${styles.relatorioButtons} container-lg d-flex justify-content-end gap-2 px-5 py-2 border-bottom mb-3`}>
            <Link href={'/catalog/tags'}>
              <a className='btn btn-primary'>
                <FontAwesomeIcon icon={faTags} />
              </a>
            </Link>
            <AddImage />
            <CatalogStateProvider>
              <ImportCSVButton />
            </CatalogStateProvider>
            <button 
              onClick={() =>{
                window.print();
              }}
              className='btn btn-info btn-sm text-light'
            >
              <FontAwesomeIcon icon={faPrint} /> Print
            </button>
          </section>
          <CatalogStateProvider>
            <ReportInfosWithoutSSR
              onDelete={(id) => {
                setImages(old => (
                  old.filter((item, index) => index !== id)
                ));
              }}
            />
          </CatalogStateProvider>
        </imagesCardContext.Provider>
      </ListActionProvider>
    </>
  );
}; 

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...await serverSideTranslations(locale)
    } 
  };
};

export default Relatorio;