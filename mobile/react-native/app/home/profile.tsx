import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Text, useTheme, Avatar, Divider } from "react-native-paper";
import { useAuth } from "@context/AuthContext";
import { Header, Card, Button, ErrorMessage } from "@components/common";
import Toast from "react-native-toast-message";

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      Toast.show({
        type: "success",
        text1: "Logged out successfully",
        text2: "See you soon!",
      });
    } catch (err) {
      setError("Failed to logout. Please try again.");
    }
  };

  const profileMenuItems = [
    {
      label: "Edit Profile",
      icon: "account-edit",
      onPress: () => {
        Toast.show({
          type: "info",
          text1: "Coming soon",
          text2: "Edit profile feature will be available soon",
        });
      },
    },
    {
      label: "Payment Methods",
      icon: "credit-card",
      onPress: () => {
        Toast.show({
          type: "info",
          text1: "Coming soon",
          text2: "Payment methods feature will be available soon",
        });
      },
    },
    {
      label: "Settings",
      icon: "cog",
      onPress: () => {
        Toast.show({
          type: "info",
          text1: "Coming soon",
          text2: "Settings feature will be available soon",
        });
      },
    },
    {
      label: "Help & Support",
      icon: "help-circle",
      onPress: () => {
        Toast.show({
          type: "info",
          text1: "Coming soon",
          text2: "Help & Support feature will be available soon",
        });
      },
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title="Profile" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ErrorMessage message={error} visible={!!error} />

        {/* Profile Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.outline,
            },
          ]}
        >
          <View style={styles.profileHeader}>
            <Avatar.Text
              size={80}
              label={`${user?.firstName[0] || ""}${user?.lastName[0] || ""}`}
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={styles.profileInfo}>
              <Text
                variant="titleLarge"
                style={{
                  color: theme.colors.onBackground,
                  fontWeight: "bold",
                }}
              >
                {user?.firstName} {user?.lastName}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.onBackgroundVariant,
                }}
              >
                {user?.email}
              </Text>
              {user?.phone && (
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onBackgroundVariant,
                  }}
                >
                  {user.phone}
                </Text>
              )}
            </View>
          </View>

          <Divider style={{ marginVertical: 12 }} />

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text
                variant="headlineSmall"
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                0
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onBackgroundVariant,
                  textAlign: "center",
                }}
              >
                Rides
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text
                variant="headlineSmall"
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                4.8
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onBackgroundVariant,
                  textAlign: "center",
                }}
              >
                Rating
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text
                variant="headlineSmall"
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                N0.00
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  color: theme.colors.onBackgroundVariant,
                  textAlign: "center",
                }}
              >
                Spent
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.onBackground,
              marginBottom: 12,
              fontWeight: "bold",
              paddingHorizontal: 16,
            }}
          >
            Account
          </Text>

          {profileMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View
                style={[
                  styles.menuItem,
                  {
                    backgroundColor: theme.colors.surface,
                    borderBottomColor: theme.colors.outline,
                  },
                ]}
              >
                <Text
                  variant="bodyMedium"
                  style={{
                    color: theme.colors.onBackground,
                    flex: 1,
                  }}
                >
                  {item.label}
                </Text>
                <Text style={{ color: theme.colors.outline }}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            label="Logout"
            onPress={handleLogout}
            variant="outline"
            fullWidth
            accessibilityLabel="Logout button"
          />
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
    paddingVertical: 16,
  },
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  statBox: {
    flex: 1,
    paddingHorizontal: 8,
  },
  menuSection: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 0,
    borderBottomWidth: 1,
  },
  logoutSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});

export default ProfileScreen;
