import { colors } from "@/utilities/colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Stack.Screen name="(main)/index" />

      <Stack.Screen name="(main)/band-view" />

      <Stack.Screen name="(account)/account-info" />

      <Stack.Screen name="(account)/signup" />
      <Stack.Screen name="(account)/login" />
      <Stack.Screen name="(more)/about" />
    </Stack>
  );
}
