//About GigDogs page
import { ThemeText } from "@/components/theme-text";
import { colors } from "@/utilities/colors";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLanding() {
  const navigator = useRouter();
  const openVenueAuth = () => {
    navigator.push("/auth/venue-signup");
  };

  const openArtistAuth = () => {
    navigator.push("/auth/artist-signup");
  };
  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View style={styles.infoContainer}>
        <ThemeText type="subtitle">Start Using GigDogs</ThemeText>
        <View style={styles.section}>
          <ThemeText></ThemeText>
          <Pressable onPress={openVenueAuth} style={styles.button}>
            <ThemeText type="defaultSemiBold">Add Venue</ThemeText>
          </Pressable>
        </View>
        <View style={styles.section}>
          <View>
            <Pressable onPress={openArtistAuth} style={styles.button}>
              <ThemeText type="defaultSemiBold">Add Artist</ThemeText>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  section: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 25,
  },
});
