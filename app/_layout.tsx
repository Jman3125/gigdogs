import { colors } from "@/utilities/colors";
import {
  Ubuntu_300Light,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
  useFonts,
} from "@expo-google-fonts/ubuntu";

import { ReloadFeedContext } from "@/context/reload-feed";
import { DynaPuff_500Medium } from "@expo-google-fonts/dynapuff";
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    DynaPuff_500Medium,
  });
  const [reload, setReload] = useState(false);
  return (
    <ReloadFeedContext.Provider value={{ reload, setReload }}>
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
    </ReloadFeedContext.Provider>
  );
}
