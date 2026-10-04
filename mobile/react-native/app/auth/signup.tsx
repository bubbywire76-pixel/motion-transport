import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useAuth } from "@context/AuthContext";
import { Button, Input, ErrorMessage, LoadingSpinner } from "@components/common";
import Toast from "react-native-toast-message";

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { signup, isLoading, error, clearError } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    clearError();
    if (!validateForm()) return;

    try {
      await signup(email, password, firstName, lastName, phone || undefined);
      Toast.show({
        type: "success",
        text1: "Account created",
        text2: "Welcome to Motion Transport!",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Signup failed",
        text2: err instanceof Error ? err.message : "Please try again",
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text
              variant="displaySmall"
              style={{
                color: theme.colors.primary,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Motion
            </Text>
            <Text
              variant="headlineSmall"
              style={{
                color: theme.colors.onBackground,
                marginBottom: 8,
              }}
            >
              Create Account
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: (theme.colors as any).onBackgroundVariant ?? theme.colors.onSurfaceVariant,
              }}
            >
              Join us to start booking rides
            </Text>
          </View>

          <View style={styles.form}>
            <ErrorMessage message={error || ""} visible={!!error} />

            <Input
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="John"
              error={!!errors.firstName}
              errorMessage={errors.firstName}
              accessibilityLabel="First name input"
              icon="account"
            />

            <Input
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Doe"
              error={!!errors.lastName}
              errorMessage={errors.lastName}
              accessibilityLabel="Last name input"
              icon="account"
            />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              keyboardType="email-address"
              error={!!errors.email}
              errorMessage={errors.email}
              accessibilityLabel="Email address input"
              icon="email"
            />

            <Input
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholder="+234 xxx xxx xxxx"
              keyboardType="phone-pad"
              error={!!errors.phone}
              errorMessage={errors.phone}
              accessibilityLabel="Phone number input"
              icon="phone"
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              error={!!errors.password}
              errorMessage={errors.password}
              accessibilityLabel="Password input"
              icon="lock"
            />

            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              secureTextEntry
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              accessibilityLabel="Confirm password input"
              icon="lock-check"
            />

            <Button
              label="Create Account"
              onPress={handleSignup}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              size="large"
              accessibilityLabel="Create account button"
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text variant="bodySmall">OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Already have an account? Sign in"
            >
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.primary,
                  textAlign: "center",
                  marginVertical: 8,
                }}
              >
                Already have an account?{" "}
                <Text style={{ fontWeight: "bold" }}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingSpinner visible={isLoading} message="Creating account..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 16,
  },
  form: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCCCCC",
  },
});

export default SignupScreen;
