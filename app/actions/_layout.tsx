// app/(tabs)/tab_1/_layout.tsx
import LogoTitle from "@/components/logo-title";
import NavButton from "@/components/nav-button";
import { colors } from "@/utilities/colors";
import { Stack, usePathname } from "expo-router";
import { StyleSheet } from "react-native";

const StackLayout = () => {
  const pathname = usePathname();
  return (
    <Stack
      screenOptions={{
        animation: pathname.startsWith("/actions") ? "default" : "none",
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <LogoTitle />,
          headerRight: () => (
            <NavButton imageName="cog" route={"/actions/account"} />
          ),
        }}
      />

      <Stack.Screen
        name="account"
        options={{
          headerTitle: () => <LogoTitle />,
          headerLeft: () => <NavButton imageName="backward" text="Back" />,
        }}
      />

      <Stack.Screen
        name="credentials-reset"
        options={{
          headerTitle: () => <LogoTitle />,
          headerLeft: () => <NavButton imageName="backward" text="Back" />,
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
  },
});

export default StackLayout;
