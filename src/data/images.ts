import type { ImageMetadata } from 'astro';

// Eagerly import every real + stock asset so content collections (which only
// store plain string keys, e.g. "windows/casement") can resolve to an
// astro:assets-optimized ImageMetadata at build time.
const realImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/real/**/*.{jpg,jpeg,png}',
  { eager: true }
);
const stockImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/stock/**/*.{jpg,jpeg,png}',
  { eager: true }
);

function buildMap(modules: Record<string, { default: ImageMetadata }>, root: string) {
  const map: Record<string, ImageMetadata> = {};
  for (const [path, mod] of Object.entries(modules)) {
    const key = path.replace(root, '').replace(/\.(jpg|jpeg|png)$/, '');
    map[key] = mod.default;
  }
  return map;
}

export const realImg = buildMap(realImages, '/src/assets/images/real/');
export const stockImg = buildMap(stockImages, '/src/assets/images/stock/');

/**
 * Resolve a content-collection image key to optimized ImageMetadata.
 * Keys are relative paths without extension, e.g. "products/windows/casement"
 * for real assets, or "stock:hero-modern-home-dusk" for stock assets.
 */
export function resolveImage(key: string): ImageMetadata {
  if (key.startsWith('stock:')) {
    const stockKey = key.slice('stock:'.length);
    const img = stockImg[stockKey];
    if (!img) throw new Error(`Unknown stock image key: ${key}`);
    return img;
  }
  const img = realImg[key];
  if (!img) throw new Error(`Unknown real image key: ${key}`);
  return img;
}
