import { CatalogStateProvider, useCatalogState } from '@shared/Catalog/context/catalog';
import { ListItem, useList } from '@shared/List';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';
import { ClothingParts } from '@shared/Catalog';

// * [namelist, casualCLothing, cyclingCLothing][]
type Lists = [string, [ListItem[], ListItem[]]][]

const clothings:ClothingParts[] = ['pants', 'shorts', 'tanktop', 'tshirt', 'tshirtLong', 'vest', 'socks'];
const cyclingClothings:ClothingParts[] = ['pants', 'shorts', 'tshirt', 'tshirtLong', 'socks'];
export function OrderTable() {
  const { state } = useList();
  const [sublists, setSublist] = useState<Lists>([]);
  const normalList = state.items.filter(({ isCycling, list }) => !isCycling && !list);
  const cyclingList = state.items.filter(({ isCycling, list }) => isCycling && !list);
  const catalogState = useCatalogState();
  useEffect(() => {
    catalogState.list.map((name) => {
      const cycling = state.items.filter(({ list, isCycling }) => list === name && isCycling);
      const normal = state.items.filter(({ list, isCycling }) => list === name && !isCycling);
      setSublist(old => {
        return [
          ...old.filter(([nameList]) => nameList !== name), [name, [normal, cycling]]
        ];
      });
      console.log(sublists, cycling, normal);
    });
    setSublist(old => old.filter(([listName]) => state.items.some(({ list }) => list === listName)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogState, state]);

  return (
    <section>
      <CatalogStateProvider>
        {normalList.length > 0 && !catalogState.isCycling && (
          <Table id="tableOrderListItems" striped bordered hover>
            <TableHead listLength={normalList.length} clothings={clothings}/>
            <TableBody list={normalList} clothingList={clothings}/>
          </Table>
        )}
        {cyclingList.length > 0 && catalogState.isCycling && (
          <Table id="tableOrderListItems" striped bordered hover>
            <TableHead listLength={cyclingList.length} clothings={cyclingClothings} isCycling={true}/>
            <TableBody list={cyclingList} clothingList={cyclingClothings}/>
          </Table>
        )}
        {sublists.map(([name, [normal, cycling]], i) => (
          <>
            <h4 className='text-center mt-2' key={`${name}_${i}`}>{name}</h4>
            {normalList.length > 0 && !catalogState.isCycling && (
              <Table id="tableOrderListItems" striped bordered hover key={`${i}_sublist--normal`}>
                <TableHead listLength={normal.length} clothings={clothings}/>
                <TableBody list={normal} clothingList={clothings}/>
              </Table>
            )}
            {cycling.length > 0 && catalogState.isCycling && (
              <Table id="tableOrderListItems" striped bordered hover key={`${i}_sublist--cycling`}>
                <TableHead listLength={cycling.length} clothings={cyclingClothings} isCycling={true}/>
                <TableBody list={cycling} clothingList={cyclingClothings}/>
              </Table>
            )}
          </>
        ))}
      </CatalogStateProvider>
    </section>
  );
}
