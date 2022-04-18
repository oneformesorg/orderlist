import { ClothingParts } from '@shared/Catalog/interfaces';

type ListItem = {
  gender: 'MALE' | 'FEMALE'
  id: string
  size: 'T-PP' | 'T-P' | 'T-M' | 'T-G' | 'T-GG' | 'T-XG' | 'T-2XG' | 'T-3XG' | 'T-4XG'
  clothes: {
    priceIndex: number
    clothe: ClothingParts
    quantity: number
  }[] 
} | {
  gender: 'CHILDISH'
  id: string
  size: 'T-2A' | 'T-4A' | 'T-6A' | 'T-8A' | 'T-10A' | 'T-12A' |'T-14A' | 'T-16A'
  clothes: {
    priceIndex: number
    clothe: ClothingParts
    quantity: number
  }[]
}
export type ListState = Array<ListItem>

export type ListAction = {
  type: 'add'
  payload: ListItem
} | {
  type: 'delete'
  payload: {
    id: string
  }
}

export type ListReducerActions = (state: ListState, action: ListAction) => ListState