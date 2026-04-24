import { useAuthWithRole } from "@/hooks/use-auth-state";
import { FontAwesome } from "@expo/vector-icons";

import Loading from "@/components/loading";
import { ReloadFeedContext } from "@/context/reload-feed";
import { colors } from "@/utilities/colors";
import { Tabs } from "expo-router";
import { useState } from "react";

const TabsLayout = () => {
  const { role, isSignedIn } = useAuthWithRole();

  const [reload, setReload] = useState(false);
  if (reload) {
    return <Loading />;
  }
  return (
    <ReloadFeedContext.Provider value={{ reload, setReload }}>
      <Tabs>
        <Tabs.Screen
          name="(main)"
          options={{
            title: "Find",
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.primary,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" size={24} color={color} />
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
            popToTopOnBlur: true,
            href: isSignedIn && role === "artist" ? undefined : null,
            //This is the actions page for authenticated artists
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.placeholder,
          }}
        />

        <Tabs.Screen
          name="venue"
          options={{
            title: "Account",
            headerShown: false,
            popToTopOnBlur: true,
            href: isSignedIn && role === "venue" ? undefined : null,

            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.placeholder,
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
