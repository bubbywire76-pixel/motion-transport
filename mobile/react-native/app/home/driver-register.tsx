import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, useTheme, Checkbox } from "react-native-paper";
import { Header, Input, Button, LoadingSpinner, ErrorMessage } from "@components/common";
import { driverService } from "@services/driver";
import Toast from "react-native-toast-message";

interface DriverRegisterScreenProps {
  navigation: any;
}

const nigerianCities = [
  "Lagos", "Abuja", "Ibadan", "Kano", "Port Harcourt", "Enugu", 
  "Benin City", "Kaduna", "Ilorin", "Abeokuta"
];

const DriverRegisterScreen: React.FC<DriverRegisterScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [homeBaseCity, setHomeBaseCity] = useState("");
  const [interstateAvailability, setInterstateAvailability] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !phone || !vehicleType || !plateNumber || !licenseNumber || !homeBaseCity) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await driverService.registerDriver({
        name,
        email,
        phone,
        vehicleType: vehicleType as any,
        plateNumber,
        licenseNumber,
        yearsExperience: parseInt(yearsExperience) || 0,
        homeBaseCity,
        interstateAvailability,
      });

      Toast.show({
        type: "success",
        text1: "Registration Submitted",
        text2: "Our team will verify your details soon.",
      });

      navigation.navigate("HomeMain");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Driver Registration" showBack onBack={() => navigation.goBack()} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Join Motion's network of professional motorists
          </Text>

          <ErrorMessage message={error} visible={!!error} />

          <View style={styles.form}>
            <Input label="Full Name *" value={name} onChangeText={setName} placeholder="Your full name" icon="account" />
            <Input label="Email Address *" value={email} onChangeText={setEmail} placeholder="your@email.com" keyboardType="email-address" icon="email" />
            <Input label="Phone Number *" value={phone} onChangeText={setPhone} placeholder="+234 800 000 0000" keyboardType="phone-pad" icon="phone" />
            
            <Input label="Vehicle Type (Keke, Car, Bus) *" value={vehicleType} onChangeText={setVehicleType} placeholder="e.g. Car" icon="car" />
            <Input label="Plate Number *" value={plateNumber} onChangeText={setPlateNumber} placeholder="ABC 123 XYZ" icon="card-account-details" />
            <Input label="License Number *" value={licenseNumber} onChangeText={setLicenseNumber} placeholder="DL123456" icon="license" />
            <Input label="Years of Experience *" value={yearsExperience} onChangeText={setYearsExperience} placeholder="e.g. 5" keyboardType="numeric" icon="calendar-clock" />
            <Input label="Home Base City *" value={homeBaseCity} onChangeText={setHomeBaseCity} placeholder="e.g. Lagos" icon="city" />

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={interstateAvailability ? "checked" : "unchecked"}
                onPress={() => setInterstateAvailability(!interstateAvailability)}
                color={theme.colors.primary}
              />
              <Text variant="bodyMedium">Available for interstate trips</Text>
            </View>

            <Button
              label="Register as Driver"
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});

export default DriverRegisterScreen;
