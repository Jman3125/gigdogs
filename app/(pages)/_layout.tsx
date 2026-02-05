import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="account" />
        <Stack.Screen name="band" />
        <Stack.Screen name="(authenticate)/login" />
        <Stack.Screen name="(authenticate)/signup" />
        <Stack.Screen name="(about)/info" />
        <Stack.Screen name="(about)/terms" />
      </Stack>
    </SafeAreaProvider>
  );
}
