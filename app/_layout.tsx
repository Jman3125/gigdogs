import Loading from "@/components/loading";
import { DynaPuff_500Medium } from "@expo-google-fonts/dynapuff";
import {
  Ubuntu_300Light,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
  useFonts,
} from "@expo-google-fonts/ubuntu";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    DynaPuff_500Medium,
  });

  if (!loaded) {
    return <Loading />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ title: "" }} />
    </Stack>
  );
}
