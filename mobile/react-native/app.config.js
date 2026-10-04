module.exports = ({ config }) => {
  const releaseChannel =
    process.env.EXPO_PUBLIC_RELEASE_CHANNEL || config.extra?.releaseChannel;
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL;

  if (
    releaseChannel !== "development" &&
    (!apiBaseUrl || !apiBaseUrl.startsWith("https://"))
  ) {
    throw new Error(
      `${releaseChannel} builds require EXPO_PUBLIC_API_URL to be an HTTPS URL.`,
    );
  }

  return {
    ...config,
    extra: {
      ...config.extra,
      apiBaseUrl,
      releaseChannel,
    },
  };
};
