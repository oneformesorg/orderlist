import { PriceTable } from '@shared/Catalog';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React from 'react';
import { Table } from 'react-bootstrap';
import { TableItemInput } from '../TableItemInput/TableItemInput';

type Props = {
  sizes: string[]
  prices: PriceTable
  reference: string
}

function sanitizeForTable(obj: PriceTable) {
  const value = Object.entries(obj).map(([key, value]) => (
    [key, ...value]
  ));
  return value;
}

export function CatalogTable({ sizes, prices, reference }: Props) {
  const { t } = useTranslation();
  const [tablePrices, setTablePrices] = React.useState([] as Array<string | number>[]);
  React.useEffect(() => {
    setTablePrices(sanitizeForTable(prices));
  }, []);
  React.useEffect(() => {
    console.log(tablePrices);
  }, [tablePrices]);

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
                    src={`/images/${rowItem}.png`}
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
                            // row === mainRow && col === mainCol ?? e.target.valueAsNumber : undefined;
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
}
