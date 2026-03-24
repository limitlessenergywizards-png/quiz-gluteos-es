/**
 * Checkout URL and UTM propagation utilities.
 * Zero dependencies — pluggable into any TypeScript project.
 *
 * Usage:
 *   initCheckout({ checkoutUrl, projectKey })  — call once on app init
 *   captureUtms()                               — call once on app init
 *   buildCheckoutUrl()                          — returns URL string with UTMs + xcod + sck
 *   goToCheckout()                              — redirects to checkout
 */

interface CheckoutConfig {
  checkoutUrl: string;
  projectKey: string;
}

let _config: CheckoutConfig = {
  checkoutUrl: '',
  projectKey: '',
};

/** Initialize checkout config. Call once on app startup. */
export function initCheckout(config: CheckoutConfig): void {
  _config = { ...config };
}

const UTM_PARAMS = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term', 'src'];

function getCookie(name: string): string | null {
  const escaped = name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1');
  const m = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

/** Get tracking UID from global tracker, localStorage, or cookie */
function getTrackingUid(): string {
  if (typeof window === 'undefined') return '';
  if ((window as any)._mt?.uid != null) return String((window as any)._mt.uid);
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

/** Build checkout URL with UTMs and tracking params (xcod, sck) appended */
export function buildCheckoutUrl(): string {
  if (!_config.checkoutUrl) {
    console.warn('[checkout] initCheckout() not called — using empty URL');
    return '#';
  }
  const utms = getUtms();
  const url = new URL(_config.checkoutUrl);
  Object.entries(utms).forEach(([key, val]) => {
    url.searchParams.set(key, val);
  });
  const uid = getTrackingUid();
  url.searchParams.set('xcod', _config.projectKey + '-' + uid);
  url.searchParams.set('sck', _config.projectKey + '|' + uid);
  return url.toString();
}

/** Navigate to checkout (same tab) */
export function goToCheckout(): void {
  window.location.href = buildCheckoutUrl();
}
