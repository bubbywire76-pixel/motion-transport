import React from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "@context/AuthContext";
import { lightTheme, darkTheme } from "@theme/theme";
import { LoadingSpinner } from "@components/common";

// Auth Stack Screens
import LoginScreen from "./auth/login";
import SignupScreen from "./auth/signup";

// Tab Screens
import HomeScreen from "./home/index";
import ProfileScreen from "./home/profile";
import RideHistoryScreen from "./home/ride-history";

// Feature Screens
import BookRideScreen from "./book-ride";
import FareEstimateScreen from "./fare-estimate";
import DriverRegisterScreen from "./driver-register";
import BusinessRegisterScreen from "./business-register";
import AboutScreen from "./about";
import ContactScreen from "./contact";

const Stack = createStackNavigator();
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
      <Stack.Screen name="BookRide" component={BookRideScreen} />
      <Stack.Screen name="FareEstimate" component={FareEstimateScreen} />
      <Stack.Screen name="DriverRegister" component={DriverRegisterScreen} />
      <Stack.Screen name="BusinessRegister" component={BusinessRegisterScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: any = "home";
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

function AppShell() {
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

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
