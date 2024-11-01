export enum StorageKey {
    token = "token",
}

export const setStorageItem = (key: StorageKey, value: string) =>
    localStorage.setItem(key, value);

export const getStorageItem = (key: StorageKey) => localStorage.getItem(key);

export const removeStorageItem = (key: StorageKey) =>
    localStorage.removeItem(key);
