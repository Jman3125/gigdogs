// components/band-profile-link.tsx

import { ThemeText } from "@/components/theme-text";
import { colors } from "@/utilities/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import { Alert, Pressable, StyleSheet } from "react-native";

type Props = {
  userId: string;
};

export default function BandProfileLink({ userId }: Props) {
  const url = `https://gigdogs.com/band-view/${userId}`;

  const copyLink = async () => {
    await Clipboard.setStringAsync(url);
    Alert.alert("Copied!", "Your band profile link has been copied.");
  };

  return (
    <Pressable style={styles.container} onPress={copyLink}>
      {/* Clickable URL */}
      <ThemeText type="link" style={styles.link}>
        {url}
      </ThemeText>
      <Ionicons name="copy-outline" size={18} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgb(230, 230, 230)",
    padding: 12,
    borderRadius: 8,
  },
  link: {
    textAlign: "center",
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 45,
    borderRadius: 12,
    gap: 8,
  },
  copyText: {
    color: "white",
  },
});
