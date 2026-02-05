//App Information Page

import { ThemeText } from "@/components/theme-text";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Info() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeText type="title">Info</ThemeText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
