//         ┌───────────────────────────────────┐
//         │                                   │
//         │ tabela de preços do state global  │
//         │                                   │
//         └─┬───────────────────────────────▲─┘
//           │                               │
//           │                               │
//  ┌────────▼───────┐                   ┌───┴──────────────────┐
//  │  CatalogTable  │                   │sanitizeForReducer()  │
//  └────────┬───────┘                   └──────────▲───────────┘
//           │                                      │
//           │                                      │
// ┌─────────▼────────┐                    ┌────────┴────────┐
// │sanitizeForTable()│                    │  submitEvent()  │
// └─────────┬────────┘                    └────────▲────────┘
//           │                                      │
//           │                                      │
//           │         ┌────────────────┐           │
//           └─────────► Gerando tabela ├───────────┘
//                     └────────────────┘

import { CyclingPriceTable, PriceTable, TablesName } from '@shared/Catalog';
import { useCatalog } from '@shared/Catalog/context/catalog';
import Image from 'next/image';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Table } from 'react-bootstrap';
import { TableItemInput } from '../TableItemInput/TableItemInput';

type Props = {
  sizes: Record<string, string>
  prices: PriceTable | CyclingPriceTable
  reference: TablesName
  isCycling?: boolean
}
export type CatalogRef = {
  submitEvent: () => void
}

function sanitizeForTable(obj: PriceTable | CyclingPriceTable) {
  const value = Object.entries(obj).map(([key, value]) => (
    [key, ...value]
  ));
  return value;
}
function sanitizeForReducer(arr: Array<number | string>[]){
  return arr.reduce((prev, [propName, ...propValue]) => ({
    ...prev,
    [propName]: propValue
  }), {}) as unknown as PriceTable;
}

const sanitizeSizes = (sizeList: Record<string, string>) => {
  const response = Object.entries(sizeList).map(([,v]) => v);
  return response; 
};

export const CatalogTable = React.forwardRef<CatalogRef, Props>(function CatalogTable({ sizes, prices, reference, isCycling }, ref) {
  const [tablePrices, setTablePrices] = useState([] as Array<string | number>[]);
  const { dispatch }= useCatalog();
  const [sizeList, setSizeList] = useState(sizes);
  
  useEffect(() => {
    setTablePrices(sanitizeForTable(prices));
  }, [prices]);

  useImperativeHandle(ref, () => ({
    submitEvent() {
      const compareSizes = (regex: RegExp) => (
        reference.match(regex) && JSON.stringify(sizeList) !== JSON.stringify(sizes)
      );

      dispatch({
        type: 'setPriceTables',
        payload: {
          target: reference,
          priceTable: sanitizeForReducer(tablePrices)
        }
      });
      if(compareSizes(/childish/i)){
        dispatch({
          type: 'setSizeList',
          payload: {
            target: 'childish',
            sizeList: sizeList
          }
        });
      }
      if(compareSizes(/male/i)){
        console.log(sizeList);
        dispatch({
          type: 'setSizeList',
          payload: {
            target: 'male',
            sizeList: sizeList
          }
        });
      }
      if(compareSizes(/female/i)){
        dispatch({
          type: 'setSizeList',
          payload: {
            target: 'female',
            sizeList: sizeList
          }
        });
      }
    }
  }), [dispatch, reference, tablePrices, sizeList, sizes]);

  return (
    <Table bordered hover>
      <thead>
        <tr className="text-center">
          <th style={{ width: '50px' }}>-</th>
          {sanitizeSizes(sizes).map((size, i) => (
            <th key={`size_${size}_${i}`}>
              <input
                onChange={e => setSizeList(old => {
                  if(!size){
                    return old;
                  }
                  old[size] = e.target.value;
                  return old;
                })}
                type="text"
                defaultValue={size}
                style={{
                  background: 'none',
                  outline: 'none',
                  width: '100%',
                  border: 0,
                  textAlign: 'center'
                }}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tablePrices.map((item, mainRow) => (
          <tr className="text-center" key={`${item}_${mainRow}`}>
            {item.map((rowItem, mainCol) => (
              <td key={`${item}_${mainCol}`}>
                {mainCol === 0 ? (
                  <Image
                    src={isCycling ? `/images/cycling/${rowItem}.png` : `/images/${rowItem}.png`}
                    height={25}
                    width={25}
                    alt={`${rowItem} illustration`}
                  />
                ) : (
                  <>
                    <TableItemInput
                      value={rowItem as number}
                      onBlur={(e) => {
                        setTablePrices((old) => old.map((item, row) =>
                          item.map((value, col) => {
                            if(row === mainRow && col === mainCol) return e.target.valueAsNumber || 0;
                            return value;
                          })
                        ));
                      }}
                    />
                  </>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      
    </Table>
  );
});
