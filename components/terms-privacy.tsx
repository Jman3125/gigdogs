//View terms and privacy policy links.
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function TermsPrivacyLinks() {
  return (
    <View style={styles.container}>
      <Link href="/terms" asChild>
        <Pressable>
          <Text style={styles.link}>Terms</Text>
        </Pressable>
      </Link>

      <Text style={styles.separator}> & </Text>

      <Link href="/privacy" asChild>
        <Pressable>
          <Text style={styles.link}>Privacy Policy</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  link: {
    color: "#4da6ff",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  separator: {
    color: "black",
    marginHorizontal: 4,
  },
});
