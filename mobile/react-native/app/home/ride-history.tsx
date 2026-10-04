import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import { Text, useTheme, ActivityIndicator, Chip } from "react-native-paper";
import { Header, Card, ErrorMessage } from "@components/common";
import Toast from "react-native-toast-message";

interface RideHistoryScreenProps {
  navigation: any;
}

interface Ride {
  id: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  fare: number;
  status: "completed" | "cancelled" | "pending";
  driver?: string;
  rating?: number;
}

const RideHistoryScreen: React.FC<RideHistoryScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Mock data for demonstration
  const [rides] = useState<Ride[]>([
    // Empty state - no rides yet
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      Toast.show({
        type: "success",
        text1: "Refreshed",
        text2: "Ride history updated",
      });
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return (theme.colors as any).success ?? "#4CAF50";
      case "cancelled":
        return theme.colors.error;
      case "pending":
        return (theme.colors as any).warning ?? "#FFC107";
      default:
        return (theme.colors as any).onBackgroundVariant ?? theme.colors.onSurfaceVariant;
    }
  };

  const renderRideItem = ({ item }: { item: Ride }) => (
    <Card
      key={item.id}
      title={`${item.pickup} → ${item.dropoff}`}
      subtitle={`${item.date} at ${item.time}`}
      onPress={() => {
        Toast.show({
          type: "info",
          text1: "Ride Details",
          text2: "Ride details view coming soon",
        });
      }}
    >
      <View style={styles.rideContent}>
        <View style={styles.rideInfo}>
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.onBackground,
              fontWeight: "600",
            }}
          >
            ₦{item.fare.toFixed(2)}
          </Text>
          {item.driver && (
            <Text
              variant="bodySmall"
              style={{
                color: (theme.colors as any).onBackgroundVariant ?? theme.colors.onSurfaceVariant,
                marginTop: 4,
              }}
            >
              Driver: {item.driver}
            </Text>
          )}
        </View>
        <View style={styles.rideStatus}>
          <Chip
            onPress={() => undefined}
            style={{
              backgroundColor: getStatusColor(item.status),
            }}
            textStyle={{
              color:
                item.status === "completed"
                  ? "#fff"
                  : item.status === "cancelled"
                  ? "#fff"
                  : "#000",
            }}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Chip>
          {item.rating && (
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.primary,
                marginTop: 8,
                fontWeight: "600",
              }}
            >
              ★ {item.rating}/5
            </Text>
          )}
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title="Ride History" />

      <View style={styles.content}>
        <ErrorMessage message={error} visible={!!error} />

        {isLoading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator
              animating={true}
              size="large"
              color={theme.colors.primary}
            />
          </View>
        ) : rides.length === 0 ? (
          <View style={styles.emptyState}>
            <Text
              variant="headlineSmall"
              style={{
                color: theme.colors.onBackground,
                marginBottom: 8,
                fontWeight: "bold",
              }}
            >
              No Rides Yet
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: (theme.colors as any).onBackgroundVariant ?? theme.colors.onSurfaceVariant,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Your ride history will appear here once you book your first ride.
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: (theme.colors as any).onBackgroundVariant ?? theme.colors.onSurfaceVariant,
                textAlign: "center",
              }}
            >
              Ready to get started? Book a ride now!
            </Text>
          </View>
        ) : (
          <FlatList
            data={rides}
            renderItem={renderRideItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            scrollEnabled={true}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[theme.colors.primary]}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rideContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rideInfo: {
    flex: 1,
  },
  rideStatus: {
    alignItems: "flex-end",
  },
});

export default RideHistoryScreen;
