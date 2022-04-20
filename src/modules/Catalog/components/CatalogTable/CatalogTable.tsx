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
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Table } from 'react-bootstrap';
import { TableItemInput } from '../TableItemInput/TableItemInput';

type Props = {
  sizes: string[]
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

export const CatalogTable = React.forwardRef<CatalogRef, Props>(function CatalogTable({ sizes, prices, reference, isCycling }, ref) {
  const { t } = useTranslation();
  const [tablePrices, setTablePrices] = useState([] as Array<string | number>[]);
  const { dispatch }= useCatalog();

  useEffect(() => {
    setTablePrices(sanitizeForTable(prices));
  }, [prices]);
  
  useImperativeHandle(ref, () => ({
    submitEvent() {
      dispatch({
        type: 'setPriceTables',
        payload: {
          target: reference,
          priceTable: sanitizeForReducer(tablePrices)
        }
      });
    }
  }), [tablePrices, dispatch, reference]);

  return (
    <Table bordered hover>
      <thead>
        <tr className="text-center">
          <th style={{ width: '50px' }}>-</th>
          {sizes.map((size, i) => (
            <th key={`size_${size}_${i}`}>
              {t(size)}
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
