import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { ListActionProvider } from '@shared/List';
import { Tickets } from '@modules/Tickets/Tickets';
import { Menu } from '@modules/Menu/Menu';

const Relatorio:NextPage = () => {
  return(
    <>
      <Head>
        <title>List</title>
      </Head>
      <Menu />
      <ListActionProvider>
        <Tickets />
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