import { CatalogStateProvider } from '@shared/Catalog/context/catalog';
import { useList } from '@shared/List';
import React from 'react';
import { Table } from 'react-bootstrap';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';

export function OrderTable() {
  const { state } = useList();
  const normalItem = state.items.filter(({ isCycling }) => !isCycling);
  return (
    <section>
      <CatalogStateProvider>
        <Table id="tableOrderListItems" striped bordered hover>
          <TableHead listLength={normalItem.length}/>
          <TableBody list={normalItem}/>
        </Table>
      </CatalogStateProvider>
    </section>
  );
}
