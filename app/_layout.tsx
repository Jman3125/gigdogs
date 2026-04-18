import Loading from "@/components/loading";
import { useAuthState } from "@/hooks/use-auth-state";
import {
  Ubuntu_300Light,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
  useFonts,
} from "@expo-google-fonts/ubuntu";
import { FontAwesome } from "@expo/vector-icons";

import { colors } from "@/utilities/colors";
import { DynaPuff_500Medium } from "@expo-google-fonts/dynapuff";
import { Tabs } from "expo-router";

import { ReloadFeedContext } from "@/context/reload-feed";
import { useState } from "react";

const TabsLayout = () => {
  const [loaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    DynaPuff_500Medium,
  });

  const { isSignedIn, loading } = useAuthState();

  const [reload, setReload] = useState(false);

  if (!loaded || loading) {
    return <Loading />;
  }
  return (
    <ReloadFeedContext.Provider value={{ reload, setReload }}>
      <Tabs>
        <Tabs.Screen
          name="(main)"
          options={{
            title: "Feed",
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.primary,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color} />
            ),
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.placeholder,
          }}
        />
        <Tabs.Screen
          name="actions"
          options={{
            title: "Offers",
            headerShown: false,
            href: isSignedIn ? "/actions" : null,
            tabBarIcon: ({ color }) => (
              <FontAwesome name="send" size={24} color={color} />
            ),
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.placeholder,
            tabBarBadge: 2,
          }}
        />
        <Tabs.Screen
          name="auth"
          options={{
            title: "Account",
            headerShown: false,
            href: isSignedIn ? null : "/auth",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="plus" size={24} color={color} />
            ),
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.placeholder,
          }}
        />
      </Tabs>
    </ReloadFeedContext.Provider>
  );
};

export default TabsLayout;
