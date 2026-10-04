import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme, SegmentedButtons } from "react-native-paper";
import { Header, Input, Button, ErrorMessage } from "@components/common";
import { businessService } from "@services/business";
import Toast from "react-native-toast-message";

const BusinessRegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "Lagos",
    businessType: "corporate",
    fleetSize: "5",
  });

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      await businessService.registerBusiness({
        companyName: form.companyName,
        contactPerson: form.contactPerson,
        email: form.email,
        phoneNumber: form.phoneNumber,
        address: form.address,
        city: form.city,
        businessType: form.businessType as "logistics" | "fleet" | "corporate",
        fleetSize: Number(form.fleetSize) || 0,
      });

      Toast.show({
        type: "success",
        text1: "Business registration submitted",
        text2: "The Motion team will contact your business soon.",
      });
      navigation.goBack();
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Unable to register business.";
      setError(message);
      Toast.show({ type: "error", text1: "Registration failed", text2: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Business Registration" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <ErrorMessage message={error} visible={!!error} />

        <View style={styles.card}>
          <Text variant="headlineSmall" style={{ color: theme.colors.primary, fontWeight: "700", marginBottom: 12 }}>
            Scale your logistics with Motion
          </Text>

          <Input label="Company name" value={form.companyName} onChangeText={(value) => setForm((prev) => ({ ...prev, companyName: value }))} icon="domain" accessibilityLabel="Company name" />
          <Input label="Contact person" value={form.contactPerson} onChangeText={(value) => setForm((prev) => ({ ...prev, contactPerson: value }))} icon="account" accessibilityLabel="Contact person" />
          <Input label="Business email" value={form.email} onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))} keyboardType="email-address" icon="email" accessibilityLabel="Business email" />
          <Input label="Phone number" value={form.phoneNumber} onChangeText={(value) => setForm((prev) => ({ ...prev, phoneNumber: value }))} keyboardType="phone-pad" icon="phone" accessibilityLabel="Phone number" />
          <Input label="Business address" value={form.address} onChangeText={(value) => setForm((prev) => ({ ...prev, address: value }))} icon="map" accessibilityLabel="Business address" />
          <Input label="City" value={form.city} onChangeText={(value) => setForm((prev) => ({ ...prev, city: value }))} icon="city" accessibilityLabel="City" />

          <Text variant="titleSmall" style={{ color: theme.colors.onBackground, marginTop: 12, marginBottom: 8 }}>Business type</Text>
          <SegmentedButtons
            value={form.businessType}
            onValueChange={(value) => setForm((prev) => ({ ...prev, businessType: value }))}
            buttons={[
              { value: "logistics", label: "Logistics" },
              { value: "fleet", label: "Fleet" },
              { value: "corporate", label: "Corporate" },
            ]}
          />

          <Input label="Fleet size" value={form.fleetSize} onChangeText={(value) => setForm((prev) => ({ ...prev, fleetSize: value }))} keyboardType="numeric" icon="truck" accessibilityLabel="Fleet size" />

          <Button label={loading ? "Submitting..." : "Register Business"} onPress={handleSubmit} loading={loading} disabled={loading} fullWidth size="large" />
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

export default BusinessRegisterScreen;
