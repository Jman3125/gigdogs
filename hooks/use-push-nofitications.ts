import { auth, db } from "@/config/firebaseConfig";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

// Optional: configure how notifications behave when received
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const setup = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return; // only run if signed in

        // Android channel setup
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
          });
        }

        // Permissions
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (!isMounted) return;
        setPermissionStatus(finalStatus);

        if (finalStatus !== "granted") return;

        // Project ID (required)
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;

        if (!projectId) throw new Error("Project ID not found");

        // Get token
        const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
          .data;

        if (!isMounted) return;
        setExpoPushToken(token);

        // Save to Firebase
        await setDoc(
          doc(db, "users", user.uid),
          { expoPushToken: token },
          { merge: true },
        );
      } catch (err) {
        console.log("Push notification setup error:", err);
      }
    };

    setup();

    // Listeners (optional but useful)
    const notificationListener = Notifications.addNotificationReceivedListener(
      () => {},
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("User interacted with notification:", response);
      });

    return () => {
      isMounted = false;
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return {
    expoPushToken,
    permissionStatus,
  };
}
