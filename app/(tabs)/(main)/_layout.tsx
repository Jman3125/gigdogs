// app/(tabs)/tab_1/_layout.tsx
import LogoTitle from "@/components/logo-title";
import NavButton from "@/components/nav-button";
import { colors } from "@/utilities/colors";
import { Stack } from "expo-router";

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
          title: "",
          headerTitle: () => <LogoTitle />,
          headerRight: () => (
            <NavButton imageName="info-circle" route="/about" />
          ),
        }}
      />

      <Stack.Screen
        name="about"
        options={{
          headerTitle: () => <LogoTitle />,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
