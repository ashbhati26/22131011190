import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logEvent } from '../utils/logger';
import { getRoughLocation } from '../utils/geolocation';

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shortcode) return;

    const data = localStorage.getItem(`shorturl:${shortcode}`);
    if (!data) {
      logEvent('redirect_failed', { shortcode, reason: 'Not found' });
      navigate('/stats');
      return;
    }

    const urlData = JSON.parse(data);
    const now = Date.now();

    if (now > urlData.expiresAt) {
      logEvent('redirect_failed', { shortcode, reason: 'Expired' });
      navigate('/stats');
      return;
    }

    // Log the click
    getRoughLocation().then((location) => {
      const log = {
        timestamp: now,
        referer: document.referrer || 'Direct',
        location,
      };

      const logs = JSON.parse(localStorage.getItem(`clicks:${shortcode}`) || '[]');
      logs.push(log);
      localStorage.setItem(`clicks:${shortcode}`, JSON.stringify(logs));

      logEvent('redirect_success', { shortcode, log });
      window.location.href = urlData.originalUrl;
    });
  }, [shortcode, navigate]);

  return null;
}
