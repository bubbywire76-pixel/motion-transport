import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text, useTheme, SegmentedButtons } from "react-native-paper";
import { Header, Input, Button, ErrorMessage } from "@components/common";
import { rideService } from "@services/ride";
import Toast from "react-native-toast-message";

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  Lagos: { latitude: 6.5244, longitude: 3.3792 },
  Abuja: { latitude: 9.0765, longitude: 7.3986 },
  Ibadan: { latitude: 7.3775, longitude: 3.9470 },
  Kano: { latitude: 12.0022, longitude: 8.5920 },
  "Port Harcourt": { latitude: 4.8156, longitude: 7.0498 },
  Enugu: { latitude: 6.5244, longitude: 7.4954 },
  "Benin City": { latitude: 6.3350, longitude: 5.6037 },
  Kaduna: { latitude: 10.5222, longitude: 7.4383 },
  Ilorin: { latitude: 8.4966, longitude: 4.5421 },
  Abeokuta: { latitude: 7.1500, longitude: 3.3500 },
  Maiduguri: { latitude: 11.8333, longitude: 13.1500 },
  Calabar: { latitude: 4.9580, longitude: 8.3417 },
  Akure: { latitude: 7.2500, longitude: 5.2100 },
  Owerri: { latitude: 5.4833, longitude: 7.0333 },
};

const cityOptions = Object.keys(CITY_COORDS);

const BookRideScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    pickup: "Lagos",
    dropoff: "Abuja",
    rideType: "economy",
    scheduledTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    notes: "",
  });

  const pickupCoords = useMemo(() => CITY_COORDS[form.pickup] ?? CITY_COORDS.Lagos, [form.pickup]);
  const dropoffCoords = useMemo(() => CITY_COORDS[form.dropoff] ?? CITY_COORDS.Abuja, [form.dropoff]);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      await rideService.bookRide({
        pickupLocation: {
          latitude: pickupCoords.latitude,
          longitude: pickupCoords.longitude,
          address: form.pickup,
        },
        dropoffLocation: {
          latitude: dropoffCoords.latitude,
          longitude: dropoffCoords.longitude,
          address: form.dropoff,
        },
        rideType: form.rideType as "economy" | "comfort" | "premium",
        scheduledTime: form.scheduledTime,
      });

      Toast.show({
        type: "success",
        text1: "Ride request sent",
        text2: "A dispatcher will contact you shortly.",
      });
      navigation.goBack();
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Unable to book ride.";
      setError(message);
      Toast.show({
        type: "error",
        text1: "Booking failed",
        text2: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Book a Ride" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <ErrorMessage message={error} visible={!!error} />

        <View style={styles.card}>
          <Text variant="headlineSmall" style={{ color: theme.colors.primary, fontWeight: "700", marginBottom: 8 }}>
            Request a trip
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 20 }}>
            Choose your pickup, destination, and preferred ride type.
          </Text>

          <Input
            label="Pickup city"
            value={form.pickup}
            onChangeText={(value) => setForm((prev) => ({ ...prev, pickup: value }))}
            accessibilityLabel="Pickup city"
            icon="map-marker"
          />

          <Input
            label="Dropoff city"
            value={form.dropoff}
            onChangeText={(value) => setForm((prev) => ({ ...prev, dropoff: value }))}
            accessibilityLabel="Dropoff city"
            icon="map-marker-radius"
          />

          <Text variant="titleSmall" style={{ color: theme.colors.onBackground, marginTop: 12, marginBottom: 8 }}>
            Ride type
          </Text>
          <SegmentedButtons
            value={form.rideType}
            onValueChange={(value) => setForm((prev) => ({ ...prev, rideType: value }))}
            buttons={[
              { value: "economy", label: "Economy" },
              { value: "comfort", label: "Comfort" },
              { value: "premium", label: "Premium" },
            ]}
          />

          <Input
            label="Pickup time"
            value={form.scheduledTime}
            onChangeText={(value) => setForm((prev) => ({ ...prev, scheduledTime: value }))}
            accessibilityLabel="Pickup time"
            icon="clock-outline"
          />

          <Input
            label="Notes"
            value={form.notes}
            onChangeText={(value) => setForm((prev) => ({ ...prev, notes: value }))}
            accessibilityLabel="Additional notes"
            multiline
            numberOfLines={4}
            icon="note-text"
          />

          <Button
            label={loading ? "Booking..." : "Request Ride"}
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            fullWidth
            size="large"
          />
        </View>
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
});

export default BookRideScreen;
