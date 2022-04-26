import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Menu } from '@modules/Menu/Menu';
import { CatalogStateProvider } from '@shared/Catalog/context/catalog';
import { ReportInfos } from '@modules/ReportInfos/ReportInfos';
import styles from '@styles/relatorio.module.css';
import { ImportCSVButton } from '@modules/ImportCSVButton/ImportCSVButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { AddImage, ImageState } from '@modules/AddImage/AddImage';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

type ImagesContext = {
  images: ImageState
  setImages: Dispatch<SetStateAction<ImageState>>
}
export const imagesCardContext = createContext<ImagesContext>(null);
const Relatorio:NextPage = () => {
  const [images, setImages] = useState<ImageState>([]);
  
  return(
    <>
      <Menu />
      <imagesCardContext.Provider value={{
        images, setImages
      }}>
        <section className={`${styles.relatorioButtons} container-lg d-flex justify-content-end gap-2 px-5 py-2 border-bottom mb-3`}>
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
          <ReportInfos 
            onDelete={(id) => {
              setImages(old => (
                old.filter((item, index) => index !== id)
              ));
            }}
          />
        </CatalogStateProvider>
      </imagesCardContext.Provider>
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