import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Header, Input, Button, LoadingSpinner, ErrorMessage } from "@components/common";
import Toast from "react-native-toast-message";

// For demo purposes, we'll just show a success toast since the service might need expansion
interface BusinessRegisterScreenProps {
  navigation: any;
}

const BusinessRegisterScreen: React.FC<BusinessRegisterScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [logisticsNeed, setLogisticsNeed] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!businessName || !contactPerson || !email || !phone || !address || !city) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Toast.show({
        type: "success",
        text1: "Registration Submitted",
        text2: "Our business team will contact you shortly.",
      });

      navigation.navigate("HomeMain");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Business Registration" showBack onBack={() => navigation.goBack()} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Scale your logistics operations with Motion
          </Text>

          <ErrorMessage message={error} visible={!!error} />

          <View style={styles.form}>
            <Input label="Business Name *" value={businessName} onChangeText={setBusinessName} placeholder="Your business name" icon="briefcase" />
            <Input label="Contact Person *" value={contactPerson} onChangeText={setContactPerson} placeholder="Name of contact person" icon="account" />
            <Input label="Email Address *" value={email} onChangeText={setEmail} placeholder="business@example.com" keyboardType="email-address" icon="email" />
            <Input label="Phone Number *" value={phone} onChangeText={setPhone} placeholder="+234 800 000 0000" keyboardType="phone-pad" icon="phone" />
            <Input label="Business Address *" value={address} onChangeText={setAddress} placeholder="Street address" icon="map-marker" />
            <Input label="City *" value={city} onChangeText={setCity} placeholder="e.g. Lagos" icon="city" />
            <Input label="Logistics Need Type" value={logisticsNeed} onChangeText={setLogisticsNeed} placeholder="e.g. Staff Transport" icon="truck-delivery" />

            <Button
              label="Register Business"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              size="large"
              style={{ marginTop: 20 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingSpinner visible={isLoading} message="Submitting..." />
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
});

export default BusinessRegisterScreen;
