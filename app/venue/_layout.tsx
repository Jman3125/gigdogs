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
        animation: pathname.startsWith("/venue") ? "default" : "none",
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
          headerRight: () => (
            <NavButton imageName="cog" route={"/venue/account"} />
          ),
        }}
      />

      <Stack.Screen
        name="account"
        options={{
          title: "",
          headerTitle: () => <LogoTitle />,
        }}
      />

      <Stack.Screen
        name="credentials-reset-venue"
        options={{
          title: "",
          headerTitle: () => <LogoTitle />,
        }}
      />

      <Stack.Screen
        name="create-offer"
        options={{
          title: "",
          headerTitle: () => <LogoTitle />,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
