export type ClothingParts = 'pants' 
| 'shorts'
| 'socks'
| 'tanktop'
| 'tshirt'
| 'tshirtLong'
| 'vest'

export type CyclingClothingParts = 'pants' | 'shorts' | 'tshirt' | 'tshirtLong'

export type PriceTable = {
  [value in Exclude<ClothingParts, 'socks'>]: number[]
}
export type CyclingPriceTable = {
  [value in CyclingClothingParts]: number[]
}

export type TablesName = 'priceTableChildish' | 'priceTableFemale' | 'priceTableMale' | 'cyclingPriceTableMale' | 'cyclingPriceTableFemale' | 'cyclingPriceTableChildish'

// export type CyclingTablesName = 
export type CatalogContent = {
  projectName: string
  companyEmail: string
  cyclingPriceTableFemale: CyclingPriceTable
  cyclingPriceTableMale: CyclingPriceTable
  cyclingPriceTableChildish: CyclingPriceTable
  priceTableChildish: PriceTable
  priceTableFemale: PriceTable
  priceTableMale: PriceTable
  priceTableUnique: {
    socks: [number]
  }
}
export type ReducerActionType = 'setCompanyInfos' | 'setPriceTables' | 'setPriceUniqueTables' | 'currentInfos'
export type CatalogReducerAction =
| { type: 'setCompanyInfos', payload: Pick<CatalogContent, 'companyEmail' | 'projectName'> }
| { type: 'setPriceTables', payload: {
    target: TablesName
    priceTable: PriceTable | CyclingPriceTable
  } 
}
| { type: 'setPriceUniqueTables', payload: Pick<CatalogContent, 'priceTableUnique'>}
| { type: 'currentInfos', stateFunction: (catalog: CatalogContent) => void }
