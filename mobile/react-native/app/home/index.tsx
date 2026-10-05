import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Text, useTheme, Divider } from "react-native-paper";
import { useAuth } from "@context/AuthContext";
import { Header, Card, Button, LoadingSpinner, ErrorMessage } from "@components/common";
import Toast from "react-native-toast-message";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const quickActions = [
    {
      title: "Book a Ride",
      description: "Travel safely across Nigeria",
      icon: "🚕",
      onPress: () => {
        navigation.navigate("BookRide");
      },
    },
    {
      title: "Fare Estimate",
      description: "Transparent pricing",
      icon: "💰",
      onPress: () => {
        navigation.navigate("FareEstimate", { pickup: "", destination: "", rideType: "economy" });
      },
    },
    {
      title: "Driver Registration",
      description: "Join our driver network",
      icon: "👨‍💼",
      onPress: () => {
        navigation.navigate("DriverRegister");
      },
    },
    {
      title: "Business Solutions",
      description: "Fleet & logistics",
      icon: "🏢",
      onPress: () => {
        navigation.navigate("BusinessRegister");
      },
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      Toast.show({
        type: "success",
        text1: "Logged out",
        text2: "See you soon!",
      });
    } catch (err) {
      setError("Failed to logout. Please try again.");
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      Toast.show({
        type: "success",
        text1: "Refreshed",
        text2: "Home screen updated",
      });
    }, 1000);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header
        title="Motion Transport"
        subtitle={`Welcome, ${user?.firstName}!`}
        rightAction={{
          icon: "logout",
          label: "Logout",
          onPress: handleLogout,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        <ErrorMessage message={error} visible={!!error} />

        {/* Hero Section */}
        <View
          style={[
            styles.heroSection,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text
            variant="headlineMedium"
            style={{
              color: theme.colors.onPrimary,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Book Your Ride, Move With Ease
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.onPrimary,
              marginBottom: 16,
            }}
          >
            Nigeria's premium ride-hailing and logistics platform
          </Text>
          <Button
            label="Get Started"
            onPress={() => {
              Toast.show({
                type: "info",
                text1: "Let's go!",
                text2: "Select an option below to get started",
              });
            }}
            variant="secondary"
            size="medium"
            fullWidth
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text
            variant="titleLarge"
            style={{
              color: theme.colors.onBackground,
              marginBottom: 12,
              fontWeight: "bold",
            }}
          >
            What Can We Help You With?
          </Text>

          {quickActions.map((action, index) => (
            <Card
              key={index}
              title={action.title}
              subtitle={action.description}
              icon={action.icon}
              accent={index % 2 === 0}
              onPress={action.onPress}
            />
          ))}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.onBackground,
              marginBottom: 8,
              fontWeight: "bold",
            }}
          >
            About Motion
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.onBackgroundVariant,
              marginBottom: 12,
            }}
          >
            Motion is Nigeria's premium ride-hailing and logistics platform,
            connecting riders and drivers across the country with safe, reliable,
            and affordable transportation solutions.
          </Text>

          <Divider style={{ marginVertical: 12 }} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text
                variant="headlineSmall"
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                }}
              >
                1000+
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onBackgroundVariant,
                }}
              >
                Active Drivers
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                variant="headlineSmall"
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                }}
              >
                5000+
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onBackgroundVariant,
                }}
              >
                Happy Customers
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text
                variant="headlineSmall"
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                }}
              >
                24/7
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onBackgroundVariant,
                }}
              >
                Customer Support
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  actionsSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 32,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
});

export default HomeScreen;
