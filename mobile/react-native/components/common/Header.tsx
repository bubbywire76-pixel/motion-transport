import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
    label: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightAction,
}) => {
  const theme = useTheme();

  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.primary,
      }}
    >
      {onBack && (
        <Appbar.BackAction
          onPress={onBack}
          accessibilityLabel="Go back"
          color={theme.colors.onPrimary}
        />
      )}
      <Appbar.Content
        title={title}
        subtitle={subtitle}
        titleStyle={{ color: theme.colors.onPrimary }}
        subtitleStyle={{ color: theme.colors.onPrimary }}
      />
      {rightAction && (
        <Appbar.Action
          icon={rightAction.icon}
          onPress={rightAction.onPress}
          accessibilityLabel={rightAction.label}
          color={theme.colors.onPrimary}
        />
      )}
    </Appbar.Header>
  );
};
