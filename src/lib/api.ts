export const getApiBase = () => {
  if (typeof window === 'undefined') return '';
  
  const { hostname, search } = window.location;
  
  // Allow override via query param for testing: ?api=https://...
  const params = new URLSearchParams(search);
  const override = params.get('api');
  if (override) return override;

  // If we are on localhost, we need to point to the backend port (3000)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://${hostname}:3000`;
  }
  
  // If we are on a run.app domain, we can use relative paths (same origin)
  if (hostname.includes('run.app')) {
    return '';
  }
  
  // Otherwise, use the Shared App URL as the default production backend
  // This is usually more stable for external domains like Vercel
  return 'https://ais-pre-i2s6j473uusrp3lsvm4alv-781732712074.asia-southeast1.run.app';
};
