// src/reportWebVitals.ts
// @ts-ignore
import * as webVitals from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // @ts-ignore
    webVitals.getCLS(onPerfEntry);
    // @ts-ignore
    webVitals.getFID(onPerfEntry);
    // @ts-ignore
    webVitals.getFCP(onPerfEntry);
    // @ts-ignore
    webVitals.getLCP(onPerfEntry);
    // @ts-ignore
    webVitals.getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
