import { ESTEEMED_EXHIBITORS, ExhibitorItem } from '../data/ipvsData';

export interface AttributionData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  invitingExhibitor?: string;
  invitingExhibitorSlug?: string;
  stallNumber?: string;
  landingPage?: string;
  referrer?: string;
  capturedAt?: string;
}

const STORAGE_KEY = 'ipvs_attribution_session';
const BACKUP_STORAGE_KEY = 'ipvs_attribution_persistent';

/**
 * Normalizes text for loose matching (e.g. "bell seal" -> "bellseal")
 */
function normalizeString(val: string): string {
  return (val || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Matches an exhibitor from a slug, code, or name.
 */
export function findExhibitorByQuery(query: string | null | undefined): ExhibitorItem | undefined {
  if (!query) return undefined;
  const clean = normalizeString(query);

  return ESTEEMED_EXHIBITORS.find(e => {
    if (e.slug && normalizeString(e.slug) === clean) return true;
    if (normalizeString(e.id) === clean) return true;
    if (normalizeString(e.name).includes(clean) || clean.includes(normalizeString(e.name))) return true;
    // Check specific known aliases
    if (clean === 'bellseal' && e.name.toLowerCase().includes('bell-o-seal')) return true;
    if (clean === 'omval' && e.name.toLowerCase().includes('omval')) return true;
    if (clean === 'kavaata' && e.name.toLowerCase().includes('kavaata')) return true;
    if (clean.includes('delval') && e.name.toLowerCase().includes('delval')) return true;
    return false;
  });
}

/**
 * Captures UTMs and exhibitor invite parameters from the current URL and persists them.
 */
export function captureAttribution(): AttributionData {
  if (typeof window === 'undefined') return {};

  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || undefined;
    const utmMedium = params.get('utm_medium') || undefined;
    const utmCampaign = params.get('utm_campaign') || undefined;
    const utmContent = params.get('utm_content') || undefined;
    const utmTerm = params.get('utm_term') || undefined;
    const exhibitorParam = params.get('exhibitor') || params.get('ref') || undefined;

    const matchedExhibitor = findExhibitorByQuery(exhibitorParam || utmSource);

    // If new UTM parameters exist on current page, capture them
    if (utmSource || utmMedium || utmCampaign || exhibitorParam) {
      const attribution: AttributionData = {
        utmSource: utmSource || (matchedExhibitor ? matchedExhibitor.slug : undefined),
        utmMedium: utmMedium || (matchedExhibitor ? 'exhibitor_invite' : undefined),
        utmCampaign: utmCampaign || 'ipvs2026',
        utmContent: utmContent || (matchedExhibitor ? matchedExhibitor.stall : undefined),
        utmTerm,
        invitingExhibitor: matchedExhibitor ? matchedExhibitor.name : undefined,
        invitingExhibitorSlug: matchedExhibitor ? matchedExhibitor.slug : undefined,
        stallNumber: matchedExhibitor ? matchedExhibitor.stall : (utmContent || undefined),
        landingPage: window.location.pathname + window.location.search,
        referrer: document.referrer || undefined,
        capturedAt: new Date().toISOString()
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(attribution));
      return attribution;
    }

    // Otherwise, return existing stored attribution
    return getStoredAttribution();
  } catch (err) {
    console.warn('[Attribution Error]', err);
    return {};
  }
}

/**
 * Retrieves the stored attribution data from session or local storage.
 */
export function getStoredAttribution(): AttributionData {
  if (typeof window === 'undefined') return {};

  try {
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    if (sessionData) return JSON.parse(sessionData);

    const localData = localStorage.getItem(BACKUP_STORAGE_KEY);
    if (localData) return JSON.parse(localData);
  } catch (_) {}

  return {};
}

/**
 * Returns the matched ExhibitorItem if the current user arrived via an exhibitor invite.
 */
export function getInvitingExhibitor(): ExhibitorItem | undefined {
  const attr = getStoredAttribution();
  return findExhibitorByQuery(attr.invitingExhibitorSlug || attr.utmSource || attr.invitingExhibitor);
}

/**
 * Helper to construct a standard IPVS tracking URL for an exhibitor or channel.
 */
export function buildTrackingUrl(options: {
  exhibitorSlug?: string;
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  baseUrl?: string;
}): string {
  const base = options.baseUrl || 'https://ipvs.in/visit';
  const url = new URL(base);

  url.searchParams.set('utm_source', options.source);
  url.searchParams.set('utm_medium', options.medium);
  url.searchParams.set('utm_campaign', options.campaign || 'ipvs2026');

  if (options.content) {
    url.searchParams.set('utm_content', options.content);
  }

  if (options.term) {
    url.searchParams.set('utm_term', options.term);
  }

  return url.toString();
}
