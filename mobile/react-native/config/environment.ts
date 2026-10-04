import Constants from "expo-constants";

type Environment = "development" | "staging" | "production";

const releaseChannel =
  Constants.expoConfig?.extra?.releaseChannel ??
  (process.env.EXPO_PUBLIC_RELEASE_CHANNEL || "development");
const environment: Environment =
  releaseChannel === "production"
    ? "production"
    : releaseChannel === "staging"
      ? "staging"
      : "development";
const API_BASE_URL =
  Constants.expoConfig?.extra?.apiBaseUrl ??
  process.env.EXPO_PUBLIC_API_URL ??
  (__DEV__ ? "http://localhost:5000/api" : "");

export const envConfig = {
  API_BASE_URL,
  environment,
  LOG_LEVEL: environment === "development" ? "debug" : "error",
};
