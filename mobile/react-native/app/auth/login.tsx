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

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    clearError();
    if (!validateForm()) return;

    try {
      await login(email, password);
      Toast.show({
        type: "success",
        text1: "Login successful",
        text2: "Welcome back!",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Login failed",
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
              Welcome Back
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: (theme.colors as any).onBackgroundVariant ?? theme.colors.onSurfaceVariant,
              }}
            >
              Sign in to continue booking rides
            </Text>
          </View>

          <View style={styles.form}>
            <ErrorMessage message={error || ""} visible={!!error} />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              keyboardType="email-address"
              error={!!emailError}
              errorMessage={emailError}
              accessibilityLabel="Email address input"
              icon="email"
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              error={!!passwordError}
              errorMessage={passwordError}
              accessibilityLabel="Password input"
              icon="lock"
            />

            <Button
              label="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              fullWidth
              size="large"
              accessibilityLabel="Sign in button"
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text variant="bodySmall">OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Don't have an account? Sign up"
            >
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.primary,
                  textAlign: "center",
                  marginVertical: 8,
                }}
              >
                Don't have an account?{" "}
                <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingSpinner visible={isLoading} message="Logging in..." />
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
    paddingVertical: 24,
  },
  header: {
    marginBottom: 32,
    marginTop: 32,
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

export default LoginScreen;
