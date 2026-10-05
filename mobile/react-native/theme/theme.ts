import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const colors = {
  primary: "#008B8B",
  primaryDark: "#006B6B",
  primaryLight: "#20A9A9",
  accent: "#FF8C00",
  accentDark: "#E67E00",
  accentLight: "#FFB84D",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  error: "#B3261E",
  success: "#4CAF50",
  warning: "#FFC107",
  info: "#2196F3",
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    onPrimary: "#FFFFFF",
    primaryContainer: colors.primaryLight,
    onPrimaryContainer: colors.primaryDark,
    secondary: colors.accent,
    onSecondary: "#FFFFFF",
    secondaryContainer: colors.accentLight,
    onSecondaryContainer: colors.accentDark,
    background: colors.background,
    onBackground: "#1A1A1A",
    surface: colors.surface,
    onSurface: "#1A1A1A",
    surfaceVariant: "#E8E8E8",
    onSurfaceVariant: "#49454E",
    outline: "#79747E",
    error: colors.error,
    onError: "#FFFFFF",
    errorContainer: "#F9DEDC",
    onErrorContainer: "#410E0B",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primaryLight,
    onPrimary: colors.primaryDark,
    primaryContainer: colors.primary,
    onPrimaryContainer: colors.primaryLight,
    secondary: colors.accentLight,
    onSecondary: colors.accentDark,
    secondaryContainer: colors.accent,
    onSecondaryContainer: colors.accentLight,
    background: "#121212",
    onBackground: "#E1E1E1",
    surface: "#1E1E1E",
    onSurface: "#E1E1E1",
    surfaceVariant: "#49454E",
    onSurfaceVariant: "#CAC7D0",
    outline: "#938F96",
    error: "#F2B8B5",
    onError: "#601410",
    errorContainer: "#8C1D18",
    onErrorContainer: "#F9DEDC",
  },
};

export const customColors = colors;
