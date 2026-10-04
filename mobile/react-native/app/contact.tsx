import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Header, Card, Button } from "@components/common";
import Toast from "react-native-toast-message";

const ContactScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const theme = useTheme();

  const handleSupportPress = () => {
    Toast.show({ type: "info", text1: "Support", text2: "Dispatch team available 24/7" });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="Contact" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card title="Dispatch line" accent>
          <Text style={{ fontSize: 18, color: theme.colors.primary, fontWeight: "700" }}>+234 800 MOTION</Text>
        </Card>

        <Card title="WhatsApp" accent>
          <Text style={{ fontSize: 18, color: theme.colors.primary, fontWeight: "700" }}>+234 800 668466</Text>
        </Card>

        <Card title="Email" accent>
          <Text style={{ fontSize: 16, color: theme.colors.onSurfaceVariant }}>dispatch@motionapp.ng</Text>
        </Card>

        <Button label="Contact support" onPress={handleSupportPress} variant="secondary" fullWidth size="large" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexGrow: 1, padding: 16 },
});

export default ContactScreen;
