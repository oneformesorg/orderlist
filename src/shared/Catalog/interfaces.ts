export type ClothingParts = 'pants' | 'shorts' | 'socks' | 'tanktop' | 'tshirt' | 'tshirtLong' | 'vest'
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
export type ReducerActionType = 'setCompanyInfos' | 'setPriceTables' | 'setPriceUniqueTables' | 'currentInfos'
export type CatalogReducerAction =
| { type: 'setCompanyInfos', payload: Pick<CatalogContent, 'projectName' | 'companyEmail'> }
| { type: 'setPriceTables', payload: {
    target: TablesName
    priceTable: PriceTable
  } 
}
| { type: 'setPriceUniqueTables', payload: Pick<CatalogContent, 'priceTableUnique'>}
| { type: 'currentInfos', stateFunction: (catalog: CatalogContent) => void }
