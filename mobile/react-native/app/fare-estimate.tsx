import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme, SegmentedButtons } from "react-native-paper";
import { Header, Button, Input, ErrorMessage } from "@components/common";
import { rideService } from "@services/ride";
import Toast from "react-native-toast-message";

const ESTIMATE_LOCATIONS = {
  pickup: { latitude: 6.5244, longitude: 3.3792, address: "Lagos" },
  dropoff: { latitude: 9.0765, longitude: 7.3986, address: "Abuja" },
};

const FareEstimateScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rideType, setRideType] = useState("economy");
  const [result, setResult] = useState<any>(null);

  const handleEstimate = async () => {
    setError("");
    setLoading(true);

    try {
      const estimate = await rideService.estimateFare(
        ESTIMATE_LOCATIONS.pickup,
        ESTIMATE_LOCATIONS.dropoff,
        rideType as "economy" | "comfort" | "premium"
      );
      setResult(estimate);
      Toast.show({ type: "success", text1: "Fare estimate ready", text2: `Estimated total: ₦${estimate.totalFare}` });
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Unable to estimate fare.";
      setError(message);
      Toast.show({ type: "error", text1: "Estimate failed", text2: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Fare Estimate" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <ErrorMessage message={error} visible={!!error} />

        <View style={styles.card}>
          <Text variant="headlineSmall" style={{ color: theme.colors.primary, fontWeight: "700", marginBottom: 12 }}>
            Estimate your trip
          </Text>

          <Text variant="titleSmall" style={{ color: theme.colors.onBackground, marginBottom: 8 }}>Trip type</Text>
          <SegmentedButtons
            value={rideType}
            onValueChange={setRideType}
            buttons={[
              { value: "economy", label: "Economy" },
              { value: "comfort", label: "Comfort" },
              { value: "premium", label: "Premium" },
            ]}
          />

          <Input
            label="Pickup city"
            value="Lagos"
            onChangeText={() => undefined}
            editable={false}
            accessibilityLabel="Pickup city"
            icon="map-marker"
          />

          <Input
            label="Destination city"
            value="Abuja"
            onChangeText={() => undefined}
            editable={false}
            accessibilityLabel="Destination city"
            icon="map-marker-radius"
          />

          <Button label={loading ? "Calculating..." : "Calculate Fare"} onPress={handleEstimate} loading={loading} disabled={loading} fullWidth size="large" />
        </View>

        {result && (
          <View style={[styles.resultCard, { backgroundColor: theme.colors.surface }]}>
            <Text variant="titleLarge" style={{ color: theme.colors.primary, fontWeight: "700" }}>Estimated fare</Text>
            <Text variant="displaySmall" style={{ color: theme.colors.primary, fontWeight: "800", marginTop: 8 }}>
              ₦{Number(result.totalFare || 0).toFixed(2)}
            </Text>

            <View style={styles.resultRow}>
              <Text style={{ color: theme.colors.onSurfaceVariant }}>Base fare</Text>
              <Text style={{ color: theme.colors.onBackground, fontWeight: "600" }}>₦{Number(result.baseFare || 0).toFixed(2)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={{ color: theme.colors.onSurfaceVariant }}>Distance fare</Text>
              <Text style={{ color: theme.colors.onBackground, fontWeight: "600" }}>₦{Number(result.distanceFare || 0).toFixed(2)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={{ color: theme.colors.onSurfaceVariant }}>Time fare</Text>
              <Text style={{ color: theme.colors.onBackground, fontWeight: "600" }}>₦{Number(result.timeFare || 0).toFixed(2)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={{ color: theme.colors.onSurfaceVariant }}>Surge fare</Text>
              <Text style={{ color: theme.colors.onBackground, fontWeight: "600" }}>₦{Number(result.surgeFare || 0).toFixed(2)}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexGrow: 1, padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  resultCard: {
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});

export default FareEstimateScreen;
