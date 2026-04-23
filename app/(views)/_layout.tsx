// app/(tabs)/tab_1/_layout.tsx
import LogoTitle from "@/components/logo-title";
import NavButton from "@/components/nav-button";
import { colors } from "@/utilities/colors";
import { Stack, useRouter } from "expo-router";

const ViewsLayout = () => {
  const navigator = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTitle: () => <LogoTitle />,
      }}
    >
      <Stack.Screen
        name="artist-view"
        options={{
          title: "",
        }}
      />

      <Stack.Screen
        name="offer-view"
        options={{
          title: "",
          //If the previous path is to the tabs layout, provide a back button
          headerLeft: () => {
            if (navigator.canGoBack()) {
              return <NavButton isBackButton={true} />;
            }
          },
        }}
      />

      <Stack.Screen
        name="venue-view"
        options={{
          title: "",
          //If the previous path is to the tabs layout, provide a back button
          headerLeft: () => {
            if (navigator.canGoBack()) {
              return <NavButton isBackButton={true} />;
            }
          },
        }}
      />

      <Stack.Screen
        name="terms"
        options={{
          title: "",
          //If the previous path is to the tabs layout, provide a back button
          headerLeft: () => {
            if (navigator.canGoBack()) {
              return <NavButton isBackButton={true} />;
            }
          },
        }}
      />

      <Stack.Screen
        name="privacy"
        options={{
          title: "",
          //If the previous path is to the tabs layout, provide a back button
          headerLeft: () => {
            if (navigator.canGoBack()) {
              return <NavButton isBackButton={true} />;
            }
          },
        }}
      />
    </Stack>
  );
};

export default ViewsLayout;
