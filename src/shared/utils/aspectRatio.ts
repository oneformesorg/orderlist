const calcHeight = (aspectRatio: number, width: number) => (
  (width / aspectRatio)
);

/**
 * return new width and height based in aspect ratio 3:4
 */
export function aspectRatio(width: number){
  const ratio = {
    width: 3,
    height: 4,
  };
  const aspectRatio = ratio.width / ratio.height;
  const heightBasedInAspectRatio = calcHeight(aspectRatio, width);
  
  return {
    width,
    height: heightBasedInAspectRatio
  };
}