import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Menu } from '@modules/Menu/Menu';
import Link from 'next/link';

const Teste:NextPage = () => {
  const { t } = useTranslation();
  return(
    <>
      <Menu />
      <h1>{t('MALE')}</h1>
      <Link href="/">
        <a>teste</a>
      </Link>
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

export default Teste;