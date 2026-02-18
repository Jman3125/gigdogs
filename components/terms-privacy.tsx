//View terms and privacy policy links.
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export function TermsPrivacyLinks() {
  return (
    <View style={styles.container}>
      <Link href="/terms" asChild>
        <Text style={styles.link}>Terms</Text>
      </Link>

      <Text style={styles.separator}> & </Text>

      <Link href="/privacy" asChild>
        <Text style={styles.link}>Privacy Policy</Text>
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
    color: "#208cf8",
    fontWeight: "600",
  },
  separator: {
    color: "black",
    marginHorizontal: 4,
  },
});
