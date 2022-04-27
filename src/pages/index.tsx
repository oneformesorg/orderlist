import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations }  from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Menu } from '@modules/Menu/Menu';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { OneformesAPI } from '@shared/api/useAxios';
import { CatalogContent } from '@shared/Catalog';
import { CatalogStateProvider, useCatalogAction } from '@shared/Catalog/context/catalog';
import { CreateItemForm } from '@modules/CreateItemForm/CreateItemForm';
import { OrderTable } from '@modules/OrderTable/OrderTable';
import { PasteListModal } from '@modules/PasteListModal/PasteListModal';
import { ImportCSVButton } from '@modules/ImportCSVButton/ImportCSVButton';
import { ListActionProvider } from '@shared/List';

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
      
        <CatalogStateProvider>
          <ListActionProvider>
            <CreateItemForm />
            <section className="mt-3 d-flex justify-content-center border-top p-3 gap-3">
              <PasteListModal />
              <ImportCSVButton />
            </section>

            <OrderTable />
          </ListActionProvider>
        </CatalogStateProvider>
        
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
