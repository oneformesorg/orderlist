import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations }  from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Menu } from '@modules/Menu/Menu';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { OneformesAPI } from '@shared/api/useAxios';
import { CatalogContent } from '@shared/Catalog';
import { useCatalogAction } from '@shared/Catalog/context/catalog';
import { ListActionProvider } from '@shared/List';
import { CreateItemForm } from '@modules/CreateItemForm/CreateItemForm';

const Home: NextPage = () => {
  const { query } = useRouter();
  const catalogDispatch = useCatalogAction();
  
  useEffect(() => {
    if(typeof query.q === 'string'){
      OneformesAPI<CatalogContent>({
        path: 'load',
        query: query.q
      }).then(res => {
        catalogDispatch({
          type: 'setCompanyInfos',
          payload: res
        });
      });
    }
  }, [query, catalogDispatch]);

  return (
    <>
      <Head>
        <title>Order list</title>
      </Head>
      <Menu />
      <div className="container-md">
        <ListActionProvider>
          <CreateItemForm />
        </ListActionProvider>
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
