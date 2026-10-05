import Constants from "expo-constants";

type Environment = "development" | "staging" | "production";

const ENV = {
  dev: {
    API_BASE_URL: "http://localhost:5000/api",
    LOG_LEVEL: "debug",
    environment: "development" as Environment,
  },
  staging: {
    API_BASE_URL: "https://staging-api.motionxport.com/api",
    LOG_LEVEL: "info",
    environment: "staging" as Environment,
  },
  prod: {
    API_BASE_URL: "https://api.motionxport.com/api",
    LOG_LEVEL: "error",
    environment: "production" as Environment,
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }

  // Check for environment override
  const releaseChannel = Constants.expoConfig?.extra?.releaseChannel;
  if (releaseChannel === "staging") {
    return ENV.staging;
  }
  if (releaseChannel === "production") {
    return ENV.prod;
  }

  return ENV.dev;
};

export const envConfig = getEnvVars();
