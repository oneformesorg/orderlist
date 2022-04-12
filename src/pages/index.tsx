import type { GetStaticProps, NextPage } from 'next';
import { useTranslation }  from 'next-i18next';
import { serverSideTranslations }  from 'next-i18next/serverSideTranslations';

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container-md">
      <h1>{t('MALE')}</h1>
    </div>
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
