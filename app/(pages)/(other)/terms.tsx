//Terms and Conditions Page

import { ThemeText } from "@/components/theme-text";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Terms() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeText type="title">Terms&Conditions</ThemeText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
