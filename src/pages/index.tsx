import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations }  from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { Menu } from '@modules/Menu/Menu';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OneformesAPI } from '@shared/api/useAxios';
import { CatalogContent } from '@shared/Catalog';
import { useCatalog } from '@shared/Catalog/context/catalog';
// import { CreateItemForm } from '@modules/CreateItemForm/CreateItemForm';
// import { OrderTable } from '@modules/OrderTable/OrderTable';
// import { PasteListModal } from '@modules/PasteListModal/PasteListModal';
import { ImportCSVButton } from '@modules/ImportCSVButton/ImportCSVButton';
import { ListItem, useList } from '@shared/List';
import dynamic from 'next/dynamic';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import ClearList from '@modules/ClearList/ClearList';
import { CreateSequencyList } from '@modules/CreateSequencyList';
import axios from 'axios';

const PasteListModalDynamic = dynamic(
  import('@modules/PasteListModal/PasteListModal').then(mod => mod.PasteListModal),
);

const OrderTableDynamic = dynamic(
  import('@modules/OrderTable/OrderTable').then(mod => mod.OrderTable),
);

const CreateItemDynamic = dynamic(
  import('@modules/CreateItemForm/CreateItemForm').then(mod => mod.CreateItemForm),
);

const Home: NextPage = () => {
  const { query: { q, list } } = useRouter();
  const { dispatch: catalogDispatch } = useCatalog();
  const { t } = useTranslation();
  const [newItems, setNewItems] = useState<ListItem[]>();
  const { dispatch: action } = useList();

  useEffect(() => {
    if(typeof q === 'string'){
      OneformesAPI<CatalogContent>({
        path: 'load',
        query: q
      }).then(res => {
        catalogDispatch({
          type: 'setCompany',
          payload: res
        });
      });
    }
  }, [q, catalogDispatch]);

  useEffect(() => {
    if(list){
      axios.get(
        `/list/${list}`,
        { baseURL: '/api' }
      ).then(r => {
        const listItems = JSON.parse(r.data.items);
        setNewItems(listItems);
      }).catch(() => alert('not found'));
    }
  }, [list]);

  useEffect(() => {
    if(newItems && newItems.length){
      action({ type: 'deleteAllItems' });
      action(
        {
          type: 'addItems',
          payload: newItems
        }
      );
      alert(`${newItems.length} items foram adicionados`);
    }
  }, [newItems, action]);
  return (
    <>
      <Head>
        <title>Order list</title>
      </Head>
      <Menu />
      <div className="container-md">
        <CreateItemDynamic />
        <section className="mt-3 d-flex justify-content-end p-3 gap-3">
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {t('TOOLS')}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as='button'>
                <PasteListModalDynamic />
              </Dropdown.Item>
              <Dropdown.Item as='button'>
                <ImportCSVButton />
              </Dropdown.Item>
              <Dropdown.Item>
                <ClearList />
              </Dropdown.Item>
              <Dropdown.Item>
                <CreateSequencyList />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </section>

        <OrderTableDynamic />

        
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
