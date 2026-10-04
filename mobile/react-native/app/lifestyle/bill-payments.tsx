import React, { useState } from "react";
import { Linking, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button as PaperButton, Text, TextInput, useTheme } from "react-native-paper";
import { Button, ErrorMessage, Header } from "@components/common";
import { Biller, getBillers, startBillPayment } from "@services/lifestyle";

interface BillPaymentsScreenProps {
  navigation: any;
}

const BillPaymentsScreen: React.FC<BillPaymentsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [countryCode, setCountryCode] = useState("");
  const [billers, setBillers] = useState<Biller[]>([]);
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null);
  const [customerReference, setCustomerReference] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoadingBillers, setIsLoadingBillers] = useState(false);
  const [isStartingPayment, setIsStartingPayment] = useState(false);
  const [error, setError] = useState("");

  const loadBillers = async () => {
    if (!/^[A-Za-z]{2}$/.test(countryCode)) {
      setError("Enter a valid two-letter country code, such as NG or KE.");
      return;
    }
    setError("");
    setSelectedBiller(null);
    setIsLoadingBillers(true);
    try {
      setBillers(await getBillers(countryCode));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load billers. Check your connection and try again.",
      );
    } finally {
      setIsLoadingBillers(false);
    }
  };

  const continueToPayment = async () => {
    const parsedAmount = Number(amount);
    if (!selectedBiller) {
      setError("Choose a biller before continuing.");
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Enter a valid payment amount.");
      return;
    }
    if (selectedBiller.requiresCustomerReference && !customerReference.trim()) {
      setError("Enter the account or customer reference for this bill.");
      return;
    }

    setError("");
    setIsStartingPayment(true);
    try {
      const checkout = await startBillPayment({
        billerId: selectedBiller.id,
        countryCode: countryCode.toUpperCase(),
        customerReference: customerReference.trim(),
        amount: parsedAmount,
      });
      if (!/^https:\/\//i.test(checkout.checkoutUrl)) {
        throw new Error("The payment provider returned an invalid checkout link.");
      }
      await Linking.openURL(checkout.checkoutUrl);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Payment could not be started. No payment was made.",
      );
    } finally {
      setIsStartingPayment(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header
        title="Bills & payments"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text variant="bodyMedium" style={styles.intro}>
          Find a live biller in your country, then continue to its secure payment
          provider. Availability and supported services depend on the connected provider.
        </Text>

        <TextInput
          label="Country code"
          placeholder="For example, NG"
          value={countryCode}
          onChangeText={(value) => {
            setCountryCode(value.replace(/[^a-z]/gi, "").slice(0, 2).toUpperCase());
            setBillers([]);
            setSelectedBiller(null);
          }}
          autoCapitalize="characters"
          maxLength={2}
          mode="outlined"
          accessibilityLabel="Two-letter country code"
          style={styles.input}
        />
        <Button
          label="Find available billers"
          onPress={loadBillers}
          loading={isLoadingBillers}
          disabled={!/^[A-Z]{2}$/.test(countryCode)}
          fullWidth
          icon="magnify"
        />

        {!!error && (
          <ErrorMessage message={error} visible />
        )}

        {billers.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Available in {countryCode}
            </Text>
            {billers.map((biller) => {
              const isSelected = selectedBiller?.id === biller.id;
              return (
                <PaperButton
                  key={biller.id}
                  mode={isSelected ? "contained-tonal" : "outlined"}
                  onPress={() => {
                    setSelectedBiller(biller);
                    setError("");
                  }}
                  contentStyle={styles.billerButton}
                  accessibilityLabel={`${biller.name}, ${biller.category}, ${biller.currency}`}
                  accessibilityState={{ selected: isSelected }}
                  style={styles.biller}
                >
                  {`${biller.name} · ${biller.category}`}
                </PaperButton>
              );
            })}
          </View>
        )}

        {selectedBiller && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Payment details
            </Text>
            {selectedBiller.requiresCustomerReference && (
              <TextInput
                label="Account or customer reference"
                value={customerReference}
                onChangeText={setCustomerReference}
                autoCapitalize="none"
                mode="outlined"
                style={styles.input}
                accessibilityLabel="Account or customer reference"
              />
            )}
            <TextInput
              label={`Amount (${selectedBiller.currency})`}
              value={amount}
              onChangeText={(value) => setAmount(value.replace(/[^\d.]/g, ""))}
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.input}
              accessibilityLabel={`Payment amount in ${selectedBiller.currency}`}
            />
            <Button
              label="Continue to secure payment"
              onPress={continueToPayment}
              loading={isStartingPayment}
              fullWidth
              icon="lock-outline"
            />
            <Text variant="bodySmall" style={styles.disclaimer}>
              Payment is completed by the provider. Motion will not mark a bill
              as paid until the provider confirms the transaction.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  intro: { color: "#596469", lineHeight: 22, marginBottom: 18 },
  input: { marginBottom: 8, backgroundColor: "transparent" },
  section: { marginTop: 26 },
  sectionTitle: { fontWeight: "700", marginBottom: 12 },
  biller: { marginBottom: 8, borderRadius: 12 },
  billerButton: { minHeight: 48 },
  disclaimer: { color: "#626B70", lineHeight: 19, marginTop: 10 },
});

export default BillPaymentsScreen;
