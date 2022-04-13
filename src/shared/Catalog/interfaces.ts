import { ClothingParts } from '@/shared';

export type CatalogContent = {
  projectName: string
  companyEmail: string
  priceTableChildish: {
    [value in ClothingParts]: number[]
  }
  priceTableFemale: {
    [value in ClothingParts]: number[]
  }
  priceTableMale: {
    [value in ClothingParts]: number[]
  }
  priceTableUnique: {
    socks: [number]
  }
}
export type ReducerActionType = 'name' | 'email'
export type CatalogReducerAction = {
  payload?: any
  type: ReducerActionType
}