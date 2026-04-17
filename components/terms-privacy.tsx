import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

export function TermsPrivacyLinks() {
  return (
    <Text style={styles.container}>
      <Link href="/terms" asChild>
        <Text style={styles.link}>Terms</Text>
      </Link>
      <Text style={styles.separator}> & </Text>
      <Link href="/privacy" asChild>
        <Text style={styles.link}>Privacy Policy</Text>
      </Link>
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    color: "#0a7ea4",
    fontSize: 16,
  },
  separator: {
    color: "black",
  },
});
