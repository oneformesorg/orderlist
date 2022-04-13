import type { GetStaticProps, NextPage } from 'next';
import { useTranslation }  from 'next-i18next';
import { serverSideTranslations }  from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Menu } from '@modules/Menu/Menu';

const Home: NextPage = () => {
  const { t } = useTranslation();
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
