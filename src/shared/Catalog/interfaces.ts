import { ClothingParts } from '@shared/index';

export type PriceTable = {
  [value in ClothingParts]: number[]
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
export type ReducerActionType = 'name' | 'email' | 'setPrice'
export type CatalogReducerAction = {
  payload?: {
    value: any,
  }
  type: ReducerActionType
}