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
export type SizeList = 'male' | 'female' | 'childish'
 
export type CatalogContent = {
  projectName: string
  companyEmail: string
  whatsappContact: string
  list: string[]
  sizeList: {
    childish: Record<string, string>,
    female: Record<string, string>,
    male: Record<string, string>
  }
  isCycling: boolean
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
| { type: 'setCompanyInfos', payload: Pick<CatalogContent, 'companyEmail' | 'projectName' | 'whatsappContact'> }
| { 
    type: 'setPriceTables', 
    payload: {
      target: TablesName
      priceTable: PriceTable | CyclingPriceTable
    }
  } 
| {
  type: 'setSizeList', 
  payload: {
    target: SizeList
    sizeList: Record<string, string>
  }
}
| { type: 'setPriceUniqueTables', payload: Pick<CatalogContent, 'priceTableUnique'>}
| { type: 'currentInfos', stateFunction: (catalog: CatalogContent) => void }
| { type: 'cyclingMode', payload: boolean }
| {
  type: 'deleteList'
  payload: string
} | {
  type: 'addList'
  payload: string
} | {
  type: 'setCompany',
  payload: CatalogContent
}