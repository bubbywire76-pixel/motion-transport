import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, useTheme, SegmentedButtons } from "react-native-paper";
import { Header, Input, Button, LoadingSpinner, ErrorMessage } from "@components/common";
import { rideService } from "@services/ride";
import { locationService } from "@services/location";
import Toast from "react-native-toast-message";

interface BookRideScreenProps {
  navigation: any;
}

const BookRideScreen: React.FC<BookRideScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState<"economy" | "comfort" | "premium">("economy");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBookRide = async () => {
    if (!pickup || !destination) {
      setError("Please enter both pickup and destination locations");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // For now, we'll mock the location objects since we don't have a full map integration yet
      // In a real app, we'd use locationService.geocodeAddress(pickup)
      const mockPickup = {
        latitude: 6.5244,
        longitude: 3.3792,
        address: pickup,
      };

      const mockDropoff = {
        latitude: 9.0765,
        longitude: 7.3986,
        address: destination,
      };

      const ride = await rideService.bookRide({
        pickupLocation: mockPickup,
        dropoffLocation: mockDropoff,
        rideType,
      });

      Toast.show({
        type: "success",
        text1: "Ride Booked!",
        text2: `Your ${rideType} ride is being processed.`,
      });

      navigation.navigate("HomeMain");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book ride");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCurrentLocation = async () => {
    setIsLoading(true);
    try {
      const location = await locationService.getCurrentLocation();
      if (location) {
        setPickup("Current Location");
        // In a real app, we'd reverse geocode this to get a string address
      } else {
        Toast.show({
          type: "error",
          text1: "Location Error",
          text2: "Could not get your current location",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header 
        title="Book a Ride" 
        showBack 
        onBack={() => navigation.goBack()}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Where are you going?
          </Text>

          <ErrorMessage message={error} visible={!!error} />

          <View style={styles.form}>
            <Input
              label="Pickup Location"
              value={pickup}
              onChangeText={setPickup}
              placeholder="Enter pickup point"
              icon="map-marker"
              rightAction={{
                icon: "crosshairs-gps",
                onPress: handleGetCurrentLocation,
              }}
            />

            <Input
              label="Destination"
              value={destination}
              onChangeText={setDestination}
              placeholder="Enter destination"
              icon="map-marker-check"
            />

            <Text variant="titleSmall" style={styles.label}>
              Select Ride Type
            </Text>
            <SegmentedButtons
              value={rideType}
              onValueChange={(value: any) => setRideType(value)}
              buttons={[
                { value: "economy", label: "Economy" },
                { value: "comfort", label: "Comfort" },
                { value: "premium", label: "Premium" },
              ]}
              style={styles.segmentedButtons}
            />

            <View style={styles.estimateContainer}>
              <Button
                label="Check Fare Estimate"
                onPress={() => navigation.navigate("FareEstimate", { pickup, destination, rideType })}
                variant="outline"
                fullWidth
                style={{ marginBottom: 12 }}
              />
              
              <Button
                label="Confirm Booking"
                onPress={handleBookRide}
                loading={isLoading}
                disabled={isLoading}
                fullWidth
                size="large"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingSpinner visible={isLoading} message="Processing..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  form: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    marginTop: 16,
  },
  segmentedButtons: {
    marginBottom: 24,
  },
  estimateContainer: {
    marginTop: 20,
  },
});

export default BookRideScreen;
