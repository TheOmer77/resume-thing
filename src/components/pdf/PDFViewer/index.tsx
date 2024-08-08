import { ClientPDFViewer } from './client';

// @ts-expect-error This is a polyfill for Promise.withResolvers
if (typeof Promise.withResolvers === 'undefined') {
  const withResolvers = () => {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };

  if (typeof window !== 'undefined')
    // @ts-expect-error Polyfill
    window.Promise.withResolvers = withResolvers;
  // @ts-expect-error Polyfill
  else global.Promise.withResolvers = withResolvers;
}

export const PDFViewer = () => <ClientPDFViewer />;
