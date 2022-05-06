import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { ListActionProvider } from '@shared/List';
import { Tickets } from '@modules/Tickets/Tickets';
import { Menu } from '@modules/Menu/Menu';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { aspectRatio } from '@shared/utils/aspectRatio';

const Relatorio:NextPage = () => {
  const { t } = useTranslation();
  const [tagSize, setTagSize] = useState({
    width: 124,
    height: 165.33
  });
  return(
    <>
      <Head>
        <title>List</title>
      </Head>
      <Menu />
      <section className='d-flex container-lg align-items-center gap-2 p-2 not-printed'>
        <Link href="/catalog/relatorio">
          <a
            className="btn btn-primary d-inline-flex gap-2 align-items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {t('GOBACK')}
          </a>
        </Link>
      </section>
      <section className='d-flex justify-content-end container-lg px-4 not-printed'>
        <section className="form-group">
          <label htmlFor="customRange1" className="form-label">{t('SIZE')}</label>
          <input 
            type="range"
            min={100} 
            max={300}
            defaultValue={tagSize.width} 
            className="form-range" 
            id="customRange1"
            onChange={(e) => {
              const newTagSize = aspectRatio(e.target.valueAsNumber);
              setTagSize(newTagSize);
            }}
          />
        </section>
      </section>
      <ListActionProvider>
        <Tickets tagSize={tagSize}/>
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