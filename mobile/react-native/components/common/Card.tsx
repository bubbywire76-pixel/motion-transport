import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Card as PaperCard, Text, useTheme } from "react-native-paper";

interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  icon?: string;
  accent?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  onPress,
  style,
  icon,
  accent = false,
}) => {
  const theme = useTheme();

  const cardStyle = [
    styles.card,
    accent && {
      borderLeftColor: theme.colors.secondary,
      borderLeftWidth: 4,
    },
    style,
  ];

  return (
    <PaperCard
      style={cardStyle}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {(title || subtitle) && (
        <PaperCard.Title
          title={title}
          subtitle={subtitle}
          left={icon ? (props) => <Text {...props}>{icon}</Text> : undefined}
        />
      )}
      {children && <PaperCard.Content>{children}</PaperCard.Content>}
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 0,
  },
});
