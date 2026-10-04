import React, { useState } from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button as PaperButton, Text, TextInput, useTheme } from "react-native-paper";
import { Button, ErrorMessage, Header } from "@components/common";
import {
  FlightOffer,
  searchFlights,
  startFlightBooking,
} from "@services/travel";

interface FlightsScreenProps {
  navigation: any;
}

function formatFlightTime(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
}

function dateFromDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  date.setHours(0, 0, 0, 0);
  return date;
}

const FlightsScreen: React.FC<FlightsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [bookingOfferId, setBookingOfferId] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!/^[A-Za-z]{3}$/.test(origin) || !/^[A-Za-z]{3}$/.test(destination)) {
      setError("Enter valid three-letter airport codes, such as LOS and NBO.");
      return;
    }
    const departure = dateFromDateOnly(departureDate);
    const departureToday = new Date();
    departureToday.setHours(0, 0, 0, 0);
    if (!departure) {
      setError("Enter a valid departure date in YYYY-MM-DD format.");
      return;
    }
    if (departure < departureToday) {
      setError("Departure date cannot be in the past.");
      return;
    }
    const returnFlight = returnDate ? dateFromDateOnly(returnDate) : null;
    if (returnDate && !returnFlight) {
      setError("Enter a valid return date in YYYY-MM-DD format, or leave it blank.");
      return;
    }
    if (returnFlight && returnFlight < departure) {
      setError("Return date must be on or after departure.");
      return;
    }
    if (origin.toUpperCase() === destination.toUpperCase()) {
      setError("Choose different departure and destination airports.");
      return;
    }

    setError("");
    setOffers([]);
    setIsSearching(true);
    try {
      const result = await searchFlights({
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        departureDate,
        ...(returnDate ? { returnDate } : {}),
        passengers,
      });
      setOffers(result.offers);
      setSearchId(result.searchId);
      if (result.offers.length === 0) {
        setError("No live flights were returned for those dates. Try different airports or dates.");
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Flight search failed. No sample fares are shown.",
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleBook = async (offerId: string) => {
    setError("");
    setBookingOfferId(offerId);
    try {
      const booking = await startFlightBooking(offerId, searchId);
      if (!/^https:\/\//i.test(booking.checkoutUrl)) {
        throw new Error("The travel provider returned an invalid checkout link.");
      }
      await Linking.openURL(booking.checkoutUrl);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Booking could not be started. No ticket was purchased.",
      );
    } finally {
      setBookingOfferId("");
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header
        title="Flights"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text variant="bodyMedium" style={styles.intro}>
          Search current fares from the connected travel provider. A reservation
          is made only after you review the live offer and complete secure checkout.
        </Text>

        <View style={styles.airportRow}>
          <TextInput
            label="From"
            placeholder="LOS"
            value={origin}
            onChangeText={(value) => setOrigin(value.replace(/[^a-z]/gi, "").slice(0, 3).toUpperCase())}
            autoCapitalize="characters"
            maxLength={3}
            mode="outlined"
            style={[styles.input, styles.airportInput]}
            accessibilityLabel="Departure airport code"
          />
          <TextInput
            label="To"
            placeholder="NBO"
            value={destination}
            onChangeText={(value) => setDestination(value.replace(/[^a-z]/gi, "").slice(0, 3).toUpperCase())}
            autoCapitalize="characters"
            maxLength={3}
            mode="outlined"
            style={[styles.input, styles.airportInput]}
            accessibilityLabel="Destination airport code"
          />
        </View>
        <TextInput
          label="Departure date"
          placeholder="YYYY-MM-DD"
          value={departureDate}
          onChangeText={setDepartureDate}
          keyboardType="numbers-and-punctuation"
          mode="outlined"
          style={styles.input}
          accessibilityLabel="Departure date"
        />
        <TextInput
          label="Return date (optional)"
          placeholder="YYYY-MM-DD"
          value={returnDate}
          onChangeText={setReturnDate}
          keyboardType="numbers-and-punctuation"
          mode="outlined"
          style={styles.input}
          accessibilityLabel="Return date"
        />
        <View style={styles.passengerRow}>
          <Text variant="bodyLarge">Passengers</Text>
          <View style={styles.passengerControls}>
            <PaperButton
              compact
              mode="outlined"
              onPress={() => setPassengers((count) => Math.max(1, count - 1))}
              accessibilityLabel="Remove one passenger"
            >
              −
            </PaperButton>
            <Text variant="titleMedium" accessibilityLiveRegion="polite">
              {passengers}
            </Text>
            <PaperButton
              compact
              mode="outlined"
              onPress={() => setPassengers((count) => Math.min(9, count + 1))}
              accessibilityLabel="Add one passenger"
            >
              +
            </PaperButton>
          </View>
        </View>
        <Button
          label="Search live flights"
          onPress={handleSearch}
          loading={isSearching}
          fullWidth
          icon="airplane-search"
        />

        {!!error && <ErrorMessage message={error} visible />}

        {offers.length > 0 && (
          <View style={styles.offers}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Live flight options
            </Text>
            {offers.map((offer) => (
              <View
                key={offer.id}
                style={[
                  styles.offer,
                  { backgroundColor: theme.colors.surface },
                ]}
              >
                <View style={styles.offerHeading}>
                  <Text variant="titleMedium" style={styles.airline}>
                    {offer.airline}
                  </Text>
                  <Text variant="titleMedium" style={styles.price}>
                    {offer.currency} {offer.totalAmount}
                  </Text>
                </View>
                <Text variant="bodySmall" style={styles.muted}>
                  {offer.flightNumber} · {offer.duration} ·{" "}
                  {offer.stops === 0 ? "Nonstop" : `${offer.stops} stop(s)`}
                </Text>
                <Text variant="bodyMedium" style={styles.times}>
                  {offer.origin}  {formatFlightTime(offer.departureAt)}
                </Text>
                <Text variant="bodyMedium" style={styles.times}>
                  {offer.destination}  {formatFlightTime(offer.arrivalAt)}
                </Text>
                <Button
                  label="Continue to secure checkout"
                  onPress={() => handleBook(offer.id)}
                  loading={bookingOfferId === offer.id}
                  disabled={!!bookingOfferId}
                  fullWidth
                  icon="lock-outline"
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  intro: { color: "#596469", lineHeight: 22, marginBottom: 16 },
  airportRow: { flexDirection: "row", gap: 12 },
  input: { marginBottom: 8, backgroundColor: "transparent" },
  airportInput: { flex: 1 },
  passengerRow: {
    minHeight: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passengerControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  offers: { marginTop: 24 },
  sectionTitle: { fontWeight: "700", marginBottom: 12 },
  offer: { borderRadius: 16, padding: 16, marginBottom: 12 },
  offerHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  airline: { flex: 1, fontWeight: "700" },
  price: { fontWeight: "700", color: "#006F70" },
  muted: { color: "#626B70", marginTop: 4, marginBottom: 8 },
  times: { marginTop: 3 },
});

export default FlightsScreen;
