import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { useAuth } from "@context/AuthContext";
import { lightTheme, darkTheme } from "@theme/theme";
import { LoadingSpinner } from "@components/common";

// Auth Stack Screens
import LoginScreen from "./auth/login";
import SignupScreen from "./auth/signup";

// Tab Screens
import HomeScreen from "./home/index";
import ProfileScreen from "./home/profile";
import RideHistoryScreen from "./home/ride-history";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          animationTypeForReplace: "pop",
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          animationTypeForReplace: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          title: "Motion Transport",
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";
          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "Rides") {
            iconName = "history";
          } else if (route.name === "Profile") {
            iconName = "account";
          }
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
              accessible={true}
              accessibilityLabel={route.name}
            />
          );
        },
        tabBarActiveTintColor: "#008B8B",
        tabBarInactiveTintColor: "#999",
        tabBarAccessibilityLabel: `${route.name} tab`,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Home",
        }}
      />
      <Tab.Screen
        name="Rides"
        component={RideHistoryScreen}
        options={{
          title: "Rides",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  const { isLoading, isSignedIn } = useAuth();
  const isDark = false; // Can be toggled based on device settings
  const theme = isDark ? darkTheme : lightTheme;

  if (isLoading) {
    return (
      <PaperProvider theme={theme}>
        <LoadingSpinner visible={true} message="Initializing app..." />
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {isSignedIn ? (
          <TabNavigator />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
      <StatusBar style="auto" />
      <Toast />
    </PaperProvider>
  );
}
