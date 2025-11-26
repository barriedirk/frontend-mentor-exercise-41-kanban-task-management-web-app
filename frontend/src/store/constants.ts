// SSR-safe fake storage
export const ssrSafeStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};
