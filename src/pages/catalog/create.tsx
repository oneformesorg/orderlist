import { Menu } from '@/modules/Menu/Menu';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const catalog:NextPage = () => {
  return(
    <>
      <Menu />
      <main className='container-sm px-5 py-2'>
        teste
      </main>
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

export default catalog;