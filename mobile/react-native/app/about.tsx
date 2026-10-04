import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Header, Card } from "@components/common";

const AboutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="About Motion" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.hero, { backgroundColor: theme.colors.primary }]}>
          <Text variant="headlineMedium" style={{ color: theme.colors.onPrimary, fontWeight: "700" }}>
            Moving people and goods reliably across Nigeria
          </Text>
        </View>

        <Card title="Our mission" accent>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            Motion connects riders, drivers, and businesses through a safer, more transparent transportation platform for daily travel and logistics.
          </Text>
        </Card>

        <Card title="Our values" accent>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            We focus on reliability, safety, affordability, and operational excellence across every trip and dispatch.
          </Text>
        </Card>

        <View style={styles.grid}>
          {[
            "Nationwide coverage",
            "Verified drivers",
            "Transparent pricing",
            "Business dispatch support",
          ].map((item) => (
            <View key={item} style={[styles.pill, { backgroundColor: theme.colors.surface }]}>
              <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexGrow: 1, padding: 16 },
  hero: {
    borderRadius: 18,
    padding: 24,
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  pill: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
});

export default AboutScreen;
