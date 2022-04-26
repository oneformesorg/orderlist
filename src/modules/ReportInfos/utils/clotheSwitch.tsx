const clothes = ['pants', 'shorts', 'tanktop', 'tshirt', 'tshirtLong', 'vest', 'socks'];
const cyclingClothes = ['pants', 'shorts', 'tshirt', 'tshirtLong', 'socks'];

/**
 * 
 * @param isCycling 
 * @returns clothes based in catalog info
 */
export const clotheSwitch = (isCycling: boolean) => isCycling ? cyclingClothes : clothes;