import { ClothingParts } from '@shared/index';

export type PriceTable = {
  [value in Exclude<ClothingParts, 'socks'>]: number[]
}

export type TablesName = 'priceTableChildish' | 'priceTableFemale' | 'priceTableMale'
export type CatalogContent = {
  projectName: string
  companyEmail: string
  priceTableChildish: PriceTable
  priceTableFemale: PriceTable
  priceTableMale: PriceTable
  priceTableUnique: {
    socks: [number]
  }
}
export type ReducerActionType = 'setCompanyInfos' | 'setPriceTables' | 'setPriceUniqueTables'
export type CatalogReducerAction =
| { type: 'setCompanyInfos', payload: Pick<CatalogContent, 'projectName' | 'companyEmail'> }
| { type: 'setPriceTables', payload: {
    target: TablesName
    priceTable: PriceTable
  } 
}
| { type: 'setPriceUniqueTables', payload: Pick<CatalogContent, 'priceTableUnique'>}
