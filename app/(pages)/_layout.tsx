import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function StackLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="account" />
        <Stack.Screen name="band" />
        <Stack.Screen name="(authenticate)/signup" />
        <Stack.Screen name="(authenticate)/login" />
        <Stack.Screen name="(other)/info" />
        <Stack.Screen name="(other)/terms" />
      </Stack>
    </SafeAreaProvider>
  );
}
