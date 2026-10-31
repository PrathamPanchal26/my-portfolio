// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { TextDecoder, TextEncoder } from 'util';
import '@testing-library/jest-dom';

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}

// JSDOM Canvas Mock for performance testing
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = () => null;
}

if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    };
  };
}

if (typeof global.IntersectionObserver === 'undefined') {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
