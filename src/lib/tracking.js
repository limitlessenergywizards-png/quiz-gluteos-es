import { supabase } from './supabase';

let sessionId = null;
let sessionReady = null; // promise that resolves when session is created

/**
 * Parse user agent into browser, device_type, and os
 */
function parseUserAgent(ua) {
  // Browser
  let browser = 'Unknown';
  if (ua.includes('CriOS')) browser = 'Chrome iOS';
  else if (ua.includes('FxiOS')) browser = 'Firefox iOS';
  else if (ua.includes('EdgA') || ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';
  else if (ua.includes('SamsungBrowser')) browser = 'Samsung Browser';
  else if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';

  // OS
  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('Linux')) os = 'Linux';

  // Device type
  let device_type = 'desktop';
  if (/Mobi|Android|iPhone|iPod/.test(ua)) device_type = 'mobile';
  else if (/iPad|Tablet/.test(ua)) device_type = 'tablet';

  return { browser, os, device_type };
}

/**
 * Get UTM params from URL
 */
function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || null,
    utm_medium: params.get('utm_medium') || null,
    utm_campaign: params.get('utm_campaign') || null,
  };
}

/**
 * Fetch IP and geolocation data
 */
async function getGeoData() {
  try {
    const res = await fetch('https://ipwho.is/');
    if (!res.ok) throw new Error('geo fetch failed');
    const data = await res.json();
    if (!data.success) throw new Error('geo lookup failed');
    return {
      ip_address: data.ip || null,
      country: data.country || null,
      city: data.city || null,
      region: data.region || null,
    };
  } catch {
    return { ip_address: null, country: null, city: null, region: null };
  }
}

/**
 * Initialize session — call once on app load.
 * Creates a row in sessions with device/geo info.
 * Returns the session id.
 */
export function initSession() {
  sessionReady = (async () => {
    const ua = navigator.userAgent;
    const { browser, os, device_type } = parseUserAgent(ua);
    const utms = getUtmParams();
    const geo = await getGeoData();

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_agent: ua,
        browser,
        os,
        device_type,
        referrer: document.referrer || null,
        ...utms,
        ...geo,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Failed to create session:', error);
      return null;
    }

    sessionId = data.id;
    return sessionId;
  })();

  return sessionReady;
}

/**
 * Get current session id (waits for init if needed)
 */
export async function getSessionId() {
  if (sessionReady) await sessionReady;
  return sessionId;
}

/**
 * Track a funnel event (landing_view, quiz_start, quiz_complete, result_view, cta_click, etc.)
 */
export async function trackEvent(eventType, metadata = {}) {
  const sid = await getSessionId();
  if (!sid) return;

  const { error } = await supabase.from('funnel_events').insert({
    session_id: sid,
    event_type: eventType,
    metadata,
  });

  if (error) console.error('Failed to track event:', error);
}

/**
 * Track a quiz answer
 */
export async function trackAnswer(questionId, answerOption) {
  const sid = await getSessionId();
  if (!sid) return;

  const { error } = await supabase.from('quiz_answers').insert({
    session_id: sid,
    question_id: questionId,
    answer_option: answerOption,
  });

  if (error) console.error('Failed to track answer:', error);
}
