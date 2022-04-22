import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations }  from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Menu } from '@modules/Menu/Menu';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { OneformesAPI } from '@shared/api/useAxios';
import { CatalogContent } from '@shared/Catalog';
import { CatalogStateProvider, useCatalogAction } from '@shared/Catalog/context/catalog';
import { ListActionProvider } from '@shared/List';
import { CreateItemForm } from '@modules/CreateItemForm/CreateItemForm';
import { OrderTable } from '@modules/OrderTable/OrderTable';
import { PasteListModal } from '@modules/PasteListModal/PasteListModal';
import { DownloadCSVModal } from '@modules/DownloadCSVModal/DownloadCSVModal';
import { SendEmailModal } from '@modules/SendEmailModal/SendEmailModal';
import { ImportCSVButton } from '@modules/ImportCSVButton/ImportCSVButton';

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
          <CatalogStateProvider>
            <CreateItemForm />
            <section className="mt-3 d-flex justify-content-center border-top p-3 gap-3">
              <PasteListModal />
              <DownloadCSVModal />
              <SendEmailModal />
              <ImportCSVButton />
            </section>

            <OrderTable />
          </CatalogStateProvider>
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
