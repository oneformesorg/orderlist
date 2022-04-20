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

export type ListItem = {
  gender: 'MALE' | 'FEMALE'
  name: string
  number: string
  isCycling: boolean
  list: string
  id: string
  clothes: AdultCloths[] 
} | {
  gender: 'CHILDISH'
  name: string
  number: string
  isCycling: boolean
  list: string
  id: string
  clothes: ChildishCloths[]
}
export type ListState = {
  lists: string[]
  items: Array<ListItem>
}

export type ListAction = {
  type: 'addItem'
  payload: ListItem
} | {
  type: 'deleteItem'
  payload: {
    id: string
  }
} | {
  type: 'changeList'
  payload: Pick<ListItem, 'id' | 'list'>
} | {
  type: 'deleteList'
  payload: string
} | {
  type: 'addList'
  payload: string
}

export type ListReducerType = (state: ListState, action: ListAction) => ListState