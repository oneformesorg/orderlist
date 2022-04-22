import { ClothingParts } from '@shared/Catalog';

type ClothList = Record<ClothingParts, {
  quantity: number
  size: string
}>
export function verifyClothList(list: ClothList){
  const sanitizedClothList = Object.entries(list).filter(([, { size, quantity }]) => (
    size !== '' || quantity < 0
  )
  ).length;
  return !!sanitizedClothList;
}