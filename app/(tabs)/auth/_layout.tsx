// app/(tabs)/tab_1/_layout.tsx
import LogoTitle from "@/components/logo-title";
import NavButton from "@/components/nav-button";
import { colors } from "@/utilities/colors";
import { Stack, usePathname } from "expo-router";

const StackLayout = () => {
  const pathname = usePathname();
  return (
    <Stack
      screenOptions={{
        animation: pathname.startsWith("/auth") ? "default" : "none",
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerTitle: () => <LogoTitle />,
        }}
      />

      <Stack.Screen
        name="(artist)/artist-login"
        options={{
          title: "",
          headerTitle: () => <LogoTitle />,
        }}
      />
      <Stack.Screen
        name="(artist)/artist-signup"
        options={{
          title: "",
          headerTitle: () => <LogoTitle />,
          headerRight: () => (
            <NavButton
              text="Login"
              route="/(tabs)/auth/(artist)/artist-login"
            />
          ),
        }}
      />
      <Stack.Screen
        name="(venue)/venue-login"
        options={{
          title: "",
          headerTitle: () => <LogoTitle />,
        }}
      />
      <Stack.Screen
        name="(venue)/venue-signup"
        options={{
          title: "",
          headerTitle: () => <LogoTitle />,
          headerRight: () => (
            <NavButton text="Login" route="/(tabs)/auth/(venue)/venue-login" />
          ),
        }}
      />
    </Stack>
  );
};

export default StackLayout;
