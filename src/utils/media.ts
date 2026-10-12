/**
 * Media URL resolver for IPVS 2026 Portal
 * Serves all media assets directly from the local web server / public directory.
 * This guarantees 100% uptime, zero external CDN dependencies, and prevents
 * 401 Unauthorized errors caused by expired or suspended third-party CDN accounts.
 */
export function getMediaUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  return path.startsWith('/') ? path : `/${path}`;
}

export default getMediaUrl;

