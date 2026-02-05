//This is where bands can edit their information once signed in

import { ThemeText } from "@/components/theme-text";
import { useRouter } from "expo-router";
import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  const navigator = useRouter();
  return (
    <SafeAreaView style={styles.viewContainer}>
      <Button onPress={() => navigator.back()} title="Go Back" />
      <ThemeText type="title">Account Page</ThemeText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
});
