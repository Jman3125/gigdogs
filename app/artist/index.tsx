//Signed in bands booking offers page
import { ThemeText } from "@/components/theme-text";
import { colors } from "@/utilities/colors";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView>
        <ThemeText type="title">OFFERS</ThemeText>

        <Pressable>
          <Link href="/artist/account">
            <ThemeText>View Account</ThemeText>
          </Link>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    padding: 8,
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 15,
  },
  headerButton: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
  },
  //Show reauthentication fields
  reAuthenticateContainer: {
    padding: 5,
    backgroundColor: "rgb(236, 236, 236)",
    borderRadius: 10,
  },
});
