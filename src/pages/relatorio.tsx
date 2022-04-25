import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Menu } from '@modules/Menu/Menu';
import { CatalogStateProvider } from '@shared/Catalog/context/catalog';
import { ReportInfos } from '@modules/ReportInfos/ReportInfos';
import styles from '@styles/relatorio.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Relatorio:NextPage = () => {
  const { t } = useTranslation();
  return(
    <>
      <Menu />
      <section className={`${styles.relatorioButtons} container-lg d-flex justify-content-end px-5 py-2 border-bottom mb-3`}>
        <button 
          onClick={() =>{
            window.print();
          }}
          className='btn btn-info btn-sm text-light'
        >
          Print
        </button>
      </section>
      <CatalogStateProvider>
        <ReportInfos />
      </CatalogStateProvider>
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