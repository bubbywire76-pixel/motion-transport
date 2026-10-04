import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, useTheme } from "react-native-paper";
import { useAuth } from "@context/AuthContext";
import { Header } from "@components/common";

interface LifestyleScreenProps {
  navigation: any;
}

const destinations = [
  {
    title: "Bills & payments",
    subtitle: "Pay supported utilities and services",
    icon: "script-text-outline" as const,
    route: "BillPayments",
    color: "#FFF1E6",
    iconColor: "#A84E05",
  },
  {
    title: "Flights",
    subtitle: "Search and book travel worldwide",
    icon: "airplane" as const,
    route: "Flights",
    color: "#E7F3F4",
    iconColor: "#006F70",
  },
  {
    title: "Daily activity",
    subtitle: "Track steps with your phone",
    icon: "shoe-print" as const,
    route: "Activity",
    color: "#EAF2E8",
    iconColor: "#376745",
  },
];

const LifestyleScreen: React.FC<LifestyleScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title="Life" subtitle={`Good to see you, ${user?.firstName ?? "there"}`} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.welcome, { backgroundColor: theme.colors.primary }]}>
          <MaterialCommunityIcons
            name="compass-outline"
            size={28}
            color="#FFFFFF"
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
          <Text variant="headlineSmall" style={styles.welcomeTitle}>
            Life, in motion.
          </Text>
          <Text variant="bodyMedium" style={styles.welcomeCopy}>
            Get around, take care of everyday essentials, and keep moving.
          </Text>
        </View>

        <Text variant="titleLarge" style={styles.sectionTitle}>
          Everyday, all in one place
        </Text>

        <View style={styles.destinations}>
          {destinations.map((destination) => (
            <TouchableOpacity
              key={destination.route}
              accessibilityRole="button"
              accessibilityLabel={`${destination.title}. ${destination.subtitle}`}
              activeOpacity={0.75}
              onPress={() => navigation.navigate(destination.route)}
              style={[
                styles.destination,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <View
                style={[
                  styles.destinationIcon,
                  { backgroundColor: destination.color },
                ]}
              >
                <MaterialCommunityIcons
                  name={destination.icon}
                  size={24}
                  color={destination.iconColor}
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                />
              </View>
              <View style={styles.destinationText}>
                <Text variant="titleMedium" style={styles.destinationTitle}>
                  {destination.title}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {destination.subtitle}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={theme.colors.onSurfaceVariant}
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text variant="bodySmall" style={styles.note}>
          Payment and flight options depend on live provider coverage in your
          country. Activity tracking uses your device&apos;s motion sensor.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  welcome: {
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 24,
    marginBottom: 28,
  },
  welcomeTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 6,
  },
  welcomeCopy: { color: "#E5FFFF", lineHeight: 22, maxWidth: 320 },
  sectionTitle: { marginBottom: 14, fontWeight: "700" },
  destinations: { gap: 12 },
  destination: {
    minHeight: 88,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  destinationIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  destinationText: { flex: 1, gap: 3 },
  destinationTitle: { fontWeight: "600" },
  note: {
    color: "#626B70",
    lineHeight: 19,
    marginTop: 22,
    paddingHorizontal: 2,
  },
});

export default LifestyleScreen;
