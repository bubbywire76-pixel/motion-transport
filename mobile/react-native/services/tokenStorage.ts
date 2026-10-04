import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

interface WebStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function getWebStorage(): WebStorage {
  const browserStorage = (
    globalThis as typeof globalThis & { localStorage?: WebStorage }
  ).localStorage;
  if (!browserStorage) {
    throw new Error("Browser storage is unavailable");
  }
  return browserStorage;
}

export const tokenStorage = {
  getItemAsync(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return Promise.resolve(getWebStorage().getItem(key));
    }
    return SecureStore.getItemAsync(key);
  },

  setItemAsync(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      getWebStorage().setItem(key, value);
      return Promise.resolve();
    }
    return SecureStore.setItemAsync(key, value);
  },

  deleteItemAsync(key: string): Promise<void> {
    if (Platform.OS === "web") {
      getWebStorage().removeItem(key);
      return Promise.resolve();
    }
    return SecureStore.deleteItemAsync(key);
  },
};
