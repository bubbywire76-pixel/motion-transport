import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface ErrorMessageProps {
  message: string;
  visible: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  visible,
}) => {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.error },
      ]}
      accessible={true}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
    >
      <Text
        variant="bodyMedium"
        style={[styles.text, { color: theme.colors.onError }]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 0,
    marginVertical: 8,
    borderRadius: 4,
  },
  text: {
    fontWeight: "500",
  },
});
