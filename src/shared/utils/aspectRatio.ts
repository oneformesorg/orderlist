const calcHeight = (aspectRatio: number, width: number) => (
  (width / aspectRatio)
);

/**
 * return new width and height based in aspect ratio 16:9
 */
export function aspectRatio(width: number){
  const ratio = {
    width: 16,
    height: 9,
  };
  const aspectRatio = ratio.width / ratio.height;
  const heightBasedInAspectRatio = calcHeight(aspectRatio, width);
  
  return {
    width,
    height: heightBasedInAspectRatio
  };
}