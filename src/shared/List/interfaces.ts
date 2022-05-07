import { ClothingParts, CyclingClothingParts } from '@shared/Catalog/interfaces';

export type AdultCloths = {
  size: 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG' | '2XG' | '3XG' | '4XG'
  clothe: ClothingParts | CyclingClothingParts
  quantity: number
}
export type ChildishCloths = {
  size: 'T-2A' | 'T-4A' | 'T-6A' | 'T-8A' | 'T-10A' | 'T-12A' |'T-14A' | 'T-16A'
  clothe: ClothingParts | CyclingClothingParts
  quantity: number
}

export type AdultCLothStructure = {
  [value in ClothingParts]: {
    size: 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG' | '2XG' | '3XG' | '4XG'
    quantity: number
  }
}

export type ChildishClothStructure = {
  [value in ClothingParts]: {
    size: 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG' | '2XG' | '3XG' | '4XG'
    quantity: number
  }
}

export type GenericClothStructure = {
  [value in ClothingParts]: {
    size: string
    quantity: number
  }
}
export type Gender = 'MALE' | 'FEMALE' | 'CHILDISH'
export type ListItem = {
  gender: Gender
  name: string
  number: string
  isCycling: boolean
  list: string
  id: string
  clothes: GenericClothStructure 
}
export type ListState = {
  items: Array<ListItem>
}

export type ListAction = {
  type: 'addItem'
  payload: ListItem
} | {
  type: 'deleteItem'
  payload: string
} | {
  type: 'changeList'
  payload: Pick<ListItem, 'id' | 'list'>
} | {
  type: 'deleteMultipleItems'
  payload: string[]
} | {
  type: 'editItem'
  payload: {
    id: string,
    listItem: Omit<ListItem, 'id'>
  }
} | {
  type: 'addItems'
  payload: ListItem[]
} | {
  type: 'clearList'
  payload?: string
}

export type ListReducerType = (state: ListState, action: ListAction) => ListState