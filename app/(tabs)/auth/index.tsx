//About GigDogs page
import { ThemeText } from "@/components/theme-text";
import { colors } from "@/utilities/colors";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ImageBackground } from "react-native";

export default function AuthLanding() {
  const navigator = useRouter();

  const openVenueAuth = () => navigator.push("/auth/venue-signup");
  const openArtistAuth = () => navigator.push("/auth/artist-signup");

  return (
    <ImageBackground
      source={require("@/assets/images/auth-background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container} edges={[]}>
        <ThemeText type="subtitle">Start Using GigDogs</ThemeText>
        <ThemeText type="title">Who Are You?</ThemeText>

        <View style={styles.infoContainer}>
          <View style={styles.section}>
            <TouchableOpacity onPress={openVenueAuth} style={styles.button}>
              <ThemeText type="defaultSemiBold" style={styles.buttonText}>
                Venue
              </ThemeText>
            </TouchableOpacity>

            <TouchableOpacity onPress={openArtistAuth} style={styles.button}>
              <ThemeText type="defaultSemiBold" style={styles.buttonText}>
                Artist
              </ThemeText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    width: "100%",
    alignItems: "center",
    gap: 25,
  },
  infoContainer: {
    flex: 1,
    width: "100%",
  },
  section: {
    gap: 25,
    backgroundColor: "#3eb54ad3",
    padding: 15,
    borderRadius: 15,
  },
  button: {
    width: "100%",
    height: 70,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 15,
    // iOS
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    // Android
    elevation: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 28,
    lineHeight: 28,
  },
});
