export const reportConversion = (url?: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  const fn = (window as any).gtag_report_conversion as
    | ((redirectUrl?: string) => boolean)
    | undefined;

  if (typeof fn === 'function') {
    fn(url);
  }
};
