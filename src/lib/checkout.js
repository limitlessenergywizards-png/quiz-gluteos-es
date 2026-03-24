/**
 * Checkout URL and UTM propagation utilities.
 */

const DEFAULT_CHECKOUT_URL = 'https://pay.hotmart.com/U104562370W?off=9hdj05p0&checkoutMode=10';

const CHECKOUT_URL =
  import.meta.env.VITE_HOTMART_URL?.trim() || DEFAULT_CHECKOUT_URL;

const PROJECT_KEY =
  import.meta.env.VITE_MT_PROJECT_KEY?.trim() || 'mt_bGVtb24';

const UTM_PARAMS = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term', 'src'];

function getCookie(name) {
  const escaped = name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1');
  const m = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

/** Get tracking UID from global tracker, localStorage, or cookie */
function getTrackingUid() {
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
export function captureUtms() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utms = {};
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
export function getUtms() {
  try {
    const stored = sessionStorage.getItem('funnel_utms');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/** Build checkout URL with UTMs and tracking params (xcod, sck) appended */
export function buildCheckoutUrl() {
  const utms = getUtms();
  const url = new URL(CHECKOUT_URL);
  Object.entries(utms).forEach(([key, val]) => {
    url.searchParams.set(key, val);
  });
  const uid = getTrackingUid();
  url.searchParams.set('xcod', PROJECT_KEY + '-' + uid);
  url.searchParams.set('sck', PROJECT_KEY + '|' + uid);
  return url.toString();
}

/** Navigate to checkout (same tab) */
export function goToCheckout() {
  window.location.href = buildCheckoutUrl();
}
