import { CatalogStateProvider } from '@shared/Catalog/context/catalog';
import { useList } from '@shared/List';
import React from 'react';
import { Table } from 'react-bootstrap';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';
import { ClothingParts } from '@shared/Catalog';

const clothings:ClothingParts[] = ['pants', 'shorts', 'tanktop', 'tshirt', 'tshirtLong', 'vest', 'socks'];
const cyclingClothings:ClothingParts[] = ['pants', 'shorts', 'tshirt', 'tshirtLong', 'socks'];
export function OrderTable() {
  const { state } = useList();
  const normalList = state.items.filter(({ isCycling }) => !isCycling);
  const cyclingList = state.items.filter(({ isCycling }) => isCycling);
  console.log(state.items);
  return (
    <section>
      <CatalogStateProvider>
        <Table id="tableOrderListItems" striped bordered hover>
          <TableHead listLength={normalList.length} clothings={clothings}/>
          <TableBody list={normalList} clothingList={clothings}/>
        </Table>
        {cyclingList.length === 0 || (
          <Table id="tableOrderListItems" striped bordered hover>
            <TableHead listLength={cyclingList.length} clothings={cyclingClothings} isCycling={true}/>
            <TableBody list={cyclingList} clothingList={cyclingClothings}/>
          </Table>
        )}
      </CatalogStateProvider>
    </section>
  );
}
