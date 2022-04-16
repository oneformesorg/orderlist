import type { GetStaticProps, NextPage } from 'next';
import { useTranslation }  from 'next-i18next';
import { serverSideTranslations }  from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Menu } from '@modules/Menu/Menu';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { OneformesAPI } from '@shared/api/useAxios';
import { CatalogContent } from '@shared/Catalog';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();
  
  useEffect(() => {
    console.log(query);
    if(typeof query.q === 'string'){
      OneformesAPI<CatalogContent>({
        path: 'load',
        query: query.q
      }).then(res => {
        console.log(res);
      });
    }
  }, [query]);

  return (
    <>
      <Head>
        <title>Order list</title>
      </Head>
      <Menu />
      <div className="container-md">
        <h1>{t('MALE')}</h1>
      </div>
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

export default Home;
