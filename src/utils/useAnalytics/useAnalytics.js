export const useAnalytics = () => {

  const pushEvent = (event) => {
    window.dataLayer.push({ event })
  };

  return pushEvent
};