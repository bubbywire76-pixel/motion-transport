import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Text, useTheme, Divider, List } from "react-native-paper";
import { Header, Button, LoadingSpinner, ErrorMessage } from "@components/common";
import { rideService } from "@services/ride";
import { FareEstimate } from "@types/index";

interface FareEstimateScreenProps {
  route: any;
  navigation: any;
}

const FareEstimateScreen: React.FC<FareEstimateScreenProps> = ({ route, navigation }) => {
  const { pickup, destination, rideType } = route.params;
  const theme = useTheme();
  const [estimate, setEstimate] = useState<FareEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        // Mock locations for estimation
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

        const result = await rideService.estimateFare(mockPickup, mockDropoff, rideType);
        setEstimate(result);
      } catch (err) {
        setError("Failed to calculate fare estimate. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstimate();
  }, [pickup, destination, rideType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header 
        title="Fare Estimate" 
        showBack 
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ErrorMessage message={error} visible={!!error} />

        {estimate && (
          <View style={styles.card}>
            <Text variant="titleLarge" style={styles.totalAmount}>
              {formatCurrency(estimate.totalFare)}
            </Text>
            <Text variant="bodyMedium" style={styles.rideTypeLabel}>
              Estimated fare for {rideType} ride
            </Text>

            <Divider style={styles.divider} />

            <List.Section>
              <List.Item
                title="Base Fare"
                right={() => <Text>{formatCurrency(estimate.baseFare)}</Text>}
              />
              <List.Item
                title="Distance Fare"
                description={`${estimate.distance.toFixed(2)} km`}
                right={() => <Text>{formatCurrency(estimate.distanceFare)}</Text>}
              />
              <List.Item
                title="Time Fare"
                description={`${Math.round(estimate.duration / 60)} mins`}
                right={() => <Text>{formatCurrency(estimate.timeFare)}</Text>}
              />
              {estimate.surgeFare > 0 && (
                <List.Item
                  title="Surge Pricing"
                  titleStyle={{ color: theme.colors.error }}
                  right={() => <Text style={{ color: theme.colors.error }}>{formatCurrency(estimate.surgeFare)}</Text>}
                />
              )}
            </List.Section>

            <Divider style={styles.divider} />

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text variant="labelSmall">Distance</Text>
                <Text variant="bodyLarge">{estimate.distance.toFixed(1)} km</Text>
              </View>
              <View style={styles.detailItem}>
                <Text variant="labelSmall">Est. Time</Text>
                <Text variant="bodyLarge">{Math.round(estimate.duration / 60)} min</Text>
              </View>
            </View>

            <Button
              label="Back to Booking"
              onPress={() => navigation.goBack()}
              fullWidth
              style={{ marginTop: 24 }}
            />
          </View>
        )}

        <View style={styles.disclaimerContainer}>
          <Text variant="bodySmall" style={styles.disclaimerText}>
            * This is an estimated fare. Final fare may vary based on traffic, 
            route changes, and waiting time.
          </Text>
        </View>
      </ScrollView>
      <LoadingSpinner visible={isLoading} message="Calculating fare..." />
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
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalAmount: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 32,
    marginTop: 10,
  },
  rideTypeLabel: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    textTransform: "capitalize",
  },
  divider: {
    marginVertical: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  detailItem: {
    alignItems: "center",
  },
  disclaimerContainer: {
    marginTop: 24,
    paddingHorizontal: 10,
  },
  disclaimerText: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
  },
});

export default FareEstimateScreen;
