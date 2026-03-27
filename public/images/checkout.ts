/**
 * Checkout URL and UTM propagation utilities.
 */
import type { Locale } from '@/i18n';
import { tRaw } from '@/i18n';

const DEFAULT_CHECKOUT_URL = 'https://pay.hotmart.com/U104562370W?off=9hdj05p0&checkoutMode=10';

export const CHECKOUT_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CHECKOUT_URL?.trim()) ||
  DEFAULT_CHECKOUT_URL;

const UTM_PARAMS = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term', 'src'];

function getCookie(name: string): string | null {
  const escaped = name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1');
  const m = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

/** Get tracking UID from global tracker, localStorage, or cookie */
function getTrackingUid(): string {
  if (typeof window === 'undefined') return '';
  if (window._mt?.uid != null) return String(window._mt.uid);
  try {
    const ls = localStorage.getItem('mt_uid') ?? localStorage.getItem('uid');
    if (ls) return String(ls);
  } catch {}
  const c = getCookie('mt_uid');
  return c != null ? String(c) : '';
}

/** Capture UTMs from current URL and store in sessionStorage */
export function captureUtms(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    UTM_PARAMS.forEach(key => {
      const val = params.get(key);
      if (val) utms[key] = val;
    });
    if (Object.keys(utms).length > 0) {
      sessionStorage.setItem('funnel_utms', JSON.stringify(utms));
    }
  } catch {}
}

/** Get stored UTMs */
export function getUtms(): Record<string, string> {
  try {
    const stored = sessionStorage.getItem('funnel_utms');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getBaseCheckoutUrl(locale: Locale): string {
  const envUrl =
    typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_CHECKOUT_URL?.trim() : undefined;
  if (envUrl) return envUrl;

  const i18nUrl = tRaw(locale, 'checkout.url');
  if (typeof i18nUrl === 'string' && i18nUrl.trim().length > 0) {
    return i18nUrl;
  }

  return CHECKOUT_URL;
}

/** Build checkout URL with UTMs and tracking params (xcod, sck) appended */
export function buildCheckoutUrl(locale: Locale): string {
  const utms = getUtms();
  const url = new URL(getBaseCheckoutUrl(locale));
  Object.entries(utms).forEach(([key, val]) => {
    url.searchParams.set(key, val);
  });
  const uid = getTrackingUid();
  url.searchParams.set('xcod', 'mt_TnVtZXJ-' + uid);
  url.searchParams.set('sck', 'mt_TnVtZXJ|' + uid);
  return url.toString();
}

/** Navigate to checkout (same tab) */
export function goToCheckout(locale: Locale): void {
  window.location.href = buildCheckoutUrl(locale);
}
