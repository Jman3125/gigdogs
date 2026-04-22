import Loading from "@/components/loading";
import { useAuthWithRole } from "@/hooks/use-auth-state";
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

  const { role, isSignedIn } = useAuthWithRole();

  const [reload, setReload] = useState(false);

  if (!loaded) {
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
          name="artist"
          options={{
            title: "Account",
            headerShown: false,
            href: isSignedIn && role === "artist" ? undefined : null,
            //This is the actions page for authenticated artists
            tabBarIcon: ({ color }) => (
              <FontAwesome name="send" size={24} color={color} />
            ),
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.placeholder,
            tabBarBadge: 2,
          }}
        />

        <Tabs.Screen
          name="venue"
          options={{
            title: "Account",
            headerShown: false,
            href: isSignedIn && role === "venue" ? undefined : null,

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
            href: !isSignedIn ? undefined : null,

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
