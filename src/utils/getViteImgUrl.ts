export function getViteImgUrl(path: string) {
  return new URL(`${path}`, import.meta.url).href;
}