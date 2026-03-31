export const getApiBase = () => {
  if (typeof window === 'undefined') return '';
  
  const { hostname, port } = window.location;
  
  // If we are on localhost, we need to point to the backend port (3000)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://${hostname}:3000`;
  }
  
  // If we are on a run.app or vercel.app domain, we can use relative paths (same origin)
  if (hostname.includes('run.app') || hostname.includes('vercel.app')) {
    return '';
  }
  
  // Otherwise, use the hardcoded production URL
  return 'https://ais-dev-i2s6j473uusrp3lsvm4alv-781732712074.asia-southeast1.run.app';
};
