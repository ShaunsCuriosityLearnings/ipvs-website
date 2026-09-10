import cloudinaryMap from '../data/cloudinaryMap.json';

const typedMap = cloudinaryMap as Record<string, string>;

/**
 * Returns the optimized Cloudinary CDN URL for any local public asset path.
 * If not found in the Cloudinary map or if already an external URL, returns the original path.
 */
export function getMediaUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const key = path.startsWith('/') ? path : `/${path}`;
  return typedMap[key] || path;
}

export default getMediaUrl;
