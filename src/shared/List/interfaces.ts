import { ClothingParts, CyclingClothingParts } from '@shared/Catalog/interfaces';

export type AdultCloths = {
  size: 'T-PP' | 'T-P' | 'T-M' | 'T-G' | 'T-GG' | 'T-XG' | 'T-2XG' | 'T-3XG' | 'T-4XG'
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
    size: 'T-PP' | 'T-P' | 'T-M' | 'T-G' | 'T-GG' | 'T-XG' | 'T-2XG' | 'T-3XG' | 'T-4XG'
    quantity: number
  }
}

export type ChildishClothStructure = {
  [value in ClothingParts]: {
    size: 'T-PP' | 'T-P' | 'T-M' | 'T-G' | 'T-GG' | 'T-XG' | 'T-2XG' | 'T-3XG' | 'T-4XG'
    quantity: number
  }
}

export type GenericClothStructure = {
  [value in ClothingParts]: {
    size: string
    quantity: number
  }
}

export type ListItem = {
  gender: 'MALE' | 'FEMALE'
  name: string
  number: string
  isCycling: boolean
  list: string
  id: string
  clothes: GenericClothStructure 
} | {
  gender: 'CHILDISH'
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
}

export type ListReducerType = (state: ListState, action: ListAction) => ListState