/// <reference types="vite/client" />

// Extend the Window interface to include SDK_CONFIG
declare global {
  interface Window {
    SDK_CONFIG: SplitIO.IBrowserSettings;
  }
}

export {};
