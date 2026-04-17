// app/(tabs)/tab_1/_layout.tsx
import LogoTitle from "@/components/logo-title";
import NavButton from "@/components/nav-button";
import { colors } from "@/utilities/colors";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <LogoTitle />,
          headerRight: () => <NavButton imageName="info" route={"/about"} />,
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          headerTitle: () => <LogoTitle />,
          headerLeft: () => <NavButton imageName="backward" text="Back" />,
        }}
      />
      <Stack.Screen
        name="artist-view"
        options={{
          headerTitle: () => <LogoTitle />,
          headerLeft: () => <NavButton imageName="backward" text="Back" />,
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          headerTitle: () => <LogoTitle />,
          headerLeft: () => <NavButton imageName="backward" text="Back" />,
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          headerTitle: () => <LogoTitle />,
          headerLeft: () => <NavButton imageName="backward" text="Back" />,
        }}
      />

      <Stack.Screen
        name="venue-view"
        options={{
          headerTitle: () => <LogoTitle />,
          headerLeft: () => <NavButton imageName="backward" text="Back" />,
        }}
      />

      <Stack.Screen
        name="offer-view"
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
