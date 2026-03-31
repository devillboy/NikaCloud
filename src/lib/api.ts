export const getApiBase = () => {
  if (typeof window === 'undefined') return '';
  
  const { hostname } = window.location;
  
  // If we are on localhost, we need to point to the backend port (3000)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://${hostname}:3000`;
  }
  
  // Use relative URL for Vercel deployment to allow proxying
  return '';
};
