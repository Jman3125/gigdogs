//Loading
import { colors } from "@/utilities/colors";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemeText } from "./theme-text";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <ThemeText type="default" style={styles.text}>
        Loading...
      </ThemeText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
  },
});
