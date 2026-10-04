import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pedometer } from "expo-sensors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button as PaperButton, Text, useTheme } from "react-native-paper";
import { Button, ErrorMessage, Header } from "@components/common";

const ACTIVITY_STORAGE_KEY = "motion_activity_walks_v1";

interface WalkSession {
  id: string;
  startedAt: string;
  durationSeconds: number;
  steps: number;
}

interface ActivityScreenProps {
  navigation: any;
}

function isWalkSession(value: unknown): value is WalkSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<WalkSession>;
  return (
    typeof session.id === "string" &&
    typeof session.startedAt === "string" &&
    typeof session.durationSeconds === "number" &&
    typeof session.steps === "number"
  );
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`;
}

function formatSessionDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
}

const ActivityScreen: React.FC<ActivityScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const subscription = useRef<{ remove: () => void } | null>(null);
  const startTime = useRef<number | null>(null);
  const [history, setHistory] = useState<WalkSession[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [steps, setSteps] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(ACTIVITY_STORAGE_KEY)
      .then((stored) => {
        if (!stored) return;
        const parsed: unknown = JSON.parse(stored);
        if (!Array.isArray(parsed) || !parsed.every(isWalkSession)) {
          throw new Error("Saved activity history has an unsupported format.");
        }
        if (isMounted) setHistory(parsed);
      })
      .catch((loadError: unknown) => {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load saved activity history.",
          );
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingHistory(false);
      });

    Pedometer.isAvailableAsync()
      .then((available) => {
        if (isMounted) setIsAvailable(available);
      })
      .catch(() => {
        if (isMounted) setIsAvailable(false);
      });

    return () => {
      isMounted = false;
      subscription.current?.remove();
      subscription.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isTracking || startTime.current === null) return;
    const intervalId = setInterval(() => {
      if (startTime.current !== null) {
        setElapsedSeconds(Math.floor((Date.now() - startTime.current) / 1000));
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isTracking]);

  const startWalk = async () => {
    setError("");
    try {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);
      if (!available) {
        setError("This device does not provide a step counter.");
        return;
      }

      let permission = await Pedometer.getPermissionsAsync();
      if (permission.status !== "granted") {
        permission = await Pedometer.requestPermissionsAsync();
      }
      if (permission.status !== "granted") {
        setError("Motion access is needed to count steps. You can enable it in device settings.");
        return;
      }

      startTime.current = Date.now();
      setSteps(0);
      setElapsedSeconds(0);
      subscription.current = Pedometer.watchStepCount((result) => {
        setSteps(result.steps);
      });
      setIsTracking(true);
    } catch (trackingError) {
      startTime.current = null;
      subscription.current?.remove();
      subscription.current = null;
      setError(
        trackingError instanceof Error
          ? trackingError.message
          : "Step tracking could not start. Check motion permission and try again.",
      );
    }
  };

  const finishWalk = async () => {
    if (startTime.current === null) return;
    const now = Date.now();
    const session: WalkSession = {
      id: `${now}`,
      startedAt: new Date(startTime.current).toISOString(),
      durationSeconds: Math.max(1, Math.floor((now - startTime.current) / 1000)),
      steps,
    };
    const nextHistory = [session, ...history];

    setError("");
    try {
      await AsyncStorage.setItem(
        ACTIVITY_STORAGE_KEY,
        JSON.stringify(nextHistory),
      );
      setHistory(nextHistory);
      subscription.current?.remove();
      subscription.current = null;
      startTime.current = null;
      setIsTracking(false);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? `Walk not saved: ${saveError.message}`
          : "Walk could not be saved. Keep tracking and try again.",
      );
    }
  };

  const today = new Date();
  const todaySessions = history.filter((session) => {
    const date = new Date(session.startedAt);
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  });
  const savedStepsToday = todaySessions.reduce(
    (total, session) => total + session.steps,
    0,
  );
  const totalStepsToday = savedStepsToday + (isTracking ? steps : 0);
  const savedMinutesToday = todaySessions.reduce(
    (total, session) => total + Math.floor(session.durationSeconds / 60),
    0,
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header
        title="Daily activity"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.today, { backgroundColor: theme.colors.primary }]}>
          <View style={styles.todayHeading}>
            <MaterialCommunityIcons
              name="shoe-print"
              size={23}
              color="#FFFFFF"
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
            <Text variant="titleMedium" style={styles.todayLabel}>
              Tracked walks today
            </Text>
          </View>
          <Text
            variant="displaySmall"
            style={styles.steps}
            accessibilityLabel={`${totalStepsToday} steps in tracked walks today`}
            accessibilityLiveRegion="polite"
          >
            {totalStepsToday.toLocaleString()}
          </Text>
          <Text variant="bodyMedium" style={styles.todayFootnote}>
            steps · {savedMinutesToday + (isTracking ? Math.floor(elapsedSeconds / 60) : 0)} minutes
          </Text>
        </View>

        {isAvailable === false && (
          <Text variant="bodyMedium" style={styles.info}>
            Step counting is not available on this device. Your saved walk
            history is still available here.
          </Text>
        )}

        {!!error && <ErrorMessage message={error} visible />}

        {isTracking ? (
          <View
            style={[
              styles.session,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <View style={styles.liveRow}>
              <View style={styles.liveDot} />
              <Text variant="titleMedium" style={styles.sessionTitle}>
                Walk in progress
              </Text>
            </View>
            <Text variant="headlineMedium" style={styles.sessionStats}>
              {steps.toLocaleString()} steps
            </Text>
            <Text variant="bodyMedium" style={styles.info}>
              {formatDuration(elapsedSeconds)} tracked
            </Text>
            <Button
              label="Finish walk"
              onPress={finishWalk}
              fullWidth
              variant="secondary"
              icon="stop"
            />
          </View>
        ) : (
          <Button
            label="Start a walk"
            onPress={startWalk}
            disabled={isAvailable === false || isLoadingHistory}
            fullWidth
            icon="walk"
          />
        )}

        <Text variant="titleLarge" style={styles.sectionTitle}>
          Recent walks
        </Text>
        {isLoadingHistory ? (
          <Text variant="bodyMedium" style={styles.info}>
            Loading activity history…
          </Text>
        ) : history.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="shoe-print"
              size={28}
              color={theme.colors.primary}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
            <Text variant="titleMedium" style={styles.emptyTitle}>
              Your walks will show up here
            </Text>
            <Text variant="bodyMedium" style={styles.info}>
              Start a walk to count steps with this device and keep a record
              on your phone.
            </Text>
          </View>
        ) : (
          <View style={styles.history}>
            {history.slice(0, 10).map((session) => (
              <View
                key={session.id}
                style={[
                  styles.historyRow,
                  { backgroundColor: theme.colors.surface },
                ]}
              >
                <View style={styles.historyIcon}>
                  <MaterialCommunityIcons
                    name="walk"
                    size={21}
                    color={theme.colors.primary}
                    accessibilityElementsHidden
                    importantForAccessibility="no"
                  />
                </View>
                <View style={styles.historyText}>
                  <Text variant="titleSmall" style={styles.sessionTitle}>
                    {session.steps.toLocaleString()} steps ·{" "}
                    {formatDuration(session.durationSeconds)}
                  </Text>
                  <Text variant="bodySmall" style={styles.info}>
                    {formatSessionDate(session.startedAt)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
        <Text variant="bodySmall" style={styles.privacy}>
          Walk history is stored on this device. Steps are counted only while
          a walk is active.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  today: { borderRadius: 20, padding: 22, marginBottom: 16 },
  todayHeading: { flexDirection: "row", alignItems: "center", gap: 9 },
  todayLabel: { color: "#FFFFFF", fontWeight: "600" },
  steps: { color: "#FFFFFF", fontWeight: "700", marginTop: 12 },
  todayFootnote: { color: "#E5FFFF", marginTop: 2 },
  session: { borderRadius: 16, padding: 18, marginTop: 18, marginBottom: 20 },
  liveRow: { flexDirection: "row", alignItems: "center", gap: 9 },
  liveDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: "#D47425" },
  sessionTitle: { fontWeight: "600" },
  sessionStats: { fontWeight: "700", marginTop: 15 },
  info: { color: "#596469", lineHeight: 21 },
  sectionTitle: { fontWeight: "700", marginTop: 28, marginBottom: 12 },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "flex-start",
    gap: 8,
  },
  emptyTitle: { fontWeight: "600" },
  history: { gap: 8 },
  historyRow: {
    borderRadius: 14,
    minHeight: 70,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  historyIcon: {
    height: 40,
    width: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E7F3F4",
  },
  historyText: { flex: 1, gap: 3 },
  privacy: { color: "#626B70", lineHeight: 19, marginTop: 18 },
});

export default ActivityScreen;
