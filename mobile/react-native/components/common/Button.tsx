import React from "react";
import { StyleSheet, View, AccessibilityInfo } from "react-native";
import { Button as PaperButton, useTheme } from "react-native-paper";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  icon?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  accessibilityLabel,
  icon,
}) => {
  const theme = useTheme();

  const getButtonStyle = () => {
    const baseStyle: any = {
      marginVertical: 8,
    };

    if (fullWidth) {
      baseStyle.alignSelf = "stretch";
    }

    if (size === "small") {
      baseStyle.paddingVertical = 6;
    } else if (size === "large") {
      baseStyle.paddingVertical = 16;
    }

    return baseStyle;
  };

  const getMode = () => {
    if (variant === "outline") return "outlined";
    if (variant === "secondary") return "contained-tonal";
    return "contained";
  };

  return (
    <PaperButton
      mode={getMode()}
      onPress={onPress}
      disabled={disabled || loading}
      loading={loading}
      style={getButtonStyle()}
      labelStyle={{
        fontSize: size === "small" ? 12 : size === "large" ? 16 : 14,
      }}
      icon={icon}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {label}
    </PaperButton>
  );
};
