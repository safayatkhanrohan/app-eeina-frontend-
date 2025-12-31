
export const trackIfAllowed = (callback: () => void) => {
  if (localStorage.getItem('cookieConsent') === 'analytics') {
    callback();
  }
};