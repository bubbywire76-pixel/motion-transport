import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme, SegmentedButtons } from "react-native-paper";
import { Header, Input, Button, ErrorMessage } from "@components/common";
import { driverService } from "@services/driver";
import Toast from "react-native-toast-message";

const DriverRegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleType: "Car",
    plateNumber: "",
    licenseNumber: "",
    yearsExperience: "3",
    homeBaseCity: "Lagos",
    interstateAvailability: true,
  });

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      await driverService.registerDriver({
        userId: "guest-driver",
        licenseNumber: form.licenseNumber,
        licenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        insuranceNumber: `INS-${Date.now()}`,
        insuranceExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        bankAccountNumber: "0001234567",
        bankCode: "058",
        bankAccountName: form.fullName,
      });

      Toast.show({
        type: "success",
        text1: "Driver registration submitted",
        text2: "A Motion team member will verify your profile.",
      });
      navigation.goBack();
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Unable to submit registration.";
      setError(message);
      Toast.show({ type: "error", text1: "Registration failed", text2: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Driver Registration" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <ErrorMessage message={error} visible={!!error} />

        <View style={styles.card}>
          <Text variant="headlineSmall" style={{ color: theme.colors.primary, fontWeight: "700", marginBottom: 12 }}>
            Join the Motion driver network
          </Text>

          <Input label="Full name" value={form.fullName} onChangeText={(value) => setForm((prev) => ({ ...prev, fullName: value }))} icon="account" accessibilityLabel="Full name" />
          <Input label="Email" value={form.email} onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))} keyboardType="email-address" icon="email" accessibilityLabel="Email" />
          <Input label="Phone" value={form.phone} onChangeText={(value) => setForm((prev) => ({ ...prev, phone: value }))} keyboardType="phone-pad" icon="phone" accessibilityLabel="Phone number" />

          <Text variant="titleSmall" style={{ color: theme.colors.onBackground, marginTop: 12, marginBottom: 8 }}>Vehicle type</Text>
          <SegmentedButtons
            value={form.vehicleType}
            onValueChange={(value) => setForm((prev) => ({ ...prev, vehicleType: value }))}
            buttons={[
              { value: "Keke", label: "Keke" },
              { value: "Car", label: "Car" },
              { value: "Bus", label: "Bus" },
            ]}
          />

          <Input label="Plate number" value={form.plateNumber} onChangeText={(value) => setForm((prev) => ({ ...prev, plateNumber: value }))} icon="car" accessibilityLabel="Plate number" />
          <Input label="License number" value={form.licenseNumber} onChangeText={(value) => setForm((prev) => ({ ...prev, licenseNumber: value }))} icon="card-account-details" accessibilityLabel="License number" />
          <Input label="Years of experience" value={form.yearsExperience} onChangeText={(value) => setForm((prev) => ({ ...prev, yearsExperience: value }))} keyboardType="numeric" icon="briefcase" accessibilityLabel="Years of experience" />
          <Input label="Home base city" value={form.homeBaseCity} onChangeText={(value) => setForm((prev) => ({ ...prev, homeBaseCity: value }))} icon="map-marker" accessibilityLabel="Home base city" />

          <Button label={loading ? "Submitting..." : "Register as Driver"} onPress={handleSubmit} loading={loading} disabled={loading} fullWidth size="large" />
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

export default DriverRegisterScreen;
